import HttpStatus from 'http-status-codes';

import { ALTERNATIVE_COLOR_LIST } from './constants';

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

export const getAlternativeColor = colorId => {
  const list = [...ALTERNATIVE_COLOR_LIST[makeIdNumber(colorId)]];
  return makeSixDigit(list[Math.floor(Math.random() * list.length)]);
};

export const makeSixDigit = num => {
  const pad = '000000';
  if (typeof num !== 'number') {
    return pad;
  }
  const str = num.toString();

  return pad.substring(0, pad.length - str.length) + str;
};

export const makeIdNumber = id => {
  const num = id.substring(3);
  return Number(num) || 0;
};

export const wait = ms => new Promise((r, j) => setTimeout(r, ms));
