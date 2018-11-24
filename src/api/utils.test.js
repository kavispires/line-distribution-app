import { NewResponse, breadcrumble } from './utils';

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
});
