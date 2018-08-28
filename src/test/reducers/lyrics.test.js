import mockLyrics from '../../mock/mock_lyrics';
import mockMembers from '../../mock/mock_members';

import { parseLyrics } from '../../reducers/lyrics';

const formattedLyrics = parseLyrics(mockLyrics, mockMembers);

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
      expect(formattedLyrics[2].members[0] === 'BOB').toBeTruthy();
    });

    it('consider names case insensitive', () => {
      expect(formattedLyrics[3].members[0] === 'DAN').toBeTruthy();
    });

    it('does not break if member is not found', () => {
      expect(formattedLyrics[4].members[0] === '?').toBeTruthy();
    });

    it('parses the correct object', () => {
      const result = {
        colors: ['color-2'],
        content: ['I can sing'],
        members: ['BOB'],
        adlibs: [false],
      };
      expect(formattedLyrics[2]).toEqual(result);
    });
  });

  describe('Case 3: Two Members, Two Parts', () => {
    it('parses the correct object', () => {
      const result = {
        colors: ['color-2', 'color-4'],
        content: ['I can sing', 'I can rap'],
        members: ['BOB', 'DAN'],
        adlibs: [false, false],
      };
      expect(formattedLyrics[5]).toEqual(result);
    });
  });

  describe('Case 4: Multiple Members, Same amout of parts', () => {
    it('works with 3 members', () => {
      const result = {
        colors: ['color-2', 'color-4', 'color-3'],
        content: ["I'm 1", "I'm 2", "I'm 3"],
        members: ['BOB', 'DAN', 'CARL'],
        adlibs: [false, false, false],
      };
      expect(formattedLyrics[6]).toEqual(result);
    });

    it('works with 4 members', () => {
      const result = {
        colors: ['color-2', 'color-4', 'color-3', 'color-1'],
        content: ["I'm 1", "I'm 2", "I'm 3", "I'm 4"],
        members: ['BOB', 'DAN', 'CARL', 'ADAM'],
        adlibs: [false, false, false, false],
      };
      expect(formattedLyrics[7]).toEqual(result);
    });

    it('works with 5 members', () => {
      const result = {
        colors: ['color-2', 'color-4', 'color-3', 'color-1', '0'],
        content: ["I'm 1", "I'm 2", "I'm 3", "I'm 4", "I'm 5"],
        members: ['BOB', 'DAN', 'CARL', 'ADAM', '?'],
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
        colors: ['color-0'],
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
        colors: ['color-2'],
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
        colors: ['color-2-color-4'],
        content: ['We can sing'],
        members: ['BOB/DAN'],
        adlibs: [false],
      };
      expect(formattedLyrics[16]).toEqual(result);
    });
    it('keeps assignments to following unassigned line', () => {
      const result = {
        colors: ['color-2-color-4'],
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
        colors: ['color-1', 'color-3'],
        content: ['I dance', '(I rap)'],
        members: ['ADAM (CARL)', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[18]).toEqual(result);
    });

    it('accepts multiple adlibs in line', () => {
      const result = {
        colors: [
          'color-2',
          'color-4',
          'color-2',
          'color-4',
          'color-2',
          'color-4',
        ],
        content: [
          'I sing',
          '(Yeah)',
          'I walk',
          '(Yeah yeah)',
          'I stare',
          '(Ooh yeah)',
        ],
        members: ['BOB (DAN)', '', '', '', '', ''],
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
        colors: ['color-1', '0'],
        content: ['I dance', '(yeah yeah)'],
        members: ['ADAM', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[22]).toEqual(result);
    });

    it('accepts double members and an adlib member', () => {
      const result = {
        colors: ['color-2-color-4', 'color-3'],
        content: ['We can sing', '(Oh yeah)'],
        members: ['BOB/DAN (CARL)', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[23]).toEqual(result);
    });

    it('accepts double members and double adlib members', () => {
      const result = {
        colors: ['color-3-color-4', 'color-1-color-2'],
        content: ['We rap', '(We look)'],
        members: ['CARL/DAN (ADAM/BOB)', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[24]).toEqual(result);
    });

    it('carries adlibs over next lines', () => {
      const result = {
        colors: ['color-3-color-4', 'color-1-color-2'],
        content: ['We sing again', '(Oh wee)'],
        members: ['', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[25]).toEqual(result);
    });

    it('accepts that adlibs do not have to be used in the line which is declared', () => {
      const result = {
        colors: ['color-2', 'color-1'],
        content: ['And I sing well', '(Oh yeah)'],
        members: ['', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[27]).toEqual(result);
    });

    it('accepts double members in a adlib', () => {
      const result = {
        colors: ['color-3', 'color-2-color-4'],
        content: ['I can rap', '(Baby baby)'],
        members: ['CARL (BOB/DAN)', ''],
        adlibs: [false, true],
      };
      expect(formattedLyrics[28]).toEqual(result);
    });

    it('accepts a line starting with an adlib', () => {
      const result = {
        colors: ['color-1', 'color-2'],
        content: ['(Oh yeah)', 'I can sing'],
        members: ['BOB (ADAM)', ''],
        adlibs: [true, false],
      };
      expect(formattedLyrics[30]).toEqual(result);
    });

    it('accepts an unassigned line starting with an adlib', () => {
      const result = {
        colors: ['color-1', 'color-2'],
        content: ['(Oh wee)', 'You can do it'],
        members: ['', ''],
        adlibs: [true, false],
      };
      expect(formattedLyrics[31]).toEqual(result);
    });
  });
});
