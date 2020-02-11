/* eslint no-underscore-dangle: 'off' */
import { toastr } from 'react-redux-toastr';

const states = {
  NO_STATE: Symbol('NO_STATE'),
  LOADING: Symbol('LOADING'),
  RELOADING: Symbol('RELOADING'),
  SUCCESS: Symbol('SUCCESS'),
  FAIL: Symbol('FAIL'),
};

const dataCache = {
  typeahead: {},
};

/**
 * Class to determine state.
 */
class StatefulService {
  constructor() {
    this._status = states.NO_STATE;
    this._errorMessage = null;
  }

  /**
   * Determines if request service has no state.
   * @returns {bool}
   */
  get isNoState() {
    return this._status === states.NO_STATE;
  }

  /**
   * Determines if request service is loading.
   * @returns {bool}
   */
  get isLoading() {
    return this._status === states.LOADING;
  }

  /**
   * Determines if request service has succeeded.
   * @returns {bool}
   */
  get isSuccessful() {
    return this._status === states.SUCCESS;
  }

  /**
   * Determines if request service has failed.
   * @returns {bool}
   */
  get isFailure() {
    return this._status === states.FAIL;
  }

  /**
   * Determines if request service is reloading.
   * @returns {bool}
   */
  get isReloading() {
    return this._status === states.RELOADING;
  }

  /**
   * Determines if request service is loading or reloading.
   * @returns {bool}
   */
  get isPending() {
    return this.isLoading || this.isReloading;
  }

  /**
   * Error message when request service has failed.
   * @returns {string}
   */
  get errorMessage() {
    if (this.isFailure) {
      return this._errorMessage || 'An unkown error has occured';
    }
    return '';
  }

  /**
   * Sets error state, message, and toaster.
   * @param {string} err the error message thrown by the api
   * @returns {undefined}
   */
  set error(err) {
    this._status = states.FAIL;
    if (process.env.NODE_ENV !== 'test') {
      console.error(err);
    }
    this._errorMessage = err.message || err;
    toastr.error(this.errorMessage);
  }

  /**
   * Sets status.
   * @param {string} state
   * @param {object} componentContext
   * @returns {undefined}
   */
  setState(state, componentContext) {
    if (typeof state !== 'symbol') {
      this.error(`State given is not allowed: ${state}`);
    }

    this._status = state;

    if (componentContext) {
      componentContext.forceUpdate();
    }
  }

  /**
   * Resets error message.
   * @returns {undefined}
   */
  clearError() {
    this._errorMessage = null;
  }
}

/**
 * Parses API data and stores it in dataCache.
 * @param data the data response
 * @param relationshipsa the list of relationships from the response
 * @param included the included relationship data from response
 * @param meta the meta object
 * @param type the type of the RequestService
 * @returns {undefined}
 */
const normalize = (response, responseType) => {
  const { data = response, meta } = response;
  // Normalize meta
  if (meta) {
    if (meta.typeahead) {
      dataCache.typeahead[responseType] = meta.typeahead;
    }
  }

  const { id, type, attributes } = data;

  // Normalize data: single entry or array
  if (id && type && attributes) {
    if (dataCache[type] === undefined) {
      dataCache[type] = {};
    }

    dataCache[type][id] = {
      id,
      ...attributes,
    };
  } else if (Array.isArray(data)) {
    data.forEach(entry => {
      normalize(entry, responseType);
    });
  } else {
    throw new Error('Data is not JSON;API compliant.');
  }
};

/**
 * Class to perform network requests.
 * @param type the data type defined in the API
 * @param path the API path root to make requests
 * @param api the API class that makes requests
 * @param ignoreJSONAPI flag indication if JSON;API compliance should be ignored
 */
export class RequestService extends StatefulService {
  constructor(type, path, api, ignoreJSONAPI = false) {
    super();
    this._type = type;
    this._path = path;
    this._api = api;
    this._data = null;
    this._lastFetched = 0;
    this._refresh = true;
    this._ignoreJSONAPI = ignoreJSONAPI;
    this.bola = 0;

    if (!type) {
      throw new Error(
        'The data type defined in the API is required in the constructor'
      );
    }

    if (!path) {
      throw new Error('The API path root is required in the constructor');
    }

    if (!api) {
      throw new Error('The API service is required in the constructor');
    }
  }

  /**
   * Determines if request service data should to be refetched.
   * @returns {bool}
   */
  get isStale() {
    return Boolean(
      this.isNoState ||
        this._refresh ||
        Date.now() - this._lastFetched > 1800000
    );
  }

  /**
   * Data to be used in the app.
   * @returns {string}
   */
  get data() {
    return this._data;
  }

  /**
   * Fetches data from the api if data is stale or from cached data.
   * @param id the id of the entry to be read
   * @param componentContext the react component the RequestService is being used
   * @returns {undefined}
   */
  async read(id, componentContext) {
    // If it is already loading, don't run it again
    if (this.isPending) return;

    this.setState(
      this._data ? states.RELOADING : states.LOADING,
      componentContext
    );

    try {
      let response;
      if (this.isStale) {
        this.clearError();
        const path = id ? `${this._path}/${id}` : this._path;
        response = await this._api.get(path);

        if (!this._ignoreJSONAPI) {
          normalize(response, this._type);
        }
      }
      this._refresh = false;
      this._lastFetched = Date.now();
      this._status = states.SUCCESS;
      if (process.env.NODE_ENV === 'development') {
        toastr.info(`Fetched ${this._path}`);
      }

      if (this._ignoreJSONAPI) {
        this.data = response.data || response;
      } else {
        this._data = id
          ? dataCache[this._type][id]
          : Object.values(dataCache[this._type] || {});
      }
    } catch (err) {
      this.error = err;
      this._data = null;
    } finally {
      if (componentContext) {
        componentContext.forceUpdate();
      }
    }
  }

  /**
   * Writes data in the api and updates data with the new content.
   * @param body the data of the entry to be created
   * @param componentContext the react component the RequestService is being used
   * @returns {undefined}
   */
  async create(body, componentContext) {
    // If it is already loading, don't run it again
    if (this.isPending) return;

    this.setState(
      this._data ? states.RELOADING : states.LOADING,
      componentContext
    );

    // Check if body is present
    if (!body) {
      this.error = 'A body object is required to perform a create request.';
      return;
    }

    // If it was supposed to be an update, do it instead
    if (body.id) {
      this.update(body.id, body);
      return;
    }

    try {
      this.clearError();
      const response = await this._api.post(this._path, { ...body });

      if (!this._ignoreJSONAPI) {
        normalize(response, this._type);
      }

      if (process.env.NODE_ENV === 'development') {
        toastr.info(`Created ${this._path} successfully`);
      }

      this._refresh = true;
      this._status = states.SUCCESS;

      const id = response.data.id;

      if (this._ignoreJSONAPI) {
        this.data = response.data || response;
      } else {
        this._data = id ? dataCache[this._type][id] : {};
      }
    } catch (err) {
      this.error = err;
      this._data = null;
    } finally {
      if (componentContext) {
        componentContext.forceUpdate();
      }
    }
  }

  /**
   * Updates data in the api and updates data with the new content.
   * @param id the id of the entry to be updated
   * @param body the data of the entry to be updated
   * @param componentContext the react component the RequestService is being used
   * @returns {undefined}
   */
  async update(id, body, componentContext) {
    // If it is already loading, don't run it again
    if (this.isPending) return;

    this.setState(
      this._data ? states.RELOADING : states.LOADING,
      componentContext
    );

    // Check if body is present
    if (!id) {
      this.error = 'An id is required to perform an update request.';
      return;
    }

    // Check if body is present
    if (!body) {
      this.error = 'A body object is required to perform an update request.';
      return;
    }

    try {
      this.clearError();

      const path = `${this._path}/${id}`;

      const response = await this._api.put(path, { ...body });

      if (!this._ignoreJSONAPI) {
        normalize(response, this._type);
      }

      if (process.env.NODE_ENV === 'development') {
        toastr.info(`Updated ${path} successfully`);
      }

      this._refresh = true;
      this._status = states.SUCCESS;

      if (this._ignoreJSONAPI) {
        this.data = response.data || response;
      } else {
        this._data = id
          ? dataCache[this._type][id]
          : Object.values(dataCache[this._type] || {});
      }
    } catch (err) {
      this.error = err;
      this._data = null;
    } finally {
      if (componentContext) {
        componentContext.forceUpdate();
      }
    }
  }

  /**
   * Destroys data in the api.
   * @param id the id of the entry to be updated
   * @param componentContext the react component the RequestService is being used
   * @returns {undefined}
   */
  async destroy(id, componentContext) {
    // If it is already loading, don't run it again
    if (this.isPending) return;

    this.setState(
      this._data ? states.RELOADING : states.LOADING,
      componentContext
    );

    // Check if body is present
    if (!id) {
      this.error = 'An id is required to perform a destroy request.';
      return;
    }

    try {
      this.clearError();

      const path = `${this._path}/${id}`;

      await this._api.delete(path);

      if (process.env.NODE_ENV === 'development') {
        toastr.info(`Destroyed ${path} successfully`);
      }

      this._refresh = true;
      this._status = states.SUCCESS;

      delete dataCache[this._type][id];

      this._data = null;
    } catch (err) {
      this.error = err;
      this._data = null;
    } finally {
      if (componentContext) {
        componentContext.forceUpdate();
      }
    }
  }

  /**
   * Gets typeahead for data type.
   * @returns {array}
   */
  get typeahead() {
    return dataCache.typeahead[this._type] || [];
  }
}

/**
 * Class to perform network requests for the user.
 * @param type the data type defined in the API
 * @param path the API path root to make requests
 * @param api the API class that makes requests
 * @param ignoreJSONAPI flag indication if JSON;API compliance should be ignored
 */
export class UserRequestService extends RequestService {
  constructor(type, path, api, ignoreJSONAPI = false) {
    super(type, path, api, ignoreJSONAPI);
  }

  async init(componentContext) {
    // If it is already loading, don't run it again
    if (this.isPending) return;

    this.setState(
      this._data ? states.RELOADING : states.LOADING,
      componentContext
    );

    try {
      this.clearError();

      const response = await this._api.init();
      if (response.user) {
        normalize(response.user);
        this._refresh = false;
        this._lastFetched = Date.now();
        this._status = states.SUCCESS;

        this._data = dataCache[this._type][response.user.data.id];

        toastr.success(
          'Welcome Back!',
          `You are logged in as ${this.data.displayName}`
        );
      } else {
        this._status = states.NO_STATE;
      }
    } catch (err) {
      this.error = err;
      this._data = null;
    } finally {
      if (componentContext) {
        componentContext.forceUpdate();
      }
    }
  }

  async login(componentContext) {
    // If it is already loading, don't run it again
    if (this.isPending) return;

    this.setState(
      this._data ? states.RELOADING : states.LOADING,
      componentContext
    );

    try {
      this.clearError();

      const response = await this._api.login();
      normalize(response);

      console.log(response.data);

      this._refresh = false;
      this._lastFetched = Date.now();
      this._status = states.SUCCESS;

      toastr.success(
        'Hello!',
        `You are logged in as ${response.data.displayName}`
      );

      this._data = dataCache[this._type][response.data.id];
    } catch (err) {
      this.error = err;
      this._data = null;
    } finally {
      if (componentContext) {
        componentContext.forceUpdate();
      }
    }
  }

  async logout(componentContext) {
    // If it is already loading, don't run it again
    if (this.isPending) return;

    this.setState(
      this._data ? states.RELOADING : states.LOADING,
      componentContext
    );

    try {
      this.clearError();

      const response = await this._api.logout();

      this._refresh = false;
      this._lastFetched = Date.now();
      this._status = states.SUCCESS;

      toastr.success('You were logged out successfully');

      this._data = dataCache[this._type][response.data.id];
    } catch (err) {
      this.error = err;
      this._data = null;
    } finally {
      if (componentContext) {
        componentContext.forceUpdate();
      }
    }
  }
}

export default RequestService;
