import HttpStatus from 'http-status-codes';
import { UNKNOWN } from './enums';

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

  // Determine reference id is present
  const hasSecondaryPath = fullPath[2];
  const isReferenceId = hasSecondaryPath
    ? fullPath[2][0] === '-' || fullPath[1] === 'users'
    : false;

  const referenceId = isReferenceId ? fullPath[2] : null;
  // Determine subpath as third element if referenceId otherwise second element
  const subPath = isReferenceId ? fullPath[3] : fullPath[2];

  return {
    length: fullPath.length - 1,
    root: fullPath[1],
    referenceId,
    subPath: subPath || null,
    queryParams: Object.keys(queryResult).length > 0 ? queryResult : null,
  };
};

/**
 * Builds a string query to be used on search functions for artists
 * @param {object} data
 * @param {object} members
 * @returns {string} a lower cased string with name, otherNames, and members
 */
const buildArtistQuery = (data, membersData) => {
  const { name } = data;
  const otherNames = data.otherNames || '';
  const agency = data.agency !== UNKNOWN ? data.agency : '';
  const membersNames = membersData.map(m => m.name).join(' ');

  return `${name} ${otherNames} ${membersNames} ${agency}`.toLowerCase();
};

/**
 * Build member initials based on their name
 * @param {string} name
 * @returns {string} a two-digit upper cased string
 */
const buildMemberInitials = name =>
  `${name[0]}${name[Math.floor(name.length / 2)]}`.toUpperCase();

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
 * Parses artistMemberUrn
 * @param {string} urn
 * @returns {object} with id, name, color
 */
const parseArtistMemberUrn = urn => {
  const [, id, name, color] = urn.split(':');
  return {
    id,
    name,
    color,
  };
};

/**
 * Parses color rgb
 * @param {string} rgb
 * @returns {object} with r, g, b
 */
const parseColorRGB = rgb => {
  const [r, g, b] = rgb.split(',');
  return {
    r,
    g,
    b,
  };
};

/**
 * Asyncronous function that delays code when using with async/await
 * @param {number} ms time in miliseconds the fuction should wait
 * @returns {Promise}
 */
const wait = (ms = 1000) => new Promise((r, j) => setTimeout(r, ms)); // eslint-disable-line

export default {
  breadcrumble,
  buildArtistQuery,
  buildMemberInitials,
  calculateAge,
  parseArtistMemberUrn,
  parseColorRGB,
  wait,
};
