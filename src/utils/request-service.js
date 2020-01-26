/* eslint no-underscore-dangle: 'off' */
import { toastr } from 'react-redux-toastr';

const states = {
  NO_STATE: Symbol('NO_STATE'),
  LOADING: Symbol('LOADING'),
  SUCCESS: Symbol('SUCCESS'),
  FAIL: Symbol('FAIL'),
};

const dataCache = {
  typeahead: {},
};

// const wait = (ms = 1000) => new Promise((r, j) => setTimeout(r, ms));

/**
 * Class to perform network requests.
 * @param type the data type defined in the API
 * @param path the API path root to make requests
 * @param api the API class that makes requests
 * @returns {bool}
 */
export default class RequestService {
  constructor(type, path, api, ignoreJSONAPI = false) {
    this._type = type;
    this._path = path;
    this._api = api;
    this._status = states.NO_STATE;
    this._data = null;
    this._errorMessage = null;
    this._lastFetched = 0;
    this._refresh = true;
    this._ignoreJSONAPI = ignoreJSONAPI;

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
   * Data to be used in the app.
   * @returns {string}
   */
  get data() {
    return this._data;
  }

  /**
   * Sets error state, message, and toaster.
   * @param {string }err the error message thrown by the api
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
   * Resets error message.
   * @returns {undefined}
   */
  clearError() {
    this._errorMessage = null;
  }

  /**
   * Fetches data from the api if data is stale or from cached data.
   * @param id the id of the entry to be read
   * @param componentContext the react component the RequestService is being used
   * @returns {undefined}
   */
  async read(id, componentContext) {
    // If it is already loading, don't run it again
    if (this.isLoading) return;

    this._status = states.LOADING;

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
    if (this.isLoading) return;

    this._status = states.LOADING;

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
    if (this.isLoading) return;

    this._status = states.LOADING;

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
    if (this.isLoading) return;

    this._status = states.LOADING;

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
 * Parses API data and stores it in dataCache.
 * @param data the data response
 * @param relationshipsa the list of relationships from the response
 * @param included the included relationship data from response
 * @param meta the meta object
 * @param type the type of the RequestService
 * @returns {undefined}
 */
const normalize = (response, responseType) => {
  const { data, meta } = response;
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
      normalize(entry);
    });
  } else {
    throw new Error('Data is not JSON;API compliant.');
  }
};
