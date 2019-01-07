import serializer from '../../api/serializer';

describe('Serializer', () => {
  describe('Pre-type checks', () => {
    it('requires a valid schema to be provided', () => {
      const responseNoSquema = () => serializer(null, {});

      expect(responseNoSquema).toThrowError('Failed to provide schema name');

      const responseInvalid = () => serializer('bola', {});

      expect(responseInvalid).toThrowError('Invalid schema provided');
    });

    it('requires an id when it is not a database schema', () => {
      const response1 = () => serializer('test', {});
      expect(response1).toThrowError(
        'Missing id. Api calls MUST add the entry id to its data'
      );
      const response2 = serializer('test', {
        id: '-0000000000000000001',
        hex: '#000000',
        email: 'test@test.com',
      });
      expect(response2).toHaveProperty('array', []);
      expect(response2).toHaveProperty('boolean', false);
      expect(response2).toHaveProperty('string', '');
      expect(response2).toHaveProperty('number', 0);
      expect(response2).toHaveProperty('hex', '#000000');
      expect(response2).toHaveProperty('id', '-0000000000000000001');
      expect(response2).toHaveProperty('link', null);
      expect(response2).toHaveProperty('list', []);
      expect(response2).toHaveProperty('object', {});
      expect(response2).toHaveProperty('email', 'test@test.com');
      expect(response2).toHaveProperty('referenceColor', null);
      expect(response2).toHaveProperty('referenceId', null);
    });
  });

  let testObject = null;

  describe('Type Checks', () => {
    beforeEach(() => {
      testObject = {
        id: '-0000000000000000001',
        hex: '#000000',
        email: 'test@test.com',
      };
    });

    it('verifies primitive type: boolean', () => {
      testObject.boolean = '';
      const response = () => serializer('test', testObject);
      expect(response).toThrowError(
        'boolean type for test must be a boolean, instead got: string'
      );
    });

    it('verifies primitive type: number', () => {
      testObject.number = '';
      const response = () => serializer('test', testObject);
      expect(response).toThrowError(
        'number type for test must be a number, instead got: string'
      );
    });

    it('verifies primitive type: string', () => {
      testObject.string = 0;
      const response = () => serializer('test', testObject);
      expect(response).toThrowError(
        'string type for test must be a string, instead got: number'
      );
    });

    it('verifies array type', () => {
      testObject.array = '';
      const response = () => serializer('test', testObject);
      expect(response).toThrowError(
        'array on the test table must be an array, instead got: string'
      );
    });

    it('verifies object type', () => {
      testObject.object = '';
      const response = () => serializer('test', testObject);
      expect(response).toThrowError(
        'object on the test table must be an object, instead got: string'
      );
    });

    it('verifies hex type', () => {
      testObject.hex = 0;
      const response1 = () => serializer('test', testObject);
      expect(response1).toThrowError(
        'hex on the test table must be a string, instead got: number'
      );
      testObject.hex = '000000';
      const response2 = () => serializer('test', testObject);
      expect(response2).toThrowError(
        'hex on the test table must begin with a hash #, instead got: 000000'
      );
      testObject.hex = '#eeeee';
      const response3 = () => serializer('test', testObject);
      expect(response3).toThrowError(
        'hex on the test table has 7 digits, instead got: #eeeee'
      );
    });

    it('verifies list type', () => {
      testObject.list = '';
      const response1 = () => serializer('test', testObject);
      expect(response1).toThrowError(
        'list on the test table must be an array, instead got: string'
      );

      testObject.list = [0, '000', '-abc'];
      const response2 = () => serializer('test', testObject);
      expect(response2).toThrowError(
        'list on the test table must be an array with 20-digit unique id strings, but got incorrect items: 0, 000, -abc'
      );
    });

    it('verifies id type', () => {
      testObject.id = 0;
      const response1 = () => serializer('color', testObject);
      expect(response1).toThrowError(
        'id on the color table must be a string, instead got: number'
      );

      testObject.id = '1';
      const response2 = () => serializer('color', testObject);
      expect(response2).toThrowError(
        'Ids for the color table must have 9 digits, instead got: 1'
      );

      testObject.id = 0;
      const response3 = () => serializer('test', testObject);
      expect(response3).toThrowError(
        'id on the test table must be a string, instead got: number'
      );

      testObject.id = 'a';
      const response4 = () => serializer('test', testObject);
      expect(response4).toThrowError(
        'Ids for the test table must start with a dash, instead got: a'
      );

      testObject.id = '-abc';
      const response5 = () => serializer('test', testObject);
      expect(response5).toThrowError(
        'Ids for the test table must have 20 digits, instead got: -abc'
      );
    });

    it('verifies reference: color type', () => {
      testObject.referenceColor = 0;
      const response1 = () => serializer('test', testObject);
      expect(response1).toThrowError(
        'referenceColor on the test table must be a string, instead got: number'
      );

      testObject.referenceColor = 'orange';
      const response2 = () => serializer('test', testObject);
      expect(response2).toThrowError(
        "referenceColor on the test table must start with prefix 'col', instead got: orange"
      );
    });

    it('verifies reference: id type', () => {
      testObject.referenceId = 0;
      const response1 = () => serializer('test', testObject);
      expect(response1).toThrowError(
        'referenceId on the test table must be a string, instead got: number'
      );

      testObject.referenceId = '111';
      const response2 = () => serializer('test', testObject);
      expect(response2).toThrowError(
        'referenceId on the test table must start with a dash, instead got: 111'
      );

      testObject.referenceId = '-111';
      const response3 = () => serializer('test', testObject);
      expect(response3).toThrowError(
        'referenceId on the test table must have 20 digits, instead got: -111'
      );
    });

    it('verifies link type', () => {
      testObject.link = 0;
      const response1 = () => serializer('test', testObject);
      expect(response1).toThrowError(
        'link on the test table must be a string, instead got: number'
      );

      testObject.link = 'www.bol.com';
      const response2 = () => serializer('test', testObject);
      expect(response2).toThrowError(
        'link on the test table must be a http link, instead got: www.bol.com'
      );
    });

    it('verifies email type', () => {
      testObject.email = 0;
      const response1 = () => serializer('test', testObject);
      expect(response1).toThrowError(
        'email on the test table must be a string, instead got: number'
      );

      testObject.email = 'bola.com';
      const response2 = () => serializer('test', testObject);
      expect(response2).toThrowError(
        'email on the test table must be a email string with an @, instead got: bola.com'
      );
    });
  });
});
