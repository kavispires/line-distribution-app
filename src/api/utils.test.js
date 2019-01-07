import {
  NewResponse,
  breadcrumble,
  buildArtistQuery,
  buildMemberInitials,
  getNumberFromColorId,
  getAlternativeColor,
  buildSongQuery,
  makeSixDigit,
} from './utils';

let response;

describe('API/Utils', () => {
  describe('NewResponse class', () => {
    beforeEach(() => {
      response = new NewResponse();
    });

    it('its properties are nullified at build', () => {
      expect(response instanceof NewResponse);
      expect(response.statusCode).toEqual(null);
      expect(response.dataResponse).toEqual(null);
      expect(response.errorResponse).toEqual(null);
    });

    it('its status method sets a status code', () => {
      response.status(200);
      expect(response.statusCode).toEqual(200);
    });

    it('its ok method sets a status code to 200', () => {
      response.ok();
      expect(response.statusCode).toEqual(200);
    });

    it('its data method sets a data response', () => {
      response.data({ id: 'bola' }, 201);
      expect(response.statusCode).toEqual(201);
      expect(response.dataResponse).toStrictEqual({ id: 'bola' });
    });

    it('its data method has an optional status code argument', () => {
      response.data({ id: 'bola' });
      expect(response.statusCode).toEqual(200);
      expect(response.dataResponse).toStrictEqual({ id: 'bola' });
    });

    it('its data method sets a json response when id, type, and attributes are provided', () => {
      response.data({ id: 'bola', type: 'bola', attributes: { name: 'bola' } });
      expect(response.statusCode).toEqual(200);
      expect(response.dataResponse).toStrictEqual({
        id: 'bola',
        type: 'bola',
        attributes: { name: 'bola' },
      });
    });

    it('its error method sets an error response', () => {
      response.error(404, 'Not found');
      expect(response.statusCode).toEqual(404);
      expect(response.errorResponse).toStrictEqual({
        code: 404,
        message: 'Not found',
      });
    });

    it('its error method has an optional status code argument', () => {
      response.error(undefined, 'It did not work');
      expect(response.statusCode).toEqual(500);
      expect(response.errorResponse).toStrictEqual({
        code: 500,
        message: 'It did not work',
      });
    });

    it('its error method has an optional message argument', () => {
      response.error(404);
      expect(response.statusCode).toEqual(404);
      expect(response.errorResponse).toStrictEqual({
        code: 404,
        message: 'Unknown Error',
      });
    });

    it('its throwError method returns the error response', () => {
      response.error();
      function catcher() {
        response.throwError();
      }

      expect(catcher).toThrowError('500: Unknown Error');
    });

    it('its resolve method returns the data properly', () => {
      response.data({ id: 'bola', type: 'bola', attributes: { name: 'bola' } });
      expect(response.resolve()).toStrictEqual({
        data: {
          id: 'bola',
          type: 'bola',
          attributes: { name: 'bola' },
        },
      });
    });

    it('its resolve method returns an error if there is an error response', () => {
      response.error();
      function catcher() {
        response.resolve();
      }

      expect(catcher).toThrowError('500: Unknown Error');
    });

    it('its resolve method returns an error if there is an status code', () => {
      function catcher() {
        response.resolve();
      }

      expect(catcher).toThrowError('500: No status provided by the api');
    });

    it('its resolve method returns an error if there is no data response', () => {
      response.status(300);
      function catcher() {
        response.resolve();
      }

      expect(catcher).toThrowError('500: No data provided by the api');
    });
  });

  describe('Breadcrumble', () => {
    it('it throws an error if no path is provided', () => {
      function catcher() {
        breadcrumble();
      }

      expect(catcher).toThrowError(
        '401: A path is required to make api requests'
      );
    });

    it('it throws an error if no path is not a string', () => {
      function catcher() {
        breadcrumble(123);
      }

      expect(catcher).toThrowError(
        '400: Breadcrumble path argument must be a string'
      );
    });

    it('it returns the expected breadcrumble object', () => {
      const result = breadcrumble('/artists');

      expect(result).toStrictEqual({
        length: 1,
        root: 'artists',
        referenceId: null,
        subPath: null,
        queryParams: null,
      });
    });

    it('it treats the second part of the path as a reference id', () => {
      const result = breadcrumble('/artists/123');

      expect(result).toStrictEqual({
        length: 2,
        root: 'artists',
        referenceId: '123',
        subPath: null,
        queryParams: null,
      });
    });

    it('it treats the third part of the path as a subpath', () => {
      const result = breadcrumble('/artists/123/units');

      expect(result).toStrictEqual({
        length: 3,
        root: 'artists',
        referenceId: '123',
        subPath: 'units',
        queryParams: null,
      });
    });

    it('it accepts query params', () => {
      const result = breadcrumble('/artists/123/units?units=123,456');

      expect(result).toStrictEqual({
        length: 3,
        root: 'artists',
        referenceId: '123',
        subPath: 'units',
        queryParams: { units: ['123', '456'] },
      });
    });

    it('it accepts more than one query param', () => {
      const result = breadcrumble(
        '/artists/123/units?units=123,456,789&user=1'
      );

      expect(result).toStrictEqual({
        length: 3,
        root: 'artists',
        referenceId: '123',
        subPath: 'units',
        queryParams: { units: ['123', '456', '789'], user: '1' },
      });
    });
  });

  describe('buildArtistQuery', () => {
    it('it builds a correct querry', () => {
      const data = {
        name: 'test',
        otherNames: 'testie',
        memberList: ['testing', 'tested'],
      };
      const res = buildArtistQuery(data);

      expect(res).toEqual('test testie testing tested');
    });

    it('its otherNames data value is optional', () => {
      const data = {
        name: 'test',
        memberList: ['testing', 'tested'],
      };
      const res = buildArtistQuery(data);

      expect(res).toEqual('test  testing tested');
    });

    it('its memberList data value is optional', () => {
      const data = {
        name: 'test',
        otherNames: 'testie',
      };
      const res = buildArtistQuery(data);

      expect(res).toEqual('test testie ');
    });
  });

  describe('buildSongQuery', () => {
    it('it builds a correct querry', () => {
      const data = {
        title: 'test',
        originalArtist: 'testie',
        album: 'testing',
      };
      const res = buildSongQuery(data);

      expect(res).toEqual('test testie testing');
    });

    it('its originalArtist data value is optional', () => {
      const data = {
        title: 'test',
        album: 'testing',
      };
      const res = buildSongQuery(data);

      expect(res).toEqual('test  testing');
    });

    it('its album data value is optional', () => {
      const data = {
        title: 'test',
        originalArtist: 'testie',
      };
      const res = buildSongQuery(data);

      expect(res).toEqual('test testie ');
    });
  });

  describe('buildMemberInitials', () => {
    it('it builds member initials correctly', () => {
      expect(buildMemberInitials('test')).toEqual('TS');
      expect(buildMemberInitials('christopher')).toEqual('CT');
      expect(buildMemberInitials('melody')).toEqual('MO');
      expect(buildMemberInitials('hyoyeon')).toEqual('HY');
      expect(buildMemberInitials('bob')).toEqual('BO');
    });
  });

  describe('getNumberFromColorId', () => {
    it('it returns a number from a color id', () => {
      expect(getNumberFromColorId('col000012')).toEqual(12);
      expect(getNumberFromColorId('col000001')).toEqual(1);
      expect(getNumberFromColorId('col000025')).toEqual(25);
    });
  });

  describe('getAlternativeColor', () => {
    it('it returns a valid alternative color id', () => {
      let result = getNumberFromColorId(getAlternativeColor('col000012'));
      expect(result).toBeGreaterThanOrEqual(25);
      expect(result).toBeLessThanOrEqual(29);

      result = getNumberFromColorId(getAlternativeColor('col000025'));
      expect(result).toBeGreaterThanOrEqual(8);
      expect(result).toBeLessThanOrEqual(12);

      result = getNumberFromColorId(getAlternativeColor('col000016'));
      if (result < 4) {
        expect(result).toBeLessThanOrEqual(3);
        expect(result).toBeGreaterThanOrEqual(1);
      } else {
        expect(result).toBeLessThanOrEqual(30);
        expect(result).toBeGreaterThanOrEqual(29);
      }
    });
  });

  describe('makeSixDigit', () => {
    it('it returns correct number', () => {
      expect(makeSixDigit(1)).toEqual('000001');
      expect(makeSixDigit(123)).toEqual('000123');
      expect(makeSixDigit(444444)).toEqual('444444');
    });

    it('it accepts stringified numbers', () => {
      expect(makeSixDigit('1')).toEqual('000001');
      expect(makeSixDigit('123')).toEqual('000123');
      expect(makeSixDigit('444444')).toEqual('444444');
    });

    it('it returns the placeholder when parameter is not a number', () => {
      expect(makeSixDigit('abc')).toEqual('000000');
      expect(makeSixDigit([])).toEqual('000000');
      expect(makeSixDigit({})).toEqual('000000');
      expect(makeSixDigit(true)).toEqual('000000');
    });
  });
});
