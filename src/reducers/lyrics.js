/* ------------------   ACTIONS   ------------------ */

const SET_LYRICS = 'SET_LYRICS';
const SET_FORMATTED_LYRICS = 'SET_FORMATTED_LYRICS';

/* --------------   ACTION CREATORS   -------------- */

export const setLyrics = payload => dispatch => dispatch({ type: SET_LYRICS, payload });
export const setFormattedLyrics = payload => dispatch => dispatch({ type: SET_FORMATTED_LYRICS, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  lyrics: '',
  formattedLyrics: []
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_LYRICS:
      newState.lyrics = action.payload;
      break;

    case SET_FORMATTED_LYRICS:
      newState.formattedLyrics = action.payload;
      break;

    default:
      return prevState;

  }

  return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

const parseColors = (MEMBERS, COLORS, member, lastColor) => {
  function findColor(mem) {
    return COLORS[MEMBERS.indexOf(mem)];
  }

  function getColors(mem) {
    let got;
    if (mem.includes('/')) {
      mem = mem.split('/');
      got = `${findColor(mem[0])}-${findColor(mem[1])}`;
    } else {
      got = findColor(mem);
    }
    return got;
  }

  // If no member, just use last colors
  let colors = [lastColor];
  // If there are members
  if (member) {
    colors = [];
    // If there's an adlib
    if (member.includes('(')) {
      const members = member.split(' (');
      // Re-add '('
      if (members.length > 1) members[1] = members[1].slice(0,-1);
      // Run for every member
      members.forEach(mem => {
        colors.push(getColors(mem));
      });
    } else {
      colors.push(getColors(member));
    }
  }

  return colors;
};

export const handleParser = (evt) => (dispatch, getState) => {
  let lyricsToParse = evt.target.value;
  dispatch(setLyrics(lyricsToParse));

  const COLORS = getState().app.currentBand.colors;
  const MEMBERS = [...getState().app.currentBand.members].map((mem) => mem.toUpperCase());
  const parsedLyrics = [];

  let lastColor = null;
  let lastMember = null;

  lyricsToParse = lyricsToParse.split('\n');

  lyricsToParse.forEach((str) => {
    let line = {
      class: [],
      member: [],
      content: [],
      adlibs: []
    };
    // <p><span className=lyrics-who"">[Member]</span><span=className="lyrics-line color-blue">Test test test</span></p>
    // Case 0: Blank line
    if (str.length === 0) {
      lastColor = null;
      line.class.push('');
      line.content.push('&nbsp;');
      lastMember = null;

    // All other cases
    } else {

      while (str.length > 0 || str !== '') {
        let remainder = str;
        let member;

        if (str[0] === '[') {
          const firstBracket = str.indexOf(']');
          member = str.slice(0, firstBracket);
          remainder = str.slice(firstBracket + 2);
          member = member.slice(1).toUpperCase();
          lastMember = member;
        }

        if (!lastMember) {
          member = 'ALL';
        }

        line.member.push(member);
        line.class = line.class.concat(parseColors(MEMBERS, COLORS, member, lastColor));
        line.adlibs.push(false);

        if (remainder.includes(' [')) {
          const nextBracket = remainder.indexOf('[');
          let temp1 = remainder.slice(0, nextBracket - 1);
          let temp2 = remainder.slice(nextBracket);
          remainder = temp1;
          str = temp2;
        } else {
          str = '';
        }

        // Check for adlibst on remainder
        if (remainder.includes('(')) {
          let count = 0;
          let newRemainder = [];
          const colorCopy = [...line.class];
          // Slipt in '(' or ')', remove those characters
          remainder.split(/([()])/).filter(Boolean).forEach(elem => {

            if (elem === '(') {
              count++;
              return;
            }
            if (elem === ')' && count > 0) {
              count--;
              return;
            }
            // Remove white spaces before and after
            elem = elem[0] === ' ' ? elem.slice(1, elem.length) : elem;
            elem = elem[elem.length - 1] === ' ' ? elem.slice(0, elem.length - 1) : elem;
            // If it is a adlib
            if (count > 0) {
              newRemainder.push('(' + elem + ')');
              if (newRemainder.length > 0) {
                line.adlibs.push(true);
              } else {
                line.adlibs[0] = true;
              }
            } else {
              if (newRemainder.length > 0) line.adlibs.push(false);
              newRemainder.push(elem);
            }

            // Add extra colors classes
            if (newRemainder.length > line.class.length) {
              let x = count > 0 ? 1 : 2;
              line.class.push(colorCopy[colorCopy.length - x]);
            }
          });

          line.content = line.content.concat(newRemainder);

        } else {
          line.content.push(remainder);
        }

        // Update last color
        lastColor = line.class[line.class.length - 1];
      }
    }
    // console.log(line);
    parsedLyrics.push(line);
  });
  dispatch(setFormattedLyrics(parsedLyrics));
};
