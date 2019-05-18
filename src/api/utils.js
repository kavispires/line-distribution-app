import HttpStatus from 'http-status-codes';

/**
 * Parses the api path into an object
 * @param {string} path
 * @returns {object} with length of the path, root, referenceId, subPath, and queryParams
 */
const breadcrumble = path => {
  if (!path) {
    throw new Error(
      `${HttpStatus.UNAUTHORIZED}: A path is required to make api requests`
    );
  }

  if (typeof path !== 'string') {
    throw new Error(
      `${HttpStatus.BAD_REQUEST}: Breadcrumble path argument must be a string`
    );
  }

  const urlSplit = path.split('?');
  const fullPath = urlSplit[0].split('/');
  const queryParams = urlSplit[1] || null;
  const queryResult = {};

  if (queryParams) {
    const querySplit = queryParams.split('&');
    for (let i = 0; i < querySplit.length; i++) {
      const subQuery = querySplit[i].split('=');
      if (subQuery.length === 2) {
        const queryName = subQuery[0];
        let queryValue = subQuery[1];
        if (queryValue.includes(',')) {
          queryValue = queryValue.split(',');
        }
        queryResult[queryName] = queryValue;
      }
    }
  }

  return {
    length: fullPath.length - 1,
    root: fullPath[1],
    referenceId: fullPath[2] || null,
    subPath: fullPath[3] || null,
    queryParams: Object.keys(queryResult).length > 0 ? queryResult : null,
  };
};

/**
 * Builds a string query to be used on search functions for artists
 * @param {object} data
 * @returns {string} a lower cased string with name, otherNames, and members
 */
const buildArtistQuery = data => {
  const { name } = data;
  const otherNames = data.otherNames || '';
  const memberList = data.memberList || [];
  const memberNames = memberList.join(' ');
  return `${name} ${otherNames} ${memberNames}`.toLowerCase();
};

/**
 * Build member initials based on their name
 * @param {string} name
 * @returns {string} a two-digit upper cased string
 */
const buildMemberInitials = name =>
  `${name[0]}${name[Math.floor(name.length / 2)]}`.toUpperCase();

/**
 * Builds a string query to be used on search functions for songs
 * @param {Object} data
 * @returns {string} a lowercase string with title, original artists, and album name
 */
const buildSongQuery = data => {
  const { title } = data;
  const originalArtist = data.originalArtist || '';
  const album = data.album || '';
  return `${title} ${originalArtist} ${album}`.toLowerCase();
};

/**
 * Calculates the age of a member based on their birthday (YYYYMMDD) keeping a cache
 * @param {number} birthday
 * @returns {number} the age of the member
 */
const TODAY = process.env.NODE_ENV === 'test' ? 1550000000000 : Date.now();
const ageDict = {};
const calculateAge = birthday => {
  if (ageDict[birthday]) return ageDict[birthday];

  const birthdateString = birthday.toString();
  const birthDate = new Date(
    +birthdateString.substring(0, 4),
    +birthdateString.substring(4, 6),
    +birthdateString.substring(6)
  );

  const ageDate = new Date(TODAY - birthDate.getTime());
  ageDict[birthday] = Math.abs(ageDate.getUTCFullYear() - 1970);
  return ageDict[birthday];
};

/**
 * Parses genre into ENUM-ready string
 * @param {string} genre
 * @returns {string} genre ENUM-ready
 */
const ensureGenreEnum = genre => {
  const GENRES_TRANSFORM = {
    CPOP: 'CPOP',
    JPOP: 'JPOP',
    KPOP: 'KPOP',
    OTHER: 'OTHER',
    POP: 'POP',
    'C-POP': 'CPOP',
    'J-POP': 'JPOP',
    'K-POP': 'KPOP',
  };

  return GENRES_TRANSFORM[genre.toUpperCase()];
};

/**
 * Gets a random padded 6-digit color number
 * @param {string} colorId
 * @returns {string} padded 6-digit color number
 */
const getAlternativeColor = colorId => {
  const num = getNumberFromColorId(colorId) + 15;
  let list = [num, num - 2, num - 1, num + 1, num + 2];
  list = list.map(item => (item > 30 ? item - 30 : item));
  return makeSixDigit(list[Math.floor(Math.random() * list.length)]);
};

/**
 * Extracts the number value of a colorId
 * @param {string} colorId
 * @returns {number} number value of the colorID
 */
const getNumberFromColorId = colorId => Number(colorId.split('0000')[1]);

/**
 * Makes a number into a 6 digit stringed-number padded with 0s
 * @param {number} num
 * @returns {string} 6 digit stringed-number padded with 0s
 */
const makeSixDigit = num => {
  const pad = '000000';

  // if it's not a number nor a stringified number
  if (Number.isNaN(Number(num)) || typeof num === 'boolean') {
    return pad;
  }
  const str = num.toString();

  return pad.substring(0, pad.length - str.length) + str;
};

/**
 * Merges the array of members from the unit with the list of members generated from each indivitual member
 * @param {array} unitMembersArr
 * @param {array} membersArr
 * @returns {array} a merged member array
 */
const mergeMembers = (unitMembersArr, membersArr) => {
  const positionsDict = {};

  unitMembersArr.forEach(member => {
    positionsDict[member.memberId] = member.positions;
  });

  return membersArr.map(member => ({
    ...member.attributes,
    positions: positionsDict[member.id],
  }));
};

/**
 * Parses the members object from the database with concatenated id:name:position into a array with proper objects
 * @param {object} membersObj
 * @returns {array} array of members objects with memberId, name, and array of positions
 */
const parseUnitMembers = membersObj => {
  const dict = {};
  Object.keys(membersObj).forEach(key => {
    const [memberId, memberName, memberPosition] = key.split(':');

    if (dict[memberId] === undefined) {
      dict[memberId] = {
        positions: {},
      };
    }

    dict[memberId].memberId = memberId;
    dict[memberId].name = memberName;

    dict[memberId].positions[memberPosition] = true;
  });

  return Object.keys(dict).map(entry => {
    const result = {
      memberId: dict[entry].memberId,
      name: dict[entry].name,
      positions: Object.keys(dict[entry].positions),
    };
    return result;
  });
};

/**
 * Verifies if any of the required fields are present in the data, erroring out if any is missing
 * @param {object} data
 * @param {string} id
 * @param {string} uid
 * @param {array} fields
 * @returns {boolean} true if function runs without errors
 */
const verifyRequirements = (data, id, uid, fields) => {
  const missing = [];
  fields.forEach(field => {
    if (field === 'id' && (id === undefined || id === null)) {
      missing.push('id');
    } else if (field === 'uid' && (id === undefined || uid === null)) {
      missing.push('user uid');
    } else if (field !== 'id' && field !== 'uid' && data[field] === undefined) {
      missing.push(field);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `${HttpStatus.BAD_REQUEST}: Can NOT perform post request for ${id ||
        null}, missing the following data: ${missing.join(', ')}`
    );
  }

  return true;
};

/**
 * Adds ALL and NONE key to rates when any of them is undefined
 * @param {object} rates
 * @returns {object} rates with ALL and NONE keys
 */
const parseRates = rates => {
  const parsedRates = { ...rates };
  if (rates.ALL === undefined) {
    parsedRates.ALL = 0;
  }
  if (rates.NONE === undefined) {
    parsedRates.NONE = 0;
  }
  return parsedRates;
};

/**
 * Asyncronous function that delays code when using with async/await
 * @param {number} ms
 * @returns {Promise}
 */
export const wait = (ms = 1000) => new Promise((r, j) => setTimeout(r, ms)); // eslint-disable-line

export default {
  breadcrumble,
  buildArtistQuery,
  buildMemberInitials,
  buildSongQuery,
  calculateAge,
  ensureGenreEnum,
  getAlternativeColor,
  getNumberFromColorId,
  mergeMembers,
  makeSixDigit,
  parseRates,
  parseUnitMembers,
  verifyRequirements,
};
