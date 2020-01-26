/* eslint no-empty: 0 */
/* eslint prefer-promise-reject-errors: 0 */

import RequestService from './request-service';

const mockResponse = {
  data: {
    id: '1',
    type: 'test',
    attributes: { result: true },
  },
};

describe('RequestService', () => {
  const API_MOCK = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  it('works', () => {
    const requestService = new RequestService('test', '/', {});
    expect(requestService instanceof RequestService).toBeTruthy();
  });

  it('has its default states set correctly', () => {
    const requestService = new RequestService('test', '/', {});
    expect(requestService.isNoState).toBeTruthy();
    expect(requestService.isLoading).toBeFalsy();
    expect(requestService.isSuccessful).toBeFalsy();
    expect(requestService.isFailure).toBeFalsy();
    expect(requestService.isStale).toBeTruthy();
    expect(requestService.data).toBe(null);
  });

  it('throws an error if the data type is not defined', () => {
    function catcher() {
      this.service = new RequestService();
    }

    expect(catcher).toThrowError(
      'The data type defined in the API is required in the constructor'
    );
  });

  it('throws an error if the path is not defined', () => {
    function catcher() {
      this.service = new RequestService('test');
    }

    expect(catcher).toThrowError(
      'The API path root is required in the constructor'
    );
  });

  it('throws an error if the API is not defined', () => {
    function catcher() {
      this.service = new RequestService('test', '/');
    }

    expect(catcher).toThrowError(
      'The API service is required in the constructor'
    );
  });

  describe('Read', () => {
    it('calls API correctly', async () => {
      API_MOCK.get = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.read();

      expect(API_MOCK.get).toHaveBeenNthCalledWith(1, '/');
    });

    it('handles success state correctly', async () => {
      API_MOCK.get = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.read();

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeTruthy();
      expect(requestService.isFailure).toBeFalsy();
      expect(requestService.isStale).toBeFalsy();
      expect(requestService.data).toStrictEqual([{ id: '1', result: true }]);
    });

    it('handles loading state correctly', async () => {
      API_MOCK.get = jest.fn(() => mockResponse);
      const requestService = new RequestService('test', '/', API_MOCK);

      requestService.read();

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeTruthy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeFalsy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
    });

    it('handles error state correctly', async () => {
      API_MOCK.get = jest.fn(() => Promise.reject('Boom!'));
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.read();
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe('Boom!');
    });

    it('returns single data when id is present', async () => {
      API_MOCK.get = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.read('1');

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeTruthy();
      expect(requestService.isFailure).toBeFalsy();
      expect(requestService.isStale).toBeFalsy();
      expect(requestService.data).toStrictEqual({ id: '1', result: true });
    });

    it('returns array of data when id is omitted', async () => {
      API_MOCK.get = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.read();

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeTruthy();
      expect(requestService.isFailure).toBeFalsy();
      expect(requestService.isStale).toBeFalsy();
      expect(Array.isArray(requestService.data)).toBeTruthy();
    });

    it('throws an error is data is not JSON;API format-ish', async () => {
      API_MOCK.get = jest.fn(() => Promise.resolve({ data: true }));
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.read();
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe(
        'Data is not JSON;API compliant.'
      );
    });

    it('calls forceUpdate when the context is passed through the read method', async () => {
      API_MOCK.get = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      const context = { forceUpdate: jest.fn() };

      await requestService.read(null, context);

      expect(context.forceUpdate).toBeCalled();
    });
  });

  describe('Create', () => {
    it('calls API correctly', async () => {
      API_MOCK.post = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);
      const body = { name: 'Test' };
      await requestService.create(body);

      expect(API_MOCK.post).toHaveBeenNthCalledWith(1, '/', body);
    });

    it('throws an error if no body is present', async () => {
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.create();
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe(
        'A body object is required to perform a create request.'
      );
    });

    it('handles success state correctly', async () => {
      API_MOCK.post = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.create({});

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeTruthy();
      expect(requestService.isFailure).toBeFalsy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toStrictEqual({ id: '1', result: true });
    });

    it('handles loading state correctly', async () => {
      API_MOCK.post = jest.fn(() => mockResponse);
      const requestService = new RequestService('test', '/', API_MOCK);

      requestService.create({});

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeTruthy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeFalsy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
    });

    it('handles error state correctly', async () => {
      API_MOCK.post = jest.fn(() => Promise.reject('Boom!'));
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.create({});
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe('Boom!');
    });

    it('runs update method is an id is present in the body', async () => {
      const requestService = new RequestService('test', '/', API_MOCK);
      requestService.update = jest.fn();
      const body = { id: '1' };
      await requestService.create(body);

      expect(requestService.update).toHaveBeenNthCalledWith(1, '1', body);
    });

    it('returns newly created entry', async () => {
      API_MOCK.post = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.create({});

      expect(requestService.data).toStrictEqual({ id: '1', result: true });
    });

    it('throws an error is data is not JSON;API format-ish', async () => {
      API_MOCK.post = jest.fn(() => Promise.resolve({ data: true }));
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.create({});
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe(
        'Data is not JSON;API compliant.'
      );
    });

    it('calls forceUpdate when the context is passed through the create method', async () => {
      API_MOCK.post = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      const context = { forceUpdate: jest.fn() };

      await requestService.create({}, context);

      expect(context.forceUpdate).toBeCalled();
    });
  });

  describe('Update', () => {
    it('calls API correctly', async () => {
      API_MOCK.put = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      const body = { name: 'test' };
      await requestService.update('1', body);

      expect(API_MOCK.put).toHaveBeenNthCalledWith(1, '//1', body);
    });

    it('throws an error if no id is present', async () => {
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.update();
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe(
        'An id is required to perform an update request.'
      );
    });

    it('throws an error if no body is present', async () => {
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.update('1');
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe(
        'A body object is required to perform an update request.'
      );
    });

    it('handles success state correctly', async () => {
      API_MOCK.put = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.update('1', {});

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeTruthy();
      expect(requestService.isFailure).toBeFalsy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toStrictEqual({ id: '1', result: true });
    });

    it('handles loading state correctly', async () => {
      API_MOCK.put = jest.fn(() => mockResponse);
      const requestService = new RequestService('test', '/', API_MOCK);

      requestService.update('1', {});

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeTruthy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeFalsy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
    });

    it('handles error state correctly', async () => {
      API_MOCK.put = jest.fn(() => Promise.reject('Boom!'));
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.update('1', {});
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe('Boom!');
    });

    it('returns newly updated entry', async () => {
      API_MOCK.put = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.update('1', {});

      expect(requestService.data).toStrictEqual({ id: '1', result: true });
    });

    it('throws an error is data is not JSON;API format-ish', async () => {
      API_MOCK.put = jest.fn(() => Promise.resolve({ data: true }));
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.update('1', {});
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe(
        'Data is not JSON;API compliant.'
      );
    });

    it('calls forceUpdate when the context is passed through the update method', async () => {
      API_MOCK.put = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      const context = { forceUpdate: jest.fn() };

      await requestService.update('1', {}, context);

      expect(context.forceUpdate).toBeCalled();
    });
  });

  describe('Destroy', () => {
    it('calls API correctly', async () => {
      API_MOCK.delete = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.destroy('1');

      expect(API_MOCK.delete).toHaveBeenNthCalledWith(1, '//1');
    });

    it('throws an error if no body is present', async () => {
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.destroy();
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe(
        'An id is required to perform a destroy request.'
      );
    });

    it('handles success state correctly', async () => {
      API_MOCK.delete = jest.fn(() => Promise.resolve({}));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.destroy('1');

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeTruthy();
      expect(requestService.isFailure).toBeFalsy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toEqual(null);
    });

    it('handles loading state correctly', async () => {
      API_MOCK.delete = jest.fn(() => mockResponse);
      const requestService = new RequestService('test', '/', API_MOCK);

      requestService.destroy('1');

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeTruthy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeFalsy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
    });

    it('handles error state correctly', async () => {
      API_MOCK.delete = jest.fn(() => Promise.reject('Boom!'));
      const requestService = new RequestService('test', '/', API_MOCK);

      try {
        await requestService.destroy('1');
      } catch (_) {}

      expect(requestService.isNoState).toBeFalsy();
      expect(requestService.isLoading).toBeFalsy();
      expect(requestService.isSuccessful).toBeFalsy();
      expect(requestService.isFailure).toBeTruthy();
      expect(requestService.isStale).toBeTruthy();
      expect(requestService.data).toBe(null);
      expect(requestService.errorMessage).toBe('Boom!');
    });

    it('returns null', async () => {
      API_MOCK.delete = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.destroy('1');

      expect(requestService.data).toEqual(null);
    });

    it('calls forceUpdate when the context is passed through the delete method', async () => {
      API_MOCK.delete = jest.fn(() => Promise.resolve(mockResponse));
      const requestService = new RequestService('test', '/', API_MOCK);

      const context = { forceUpdate: jest.fn() };

      await requestService.destroy('1', context);

      expect(context.forceUpdate).toBeCalled();
    });
  });

  describe('Typeahead', () => {
    it('returns an empty array if typeahead was not returned by API', async () => {
      const requestService = new RequestService('test', '/', API_MOCK);

      expect(requestService.typeahead).toStrictEqual([]);
    });

    it('returns an empty array if typeahead was not returned by API', async () => {
      API_MOCK.get = jest.fn(() =>
        Promise.resolve({
          data: [
            {
              id: 1,
              type: 'test',
              attributes: { name: 'Test1' },
            },
          ],
          meta: {
            typeahead: [
              { value: '1', text: 'Test1' },
              { value: '2', text: 'Test2' },
            ],
          },
        })
      );
      const requestService = new RequestService('test', '/', API_MOCK);

      await requestService.read();

      expect(requestService.typeahead).toStrictEqual([
        { value: '1', text: 'Test1' },
        { value: '2', text: 'Test2' },
      ]);
    });
  });
});
