import HttpStatus from 'http-status-codes';

import _ from 'lodash';

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
 * Calculates the averages for each member in the unit
 * @param {array} members list of members
 * @param {array} distributions list of distributions
 * @returns {array} list of members with averages object
 */
const calculateUnitAverages = (members, distributions) => {
  const averages = {};
  const totals = {
    official: 0,
    custom: 0,
    rework: 0,
  };

  function calculateAverage(distribution, type) {
    Object.entries(distribution.rates).forEach(([memberId, duration]) => {
      if (!['ALL', 'NONE', 'max', 'remaining', 'total'].includes(memberId)) {
        if (averages[memberId] === undefined) {
          averages[memberId] = {
            official: 0,
            custom: 0,
            rework: 0,
          };
        }
        averages[memberId][type] += duration;
        totals[type] += duration;
      }
    });
  }

  Object.entries(distributions).forEach(([type, distributionsList]) => {
    distributionsList.forEach(distribution => {
      calculateAverage(distribution, type);
    });
  });

  Object.entries(averages).forEach(([memberId, durations]) => {
    averages[memberId].all = Number(
      (
        ((durations.official + durations.custom) * 100) /
        (totals.official + totals.custom)
      ).toFixed(1)
    );
    averages[memberId].official = Number(
      ((durations.official * 100) / totals.official).toFixed(1)
    );
    averages[memberId].custom = Number(
      ((durations.custom * 100) / totals.custom).toFixed(1)
    );

    averages[memberId].rework = Number(
      ((durations.rework * 100) / totals.rework).toFixed(1)
    );

    averages[memberId].official =
      averages[memberId].official > 1 ? averages[memberId].official : 0;
    averages[memberId].custom =
      averages[memberId].custom > 1 ? averages[memberId].custom : 0;
    averages[memberId].rework =
      averages[memberId].rework > 1 ? averages[memberId].rework : 0;
  });

  return members.map(member => {
    member.averages = averages[member.id];
    return member;
  });
};

/**
 * Builds object separating distributions by category
 * @param {array} distributions collection of memberUnitUrns (memberId:memberName:memberPosition)
 * @returns {object} distributions grouped by official, custom, redistribution
 */
const categorizeDistributions = distributions => {
  const sortedDistributions = _.sortBy(distributions, [
    d => d.data.songTitle.toLowerCase(),
  ]);

  return sortedDistributions.reduce(
    (res, distribution) => {
      switch (distribution.data.category) {
        case 'OFFICIAL':
          res.official.push(distribution.data);
          break;
        case 'SHOULD':
          res.rework.push(distribution.data);
          break;
        default:
          res.custom.push(distribution.data);
      }

      return res;
    },
    {
      official: [],
      custom: [],
      rework: [],
    }
  );
};

/**
 * Parses the object with members from a unit
 * @param {array} members collection of memberUnitUrns (memberId:memberName:memberPosition)
 * @returns {string} genre MALE, FEMALE, or MIXED
 */
const determineUnitGenre = members =>
  members.reduce(
    (res, member) => (member.data.attributes.gender !== res ? 'MIXED' : res),
    members[0].data.attributes.gender
  );

/**
 * Parses the object with members from a unit
 * @param {object} membersObj collection of memberUnitUrns (memberId:memberName:memberPosition)
 * @returns {array} list of member ids
 */
const getMembersIdsFromUnit = membersObj =>
  Object.keys(membersObj).reduce((arr, memberUnitUrn) => {
    const memberId = memberUnitUrn.split(':')[0];
    if (!arr.includes(memberId)) {
      arr.push(memberId);
    }
    return arr;
  }, []);

/**
 * Merges serialized members from unit and parsed unit members positions
 * @param {array} members
 * @param {obect} positionsObj
 * @returns {object} a collection of memberIds and their list of positions
 */
const mergeUnitMembers = (members, positionsObj) =>
  members.map(member => {
    const { id } = member.data;
    return {
      ...member.data.attributes,
      id,
      positions: positionsObj[id],
    };
  });

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
 * Parses unit members urns
 * @param {obect} members
 * @returns {object} a collection of memberIds and their list of positions
 */
const parseUnitMembersPositions = members =>
  Object.keys(members).reduce((res, key) => {
    const [id, , position] = key.split(':');
    if (res[id] === undefined) {
      res[id] = [];
    }
    res[id].push(position);
    return res;
  }, {});

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
  calculateUnitAverages,
  categorizeDistributions,
  determineUnitGenre,
  getMembersIdsFromUnit,
  mergeUnitMembers,
  parseArtistMemberUrn,
  parseColorRGB,
  parseUnitMembersPositions,
  wait,
};
