import { userInfo } from "os";

/* ------------------   ACTIONS   ------------------ */

const SET_FORMATTED_LYRICS = 'SET_FORMATTED_LYRICS';
const SET_LYRICS = 'SET_LYRICS';
const SET_SHOW_RULES = 'SET_SHOW_RULES';
const SET_USE_BRACKETS = 'SET_USE_BRACKETS';

/* --------------   ACTION CREATORS   -------------- */

export const setFormattedLyrics = payload => dispatch => dispatch({ type: SET_FORMATTED_LYRICS, payload });
export const setLyrics = payload => dispatch => dispatch({ type: SET_LYRICS, payload });
export const setShowRules = payload => dispatch => dispatch({ type: SET_SHOW_RULES, payload });
export const setUseBrackets = payload => dispatch => dispatch({ type: SET_USE_BRACKETS, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  formattedLyrics: [],
  lyrics: '',
  showRules: false,
  useBrackets: true,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_FORMATTED_LYRICS:
      newState.formattedLyrics = action.payload;
      break;

    case SET_LYRICS:
      newState.lyrics = action.payload;
      break;

    case SET_SHOW_RULES:
      newState.showRules = action.payload;
      break;

    case SET_USE_BRACKETS:
      newState.useBrackets = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const handleParser = evt => (dispatch, getState) => {
  let lyricsToParse;
  if (typeof evt === 'string') {
    lyricsToParse = evt;
  } else {
    lyricsToParse = evt.target.value;
  }

  dispatch(setLyrics(lyricsToParse));

  const MEMBERS = getState().app.currentUnit.members;

  const parsedLyrics = [];

  lyricsToParse = lyricsToParse.split('\n');

  // Line constructor for each line
  class Line {
    constructor() {
      this.colors = [];
      this.members = [];
      this.content = [];
      this.adlibs = [];
    }
  }

  // Gets the color id of a name
  function getColorId(str) {
    if (str === undefined) return '0';

    let colorId = '';
    let wasAdded = false;
    const names = str.split('/');
    for (let i = 0; i < names.length; i++) {
      const name = names[i].toLowerCase();
      for (let j = 0; j < MEMBERS.length; j++) {
        if (name === MEMBERS[j].name.toLowerCase()) {
          colorId += MEMBERS[j].color.class;
          wasAdded = true;
          j = MEMBERS.length;
        }
      }
      if (!wasAdded) colorId += 'color-0';
      if (i !== names.length - 1) colorId += '-';
      wasAdded = false;
    }
    return colorId;
  }

  // Checks if member if present in the current unit
  function areMembersInUnit(str) {
    const nameList = str.toLowerCase().replace(/[()/\s]/g,',');
    if (nameList === 'all') return true;

    let wasFound = false;
    const names = nameList.split(',');
    let bool = false;
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (name) {
        wasFound = false;
        for (let j = 0; j < MEMBERS.length; j++) {
          const member = MEMBERS[j].name.toLowerCase();
          if (name === member || name === 'all') {
            wasFound = true;
            j = MEMBERS.length;
          }
        }
        bool = wasFound;
      }
    }
    return bool;
  }

  let lastColor = null;
  let lastSubColor = null;
  let lastMember = null;

  for (let i = 0; i < lyricsToParse.length; i++) {
    let lineToParse = lyricsToParse[i].trim();

    const line = new Line();

    // Handles Case 0
    if (lineToParse.length === 0) {
      line.colors.push(0);
      line.content.push('&nbsp;');
      lastMember = null;
      lastColor = 0;
      lastSubColor = 0;
    } else {
      // Runs the line string as many times necessary to parse string completely
      while (lineToParse.length > 0 && lineToParse[lineToParse.length - 1] !== '[') {
        let remainder = lineToParse;
        let member;

        // Define member(s) based on the first bracket
        if (remainder[0] === '[') {
          const firstClosingBracket = lineToParse.indexOf(']');
          const foundMembers = lineToParse.slice(1, firstClosingBracket);
          if (areMembersInUnit(foundMembers)) {
            member = foundMembers.toUpperCase();
          } else {
            member = '?';
          }
          remainder = lineToParse.slice(firstClosingBracket + 1).trim();
          lastMember = member;
        }
        if (!lastMember) {
          member = 'ALL';
        }

        // Define color(s)
        if (lineToParse[0] === '[' && member && !member.includes('(')) {
          lastColor = getColorId(member);
        } if (lineToParse[0] === '[' && member && member.includes('(')) {
          const multiMember = member.split('(');
          lastColor = getColorId(multiMember[0].trim());
          const adLibMembers = multiMember[1].substring(0, multiMember[1].length - 1);
          lastSubColor = getColorId(adLibMembers);
        }

        // If remainder has another member assignment, split in the bracket
        if (remainder.includes('[')) {
          const nextBracket = remainder.indexOf('[');
          const temp1 = remainder.slice(0, nextBracket - 1);
          const temp2 = remainder.slice(nextBracket);
          remainder = temp1;
          lineToParse = temp2;
          if (!lineToParse.includes(']')) {
            lineToParse = '';
          }
        } else {
          lineToParse = '';
        }

        // Add members, independently if they were assigned
        if (!member) member = '';
        line.members.push(member);

        // Check for adlibs on remainder
        if (remainder.includes('(')) {
          // Slipt in '(' or ')', remove those characters
          const remainderSplit = remainder.split(/([()])/).filter(Boolean).map(r => r.trim());

          for (let e = 0; e < remainderSplit.length; e++) {
            const elem = remainderSplit[e];
            // If it's an adlib line
            if (elem === '(') {
              const adlibLine = `${elem}${remainderSplit[e + 1]}${remainderSplit[e + 2]}`;
              e += 2; // advances '(', the actual line, and ')'
              line.colors.push(`${lastSubColor}`);
              line.content.push(adlibLine);
              line.adlibs.push(true);
              if (e > 2) {
                line.members.push('');
              }
            } else {
              line.colors.push(`${lastColor}`);
              line.content.push(elem);
              line.adlibs.push(false);
              if (e > 0) {
                line.members.push('');
              }
            }
          }

          // line.content = line.content.concat(newRemainder);
        } else {
          line.colors.push(`${lastColor}`);
          line.content.push(remainder);
          line.adlibs.push(false);
        }
      }
    }

    parsedLyrics.push(line);
  }

  dispatch(setFormattedLyrics(parsedLyrics));
  // return parsedLyrics;
};

export const toggleRules = () => (dispatch, getState) => {
  const { showRules } = getState().lyrics;
  dispatch(setShowRules(!showRules));
};

export const resetLyrics = () => (dispatch) => {
  dispatch(setLyrics(''));
  dispatch(setFormattedLyrics([]));
};

export const toggleBrackets = value => (dispatch, getState) => {
  let useBrackets;
  if (typeof value !== 'boolean') {
    useBrackets = !getState().lyrics.useBrackets;
  }
  dispatch(setUseBrackets(useBrackets));
};
