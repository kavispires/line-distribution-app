import firebase from 'firebase';
import HttpStatus from 'http-status-codes';
import { NewResponse, breadcrumble } from './utils';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

let fb = firebase.initializeApp(config);
const googleProvider = new firebase.auth.GoogleAuthProvider();

export class API {
  constructor(testing = false) {
    this.testing = testing;
    const db = {};
    this.authenticated = false;
    this.admin = false;
    this.loaded = false;
    this.dbRef = null;
  }

  /**
   * Gets basic information about database
   * @category Getter
   * @returns {Object}
   */
  dbInfo() {
    console.warn('Fetching DB info...');
    const response = new NewResponse();

    response.status(HttpStatus.OK);
    response.data({
      admin: this.authenticated ? this.admin : false,
      authenticated: this.authenticated,
      loaded: this.loaded,
    });

    return response.resolve();
  }

  /**
   * Creates a reference to the firebase database and updates api loaded status
   * @category Method
   * @returns {Boolean}
   */
  async init() {
    if (this.testing) {
    }

    console.warn('Running init...');
    const response = new NewResponse();

    this.dbRef = await fb.database().ref();

    if (this.dbRef) {
      this.loaded = true;
      response.status(HttpStatus.OK);
      response.data(this.dbInfo().data);
      this.loaded = true;
    } else {
      response.error(
        HttpStatus.BAD_REQUEST,
        'Failed to load firebase database'
      );
    }

    return response.resolve();
  }

  /**
   * Verifies if the users is still logged from a previous session
   * @category Method
   * @returns {Object} user
   */
  async auth() {
    console.warn('Running auth...');
    const response = new NewResponse();

    await fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.authenticated = true;
        // TO-DO: It should merge and merge with user

        return user;
      }
      this.authenticated = false;
      return {};
    });
  }

  async login() {
    console.warn('Running login...', this);
    const response = new NewResponse();

    return response.resolve();
  }

  async logoff() {
    console.warn('Running logout...', this);

    const response = new NewResponse();

    return response.resolve();
  }

  async get(path) {
    console.warn('Fatching data...');

    if (!this.loaded || !this.authenticated) {
      return this.throwDBError('GET');
    }
  }

  async post(path, body) {
    console.warn('Writting data...');

    if (!this.loaded || !this.authenticated) {
      return this.throwDBError('POST');
    }

    const route = breadcrumble(path);
    // API/users/<id>

    // API/artists/<id>
    // API/units/<id>
    // API/distributions/<id>
    // API/members/<id>
    // API/songs/<id>
  }

  async put(path, body) {
    console.warn('Updating data...');

    if (!this.loaded || !this.authenticated) {
      return this.throwDBError('PUT');
    }

    if (!path) {
      return this.throwPathError('PUT', 'path');
    }

    if (!body) {
      return this.throwPathError('PUT', 'body');
    }

    // API/artists/<id>
    // API/units/<id>
    // API/distributions/<id>
    // API/members/<id>
    // API/songs/<id>
    // API/users/<id>
  }

  async delete(path) {
    console.warn('Deleting data...');

    if (!this.loaded || !this.authenticated) {
      return this.throwDBError('DELETE');
    }

    if (!path) {
      return this.throwPathError('DELETE', 'path');
    }

    // API/users/<id>
  }

  /**
   * Throws database related errors
   * @category Method
   * @param {String} action
   * @throws Error
   */
  throwDBError(action = '') {
    const response = new NewResponse();
    if (!this.loaded) {
      response.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Unable to perform ${action} action, database is not ready`
      );
    } else if (!this.authenticated) {
      response.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Unable to perform ${action} action, you are not logged in`
      );
    }

    return response.resolve();
  }

  /**
   * Throws api methods related errors
   * @category Method
   * @param {String} action
   * @param {String} type
   * @throws Error
   */
  throwPathError(action = '', type = 'path') {
    const response = new NewResponse();
    if (this.loaded && type === 'body') {
      response.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Unable to perform ${action} action, data was not provided`
      );
    } else if (this.loaded && type === 'path') {
      response.error(
        HttpStatus.BAD_REQUEST,
        `Unable to perform ${action} action, path doesn't exist`
      );
    } else {
      response.error();
    }

    return response.resolve();
  }
}

export default new API();
