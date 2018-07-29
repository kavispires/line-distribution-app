/* This test suite does NOT test the reducer file. Instead, it contains a version
 * of the lyric parser and tests it within this file, because jest was constanly
 * returning the error 'Expected reducer to be a function'.
*/
import API from '../api';
import mockLyrics from '../mock/mockLyrics';

const currentUnit = API.get('/units/4/all');

const handleParser = input => {
  // DO-IN-REDUCER: get input from event, and dispatch it
  let lyricsToParse = input;
  // DO-IN-REDUCER: get current unit
  const MEMBERS = currentUnit.members;

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
          colorId += MEMBERS[j].colorId;
          wasAdded = true;
          j = MEMBERS.length;
        }
      }
      if (!wasAdded) colorId += '0';
      if (i !== names.length - 1) colorId += '-';
      wasAdded = false;
    }
    return colorId;
  }

  // Checks if member if present in the current unit
  function areMembersInUnit(str) {
    const nameList = str.toLowerCase().replace(/[()/\s]/g, ',');
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
      while (lineToParse.length > 0 || lineToParse !== '') {
        let remainder = lineToParse;
        let member;

        // Define member(s) based on the first bracket
        if (lineToParse[0] === '[') {
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
        }
        if (lineToParse[0] === '[' && member && member.includes('(')) {
          const multiMember = member.split('(');
          lastColor = getColorId(multiMember[0].trim());
          const adLibMembers = multiMember[1].substring(
            0,
            multiMember[1].length - 1
          );
          lastSubColor = getColorId(adLibMembers);
        }
        console.log(
          'COLOR:',
          lastColor,
          'SUBCOLOR',
          lastSubColor,
          'MEMBERS being pushed',
          member
        );

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
          const remainderSplit = remainder
            .split(/([()])/)
            .filter(Boolean)
            .map(r => r.trim());
          console.log(remainderSplit);
          for (let e = 0; e < remainderSplit.length; e++) {
            const elem = remainderSplit[e];
            // If it's an adlib line
            if (elem === '(') {
              const adlibLine = `${elem}${remainderSplit[e + 1]}${
                remainderSplit[e + 2]
              }`;
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

  return parsedLyrics;
};

const formattedLyrics = handleParser(mockLyrics);

/* TESTING CASES
 * Case 1: Blank Lines
 * a: accepts blank lines
 * b: considers lines with only spaces as blank lines
 * Case 2: One Member, One Part
 * a: return capitalized member name
 * b: consider names case insensitive
 * c: does not break if member is not found
 * d: parses the correct object
 * Case 3: Two Members, Two Parts
 * a: parses the correct object
 * Case 4: Multiple Members, Same amout of parts
 * a: worsk with 3 members
 * b: works with 4 members
 * c: works with 5 members
 * Case 5: Line Assignments
 * a: assigns empty brackets to "?"
 * b: accepts "ALL" as a member
 * c: reassigns unknown members to "?"
 * d: assigns non-brackets lines to the previous member
 * e: assigns non-brackets preceeded by a blank line to "ALL"
 * Case 6: Double Members, One Part Only
 * a: assigns both members to the same bracket with split color
 * b: keeps assignments to following unassigned line
 * Case 7: AdLibs
 * a: assigns members in parenthesis as adlibs
 * b: accepts multiple adlbs in line
 * c: cancels adlib when preceeded by a blank line
 * d: considers "ALL" to unassigned adlibs
 * e: accepts double members and an adlib member
 * f: carries adlibs over next lines
 * g: accepts that adlibs do not have to be used in the line which is declared
 * h: accepts double members in a adlib
 * i: accepts double members and double adlib members
 * j: accepts a line starting with an adlib
 * k: accepts an unassigned line starting with an adlib
 * Case 8:
 */

describe('Lyrics Parser', () => {
  beforeEach(() => {
    // console.log('bola');
  });

  it('returns an array of objects', () => {
    expect(Array.isArray(formattedLyrics)).toBeTruthy();
    expect(typeof formattedLyrics[0] === 'object').toBeTruthy();
    expect(
      typeof formattedLyrics[formattedLyrics.length - 1] === 'object'
    ).toBeTruthy();
  });

  describe('Case 1: Blank Lines', () => {
    const result = {
      colors: [0],
      content: ['&nbsp;'],
      members: [],
      adlibs: [],
    };

    it('accepts blank lines', () => {
      expect(formattedLyrics[0]).toEqual(result);
    });

    it('considers lines with only spaces as blank lines', () => {
      expect(formattedLyrics[1]).toEqual(result);
    });
  });

  describe('Case 2: One Member, One Part', () => {
    it('return capitalized member name', () => {
      expect(formattedLyrics[2].members[0] === 'BOM').toBeTruthy();
    });

    it('consider names case insensitive', () => {
      expect(formattedLyrics[3].members[0] === 'DARA').toBeTruthy();
    });

    it('does not break if member is not found', () => {
      expect(formattedLyrics[4].members[0] === '?').toBeTruthy();
    });

    it('parses the correct object', () => {
      const result = {
        colors: ['18'],
        content: ['I can sing'],
        members: ['BOM'],
        adlibs: [false],
      };
      expect(formattedLyrics[2]).toEqual(result);
    });
  });

  describe('Case 3: Two Members, Two Parts', () => {
    it('parses the correct object', () => {
      const result = {
        colors: ['18', '24'],
        content: ['I can sing', 'I can rap'],
        members: ['BOM', 'DARA'],
        adlibs: [false, false],
      };
      expect(formattedLyrics[5]).toEqual(result);
    });
  });

  describe('Case 4: Multiple Members, Same amout of parts', () => {
    it('works with 3 members', () => {
      const result = {
        colors: ['18', '24', '3'],
        content: ["I'm 1", "I'm 2", "I'm 3"],
        members: ['BOM', 'DARA', 'CL'],
        adlibs: [false, false, false],
      };
      expect(formattedLyrics[6]).toEqual(result);
    });

    it('works with 4 members', () => {
      const result = {
        colors: ['18', '24', '3', '21'],
        content: ["I'm 1", "I'm 2", "I'm 3", "I'm 4"],
        members: ['BOM', 'DARA', 'CL', 'MINZY'],
        adlibs: [false, false, false, false],
      };
      expect(formattedLyrics[7]).toEqual(result);
    });

    it('works with 5 members', () => {
      const result = {
        colors: ['18', '24', '3', '21', '0'],
        content: ["I'm 1", "I'm 2", "I'm 3", "I'm 4", "I'm 5"],
        members: ['BOM', 'DARA', 'CL', 'MINZY', '?'],
        adlibs: [false, false, false, false, false],
      };
      expect(formattedLyrics[8]).toEqual(result);
    });
  });

  describe('Case 5: Line Assignments', () => {
    it('assigns empty brackets to "?"', () => {
      const result = {
        colors: ['0'],
        content: ['I can sing'],
        members: ['?'],
        adlibs: [false],
      };
      expect(formattedLyrics[9]).toEqual(result);
    });

    it('accepts "ALL" as a member', () => {
      const result = {
        colors: ['0'],
        content: ['We can sing'],
        members: ['ALL'],
        adlibs: [false],
      };
      expect(formattedLyrics[10]).toEqual(result);
    });

    it('reassigns unknown members to "?"', () => {
      const result = {
        colors: ['0'],
        content: ['I can dance'],
        members: ['?'],
        adlibs: [false],
      };
      expect(formattedLyrics[11]).toEqual(result);
    });

    it('assigns non-brackets lines to the previous member', () => {
      const result = {
        colors: ['18'],
        content: ['I can walk'],
        members: [''],
        adlibs: [false],
      };
      expect(formattedLyrics[13]).toEqual(result);
    });

    it('assigns non-brackets preceeded by a blank line to "ALL"', () => {
      const result = {
        colors: ['0'],
        content: ['I can breathe'],
        members: ['ALL'],
        adlibs: [false],
      };
      expect(formattedLyrics[15]).toEqual(result);
    });
  });

  describe('Case 6: Multiple Members, One Part Only', () => {
    it('assigns both members to the same bracket with split color', () => {
      const result = {
        colors: ['18-24'],
        content: ['We can sing'],
        members: ['BOM/DARA'],
        adlibs: [false],
      };
      expect(formattedLyrics[16]).toEqual(result);
    });
    it('keeps assignments to following unassigned line', () => {
      const result = {
        colors: ['18-24'],
        content: ['And we can dance'],
        members: [''],
        adlibs: [false],
      };
      expect(formattedLyrics[17]).toEqual(result);
    });
  });

  describe('Case 7: AdLibs', () => {
    it('assigns members in parenthesis as adlibs', () => {
      const result = {
        colors: ['21', '3'],
        content: ['I dance', '(I rap)'],
        members: ['MINZY (CL)', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[18]).toEqual(result);
    });

    it('accepts multiple adlibs in line', () => {
      const result = {
        colors: ['18', '24', '18', '24', '18', '24'],
        content: [
          'I sing',
          '(Yeah)',
          'I walk',
          '(Yeah yeah)',
          'I stare',
          '(Ooh yeah)',
        ],
        members: ['BOM (DARA)', '', '', '', '', ''],
        adlibs: [false, true, false, true, false, true],
      };
      expect(formattedLyrics[19]).toEqual(result);
    });

    it('cancels adlib when preceeded by a blank line', () => {
      const result = {
        colors: ['0', '0'],
        content: ['We dance', '(yeah yeah yeah)'],
        members: ['ALL', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[21]).toEqual(result);
    });

    it('considers "ALL" to unassigned adlibs', () => {
      const result = {
        colors: ['21', '0'],
        content: ['I dance', '(yeah yeah)'],
        members: ['MINZY', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[22]).toEqual(result);
    });

    it('accepts double members and an adlib member', () => {
      const result = {
        colors: ['18-24', '3'],
        content: ['We can sing', '(Oh yeah)'],
        members: ['BOM/DARA (CL)', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[23]).toEqual(result);
    });

    it('accepts double members and double adlib members', () => {
      const result = {
        colors: ['3-24', '21-18'],
        content: ['We rap', '(We look)'],
        members: ['CL/DARA (MINZY/BOM)', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[24]).toEqual(result);
    });

    it('carries adlibs over next lines', () => {
      const result = {
        colors: ['3-24', '21-18'],
        content: ['We sing again', '(Oh wee)'],
        members: ['', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[25]).toEqual(result);
    });

    it('accepts that adlibs do not have to be used in the line which is declared', () => {
      const result = {
        colors: ['18', '21'],
        content: ['And I sing well', '(Oh yeah)'],
        members: ['', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[27]).toEqual(result);
    });

    it('accepts double members in a adlib', () => {
      const result = {
        colors: ['3', '18-24'],
        content: ['I can rap', '(Baby baby)'],
        members: ['CL (BOM/DARA)', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[28]).toEqual(result);
    });

    it('accepts a line starting with an adlib', () => {
      const result = {
        colors: ['21', '18'],
        content: ['(Oh yeah)', 'I can sing'],
        members: ['BOM (MINZY)', ''],
        adlibs: [true, false],
      };
      expect(formattedLyrics[30]).toEqual(result);
    });

    it('accepts an unassigned line starting with an adlib', () => {
      const result = {
        colors: ['21', '18'],
        content: ['(Oh wee)', 'You can do it'],
        members: ['', ''],
        adlibs: [true, false],
      };
      expect(formattedLyrics[31]).toEqual(result);
    });
  });
});
