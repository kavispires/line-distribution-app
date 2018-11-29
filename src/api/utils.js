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
  const memberNames = memberList.map(member => member.name || '').join(' ');
  return `${name} ${otherNames} ${memberNames}`;
};

export const buildMemberInitials = name =>
  `${name[0]}${name[Math.floor(name.length / 2)]}`.toUpperCase();
