/* eslint quote-props: 0 */

const TABLE_REGULAR = {
  INITIALS: {
    // Consonants
    'ㄱ': 'g',
    'ㄴ': 'n',
    'ㄷ': 'd',
    'ㄹ': 'l',
    'ㅁ': 'm',
    'ㅂ': 'b',
    'ㅅ': 's',
    'ㅇ': '-',
    'ㅈ': 'j',
    'ㅊ': 'ch',
    'ㅋ': 'k',
    'ㅌ': 't',
    'ㅍ': 'p',
    'ㅎ': 'h',
    // Double consonants
    'ㄲ': 'kk',
    'ㄸ': 'tt',
    'ㅃ': 'pp',
    'ㅆ': 'ss',
    'ㅉ': 'jj',
  },
  MEDIALS: {
    // Vowels
    'ㅏ': 'a',
    'ㅓ': 'eo',
    'ㅗ': 'o',
    'ㅜ': 'u',
    'ㅡ': 'eu',
    'ㅣ': 'i',
    'ㅐ': 'ae',
    'ㅔ': 'e',
    'ㅚ': 'oe',
    'ㅟ': 'ui',
    'ㅢ': 'eui',
    // Vowels (y+)
    'ㅑ': 'ya',
    'ㅕ': 'yeo',
    'ㅛ': 'yo',
    'ㅠ': 'yu',
    'ㅒ': 'yae',
    'ㅖ': 'ye',
    // Vowels (w+)
    'ㅘ': 'wa',
    'ㅝ': 'weo',
    'ㅙ': 'wae',
    'ㅞ': 'we',
  },
  FINALS: {
    // Finals
    'ㄱ': 'g',
    'ㄴ': 'n',
    'ㄷ': 'd',
    'ㄹ': 'l',
    'ㅁ': 'm',
    'ㅂ': 'b',
    'ㅅ': 's',
    'ㅇ': 'ng',
    'ㅈ': 'j',
    'ㅊ': 'ch',
    'ㅋ': 'k',
    'ㅌ': 't',
    'ㅍ': 'p',
    'ㅎ': 'h',

    'ㄲ': 'kk',
    'ㄵ': 'nj',
    'ㄺ': 'lg',
    'ㅄ': 'bs',
    'ㅆ': 'ss',

    'ㄳ': 'gs',
    'ㄶ': 'nh',
    'ㄻ': 'lm',

    'ㄼ': 'lb',
    'ㄽ': 'ls',
    'ㄾ': 'lt',
    'ㄿ': 'lp',
    'ㅀ': 'lh',
  },
};

const TABLE_PORTUGUESE = {
  INITIALS: {
    // Consonants
    'ㄱ': 'g', // g (gu?)
    'ㄴ': 'n', // n
    'ㄷ': 'd', // d
    'ㄹ': 'll', // l
    'ㅁ': 'm', // m
    'ㅂ': 'b', // b
    'ㅅ': 'ss', // s (ç?)
    'ㅇ': '-',
    'ㅈ': 'dj', // j
    'ㅊ': 'tch', // ch
    'ㅋ': 'K',
    'ㅌ': 'T',
    'ㅍ': 'P',
    'ㅎ': 'rr', // h
    // Double consonants
    'ㄲ': 'KK',
    'ㄸ': 't', // t
    'ㅃ': 'PP',
    'ㅆ': 'SS',
    'ㅉ': 'JJ',
  },
  MEDIALS: {
    // Vowels
    'ㅏ': 'a', // a
    'ㅓ': 'ô', // eo
    'ㅗ': 'o', // o
    'ㅜ': 'u', // u
    'ㅡ': 'u', // u
    'ㅣ': 'i', // i
    'ㅐ': 'ê', // ae
    'ㅔ': 'ê', // e
    'ㅚ': 'uê', // oe
    'ㅟ': 'UI',
    'ㅢ': 'iê', // eui
    // Vowels (y+)
    'ㅑ': 'ya',
    'ㅕ': 'io', // yeo
    'ㅛ': 'io', // yo
    'ㅠ': 'YU',
    'ㅒ': 'YAE',
    'ㅖ': 'ê', // ye
    // Vowels (w+)
    'ㅘ': 'ua', // wa
    'ㅝ': 'ô', // weo
    'ㅙ': 'WAE',
    'ㅞ': 'WE',
  },
  FINALS: {
    // Finals
    'ㄱ': '', // g (g)
    'ㄴ': 'n', // n
    'ㄷ': 'D',
    'ㄹ': '', // l (l)
    'ㅁ': 'm', // m
    'ㅂ': '', // b (b)
    'ㅅ': 's', // s
    'ㅇ': 'ng', // ng
    'ㅈ': 'J',
    'ㅊ': 'CH',
    'ㅋ': 'K',
    'ㅌ': 'T',
    'ㅍ': 'P',
    'ㅎ': 'H',

    'ㄲ': 'KK',
    'ㄵ': 'NJ',
    'ㄺ': 'LG',
    'ㅄ': 'b', // bs
    'ㅆ': 'ss', // ss

    'ㄳ': 'GS',
    'ㄶ': 'NH',
    'ㄻ': 'LM',

    'ㄼ': 'LB',
    'ㄽ': 'LS',
    'ㄾ': 'LT',
    'ㄿ': 'LP',
    'ㅀ': 'LH',
  },
};


const alpha = {
  INITIALS: ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
  MEDIALS: ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'],
  FINALS: ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],

  has(array, item) {
    return array.indexOf(item) !== -1;
  },
  isVowel(char) {
    return this.isMedial(char);
  },
  isConsonant(char) {
    return this.isInitial(char) || this.isFinal(char);
  },
  isInitial(char) {
    return this.has(this.INITIALS, char);
  },
  isMedial(char) {
    return this.has(this.MEDIALS, char);
  },
  isFinal(char) {
    return this.has(this.FINALS, char);
  },

  UNICODE_START: 0xAC00,
  UNICODE_END: 0xD7A3,
};

function disassemble(str) {
  return str.split('').map(disassembleChar);
}

function disassembleChar(char) {
  // Return vowels and consonants as is
  if (alpha.isVowel(char) || alpha.isConsonant(char)) {
    return [char];
  }

  // Work on unicode code
  if (!isComplexChar(char)) {
    return [char];
  }

  return breakComplexChar(char);
}

function isComplexChar(char) {
  const code = char.charCodeAt(0);
  return (code >= alpha.UNICODE_START && alpha.UNICODE_END >= code);
}

function breakComplexChar(char) {
  const charCode = char.charCodeAt(0);
  const code = charCode - alpha.UNICODE_START;

  const final = code % 28;
  const medial = ((code - final) / 28) % 21;
  const intial = (((code - final) / 28) - medial) / 21;

  return [
    alpha.INITIALS[intial],
    alpha.MEDIALS[medial],
    alpha.FINALS[final],
  ];
}

const romanize = (str, type) => {
  let table = TABLE_REGULAR;
  if (type === 'portuguese') {
    table = TABLE_PORTUGUESE;
  }

  function romanizer(sentence) {
    function romanizeWord(word) {
      return disassemble(word)
        .map(romanizeChar)
        .join('')
        .replace(/^-/, '');
    }

    function romanizeChar(char) {
      if (char.length < 2) {
        return table.INITIALS[char[0]] || table.MEDIALS[char[0]] || table.FINALS[char[0]] || char[0].toUpperCase();
      }

      const initial = table.INITIALS[char[0]];
      const medial = table.MEDIALS[char[1]];
      const final = table.FINALS[char[2]];

      return [initial, medial, final].filter(Boolean).join('');
    }

    return sentence.split(' ').map(romanizeWord).join(' ');
  }

  return str.split('\n').map(romanizer).join('\n');
};

export default romanize;
