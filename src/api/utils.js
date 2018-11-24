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

export const placeholder = () => {};
