import HttpStatus from 'http-status-codes';

export class NewResponse {
  constructor() {
    this.statusCode = null;
    this.dataResponse = null;
    this.errorResponse = null;
  }

  status(code) {
    this.statusCode = code;
  }

  ok() {
    this.statusCode = HttpStatus.OK;
  }

  data(dt, code = HttpStatus.OK) {
    this.statusCode = code;
    if (dt && dt.id && dt.type && dt.attributes) {
      this.dataResponse = {
        id: dt.id,
        type: dt.type,
        attributes: dt.attributes,
      };
    } else {
      this.dataResponse = dt;
    }
  }

  error(code = HttpStatus.INTERNAL_SERVER_ERROR, message = 'Unknown Error') {
    this.statusCode = code;
    this.errorResponse = {
      code: this.statusCode,
      message,
    };
  }

  resolve() {
    if (this.errorResponse) {
      return this.throwError();
    }

    if (!this.statusCode) {
      this.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'No status provided by the api'
      );
      return this.throwError();
    }

    if (!this.dataResponse) {
      this.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'No data provided by the api'
      );
      return this.throwError();
    }

    return {
      data: this.dataResponse,
    };
  }

  throwError() {
    throw new Error(
      `${this.errorResponse.code}: ${this.errorResponse.message}`
    );
  }
}

export const breadcrumble = path => {
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

export const buildArtistQuery = data => {
  const { name } = data;
  const otherNames = data.otherNames || '';
  const memberList = data.memberList || [];
  const memberNames = memberList.join(' ');
  return `${name} ${otherNames} ${memberNames}`.toLowerCase();
};

export const buildSongQuery = data => {
  const { title } = data;
  const originalArtist = data.originalArtist || '';
  const album = data.album || [];
  return `${title} ${originalArtist} ${album}`.toLowerCase();
};

export const buildMemberInitials = name =>
  `${name[0]}${name[Math.floor(name.length / 2)]}`.toUpperCase();

export const verifyRequirements = (data, id, uid, fields) => {
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
};

export const getNumberFromColorId = colorId => Number(colorId.split('0000')[1]);

export const getAlternativeColor = colorId => {
  const oni = getNumberFromColorId(colorId);
  const num = oni + 15;
  let list = [num, num - 2, num - 1, num + 1, num + 2];
  list = list.map(item => (item > 30 ? item - 30 : item));
  return makeSixDigit(list[Math.floor(Math.random() * list.length)]);
};

export const makeSixDigit = num => {
  const pad = '000000';

  // if it's not a number nor a stringified number
  if (Number.isNaN(Number(num)) || typeof num === 'boolean') {
    return pad;
  }
  const str = num.toString();

  return pad.substring(0, pad.length - str.length) + str;
};

export const wait = ms => new Promise((r, j) => setTimeout(r, ms)); // eslint-disable-line

export const mergeMembers = (unitMembersArr, membersArr) => {
  const positionsDict = {};

  unitMembersArr.forEach(member => {
    positionsDict[member.memberId] = member.positions;
  });

  return membersArr.map(member => ({
    ...member.attributes,
    positions: positionsDict[member.id],
  }));
};

export const ensureGenreEnum = genre => {
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
