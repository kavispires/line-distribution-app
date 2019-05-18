// import jest from 'jest'; // eslint-disable-line
import API from './index';

jest.setTimeout(5000);
jest.mock('firebase', () => {
  const firebasemock = require('firebase-mock');

  const mockdatabase = new firebasemock.MockFirebase();
  const mockauth = new firebasemock.MockFirebase();
  const mocksdk = new firebasemock.MockFirebaseSdk(
    path => {
      return path ? mockdatabase.child(path) : mockdatabase;
    },
    () => {
      return mockauth;
    }
  );

  // return the mock to match your export api
  return mocksdk;
});

let gResult;

describe('API', () => {
  beforeEach(() => {
    gResult = null;
  });

  describe('dbState', () => {
    it('it returns a response object', () => {
      const result = API.dbState();
      expect(result).toStrictEqual({
        data: { admin: false, authenticated: false, loaded: false },
      });
    });
  });

  describe('init', () => {
    it('initializes the firebase database', async () => {
      await API.init();
      const info = await API.dbState();

      expect(info).toStrictEqual({
        data: {
          admin: false,
          authenticated: false,
          loaded: true,
        },
      });
    });
  });

  // describe('test', () => {
  //   it('test_placeholder', async () => {
  //     await API.init();
  //     const res = await API.test();
  //     // const a = 1;
  //     expect(res).toEqual({});
  //   });
  // });

  describe('auth', () => {
    it('', async () => {
      // await API.init();
      // const res = await API.auth();
      // expect(res).toStrictEqual({
      //   data: {
      //     admin: false,
      //     authenticated: false,
      //     loaded: true,
      //   },
      // });
    });
  });

  // describe('login', () => {
  //   it('test_placeholder', () => {
  //     const a = 1;
  //     expect(a).toEqual(1);
  //   });
  // });

  // describe('logout', () => {
  //   it('it returns true when user is logged off', async () => {
  //     await API.init();
  //     const res = await API.logoff();

  //     expect(res).toEqual({ data: true });
  //   });
  // });

  describe('get', () => {
    beforeEach(async () => {
      await API.init();
      API.authenticated = true;
    });

    // it('it throws an error if the user is not authenticated', async () => {
    //   API.authenticated = false;

    //   // function catcher() {
    //   //   try {
    //   //     API.get();
    //   //   } catch (error) {
    //   //     return error;
    //   //   }
    //   // }

    //   // expect(catcher).toThrowError('500: Unknown Error');
    // });

    // it('it throws an error if the path is not valid', () => {
    //   const catcher = async () => {
    //     await API.get();
    //   };
    //   expect(catcher).toThrowError('500: Unknown Error');
    // });

    // it('it throws an error if the path is not provided', () => {
    //   const catcher = async () => {
    //     await API.get();
    //   };
    //   expect(catcher).toThrowError('500: Unknown Error');
    // });

    // it('it gets an user', async () => {
    //   const res = await API.get('/users/1');
    //   expect(res).toEqual({ data: { id: '1' } });
    // });
  });

  // describe('post', () => {
  //   it('test_placeholder', () => {
  //     const a = 1;
  //     expect(a).toEqual(1);
  //   });
  // });

  // describe('put', () => {
  //   it('test_placeholder', () => {
  //     const a = 1;
  //     expect(a).toEqual(1);
  //   });
  // });

  // describe('delete', () => {
  //   it('test_placeholder', () => {
  //     const a = 1;
  //     expect(a).toEqual(1);
  //   });
  // });
});
