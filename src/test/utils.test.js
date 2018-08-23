import _ from 'lodash';

import {
  boxSizeClass,
  parseBirthDate,
  getLyricsSnippet,
  makeSixDigit,
  makeIdNumber,
  capitalizeWord,
  spinalCaseWord,
  generatePushID,
  bem,
} from '../utils';

describe('Utils', () => {
  describe('boxSizeClass', () => {
    it('assigns correct class for 2 boxes', () => {
      expect(boxSizeClass(2)).toEqual('box-2');
    });

    it('assigns correct class for 3 boxes', () => {
      expect(boxSizeClass(3)).toEqual('box-3');
    });

    it('assigns correct class for 4 boxes', () => {
      expect(boxSizeClass(4)).toEqual('box-2');
    });

    it('assigns correct class for 5 boxes', () => {
      expect(boxSizeClass(5)).toEqual('box-3');
    });

    it('assigns correct class for 6 boxes', () => {
      expect(boxSizeClass(6)).toEqual('box-3');
    });

    it('assigns correct class for 7 boxes', () => {
      expect(boxSizeClass(7)).toEqual('box-4');
    });

    it('assigns correct class for 8 boxes', () => {
      expect(boxSizeClass(8)).toEqual('box-4');
    });

    it('assigns correct class for 9 boxes', () => {
      expect(boxSizeClass(9)).toEqual('box-3');
    });

    it('assigns correct class for 10 boxes', () => {
      expect(boxSizeClass(10)).toEqual('box-4');
    });

    it('assigns correct class for 11 boxes', () => {
      expect(boxSizeClass(11)).toEqual('box-4');
    });

    it('assigns correct class for 12 boxes', () => {
      expect(boxSizeClass(12)).toEqual('box-4');
    });

    it('assigns correct class for 13 boxes', () => {
      expect(boxSizeClass(13)).toEqual('box-5');
    });

    it('assigns correct class for 14 boxes', () => {
      expect(boxSizeClass(14)).toEqual('box-5');
    });

    it('assigns correct class for 15 boxes', () => {
      expect(boxSizeClass(15)).toEqual('box-5');
    });

    it('assigns correct class for 16 boxes', () => {
      expect(boxSizeClass(16)).toEqual('box-4');
    });

    it('assigns correct classes for 17 or more boxes', () => {
      expect(boxSizeClass(17)).toEqual('box-5');
      expect(boxSizeClass(18)).toEqual('box-5');
      expect(boxSizeClass(19)).toEqual('box-5');
      expect(boxSizeClass(20)).toEqual('box-5');
      expect(boxSizeClass(21)).toEqual('box-5');
      expect(boxSizeClass(22)).toEqual('box-5');
      expect(boxSizeClass(23)).toEqual('box-5');
      expect(boxSizeClass(24)).toEqual('box-5');
      expect(boxSizeClass(25)).toEqual('box-5');
    });
  });

  // describe('getClosestIndex', () => {
  //   it('to-do', () => {
  //     expect(1).toEqual('1');
  //   });
  // });

  describe('parseBirthDate', () => {
    it('returns year if birthdate number is 4 digits long', () => {
      expect(parseBirthDate(1999)).toEqual('1999');
    });

    it('splits birthdate correctly', () => {
      expect(parseBirthDate(12345678)).toEqual('56 / 78 / 1234');
    });

    it('returns a ? when birthdate is invalid', () => {
      expect(parseBirthDate(123456)).toEqual('?');
    });
  });

  describe('getLyricsSnippet', () => {
    it('limits lyric snippet to 100 characters', () => {
      const lyric =
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
      const result = getLyricsSnippet(lyric);
      expect(result).toEqual(
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t...'
      );
      expect(result).toHaveLength(100);
    });

    it('returns complete lyric when it has up to 100 characters', () => {
      const lyric =
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
      const result = getLyricsSnippet(lyric);
      expect(result).toEqual(
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      );
    });

    it('adds / to every line break in the lyrics', () => {
      const lyric = 'Lorem\nIpsum\nis\nsimply\ndummy.';
      const result = getLyricsSnippet(lyric);
      expect(result).toEqual('Lorem / Ipsum / is / simply / dummy.');
    });

    it('uses only the first 7 lines of the lyrics', () => {
      const lyric =
        'Lorem\nIpsum\nis\nsimply\ndummy\ntext\nof\nthe\nprinting\nand\ntypesetting\nindustry.';
      const result = getLyricsSnippet(lyric);
      expect(result).toEqual('Lorem / Ipsum / is / simply / dummy / text / of');
    });
  });

  describe('makeSixDigit', () => {
    it('forces number to six digit string', () => {
      expect(makeSixDigit(1)).toEqual('000001');
      expect(makeSixDigit(123)).toEqual('000123');
    });

    it('returns stringify number when number is over 6 digits', () => {
      expect(makeSixDigit(1234567)).toEqual('1234567');
    });

    it('returns 000000 when invalid argument is passed', () => {
      expect(makeSixDigit()).toEqual('000000');
    });
  });

  describe('makeIdNumber', () => {
    it('returns number retrived from string', () => {
      expect(makeIdNumber('pos1029')).toEqual(1029);
      expect(makeIdNumber('pos102')).toEqual(102);
    });

    it('returns 0 if argument is smaller than 4 characters', () => {
      expect(makeIdNumber('po')).toEqual(0);
      expect(makeIdNumber('pos')).toEqual(0);
    });

    it('returns 0 when argument does contain numbers', () => {
      expect(makeIdNumber('posss')).toEqual(0);
      expect(makeIdNumber('posss0')).toEqual(0);
    });
  });

  describe('capitalizeWord', () => {
    it('works', () => {
      expect(capitalizeWord('bola')).toEqual('Bola');
      expect(capitalizeWord('bola bola')).toEqual('Bola Bola');
    });

    it('accepts custom separators as a second argument', () => {
      expect(capitalizeWord('bola-bola-bola', '-')).toEqual('Bola-Bola-Bola');
      expect(capitalizeWord('bo?la?bo?la', '?')).toEqual('Bo?La?Bo?La');
    });
  });

  describe('spinalCaseWord', () => {
    it('adds dashes between words', () => {
      expect(spinalCaseWord('this is a sentence')).toEqual(
        'this-is-a-sentence'
      );
    });
  });

  // TO-DO: Verify usefulness of this utility function
  // describe('getTrueKeys', () => {
  //   it('generates an array', () => {
  //     expect(getTrueKeys({a: 1, b: 2, cd: 3})).toEqual(['a', 'b', 'cd']);
  //   });
  // });

  // TO-DO: Test this utility function
  // describe('ensureColorUniqueness', () => {
  //   it('sentence', () => {
  //     expect(1).toEqual('1');
  //   });
  // });

  describe('generatePushID', () => {
    const ids = [];

    for (let i = 0; i < 30; i++) {
      ids.push(generatePushID());
    }

    it('generates a 20 digit id', () => {
      expect(ids[0]).toHaveLength(20);
    });

    it('generates unique ids', () => {
      const unique = _.uniqWith(ids, _.isEqual);
      expect(unique).toHaveLength(30);
    });
  });

  describe('bem', () => {
    it('parses a block', () => {
      expect(bem('block')).toEqual('block');
    });

    it('throws a error when the block argument is undefined', () => {
      // expect(bem()).toThrow('Block string missing');
    });

    it('parses a block and a modifier', () => {
      expect(bem('block', 'modifier')).toEqual('block block--modifier');
    });

    it('parses a block with multiple modifiers', () => {
      expect(bem('block', ['mod1', 'mod2'])).toEqual(
        'block block--mod1 block--mod2'
      );
    });

    it('parses a block, a modifier, and an element', () => {
      expect(bem('block', 'modifier', 'element')).toEqual(
        'block__element block__element--modifier'
      );
    });

    it('parses a block, multiple modifiers, and an element', () => {
      expect(bem('block', ['mod1', 'mod2'], 'element')).toEqual(
        'block__element block__element--mod1 block__element--mod2'
      );
    });

    it('parses a block and an element', () => {
      expect(bem('block', '', 'element')).toEqual('block__element');
    });

    it('parses a block and a modifier and a non-BEM class', () => {
      expect(bem('block', 'modifier', '', 'extra1')).toEqual(
        'block block--modifier extra1'
      );
    });

    it('parses a block and a element and a non-BEM class', () => {
      expect(bem('block', '', 'element', ['extra1', 'extra2'])).toEqual(
        'block__element extra1 extra2'
      );
    });

    it('parses a block and a modifier and multiple non-BEM classes', () => {
      expect(bem('block', 'modifier', 'element', ['extra1', 'extra2'])).toEqual(
        'block__element block__element--modifier extra1 extra2'
      );
    });
  });
});
