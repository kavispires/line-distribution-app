import API from './index';

let gResult;

describe('API', () => {
  beforeEach(() => {
    gResult = null;
  });

  describe('dbInfo', () => {
    it('it returns a response object', () => {
      const result = API.dbInfo();
      expect(result).toStrictEqual({
        data: { admin: false, authenticated: false, loaded: false },
      });
    });
  });

  describe('init', () => {
    it('test_placeholder', () => {
      const a = 1;
      expect(a).toEqual(1);
    });
  });

  describe('auth', () => {
    it('test_placeholder', () => {
      const a = 1;
      expect(a).toEqual(1);
    });
  });

  describe('login', () => {
    it('test_placeholder', () => {
      const a = 1;
      expect(a).toEqual(1);
    });
  });

  describe('logout', () => {
    it('test_placeholder', () => {
      const a = 1;
      expect(a).toEqual(1);
    });
  });

  describe('get', () => {
    it('test_placeholder', () => {
      const a = 1;
      expect(a).toEqual(1);
    });
  });

  describe('post', () => {
    it('test_placeholder', () => {
      const a = 1;
      expect(a).toEqual(1);
    });
  });

  describe('put', () => {
    it('test_placeholder', () => {
      const a = 1;
      expect(a).toEqual(1);
    });
  });

  describe('delete', () => {
    it('test_placeholder', () => {
      const a = 1;
      expect(a).toEqual(1);
    });
  });
});
