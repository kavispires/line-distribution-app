/* eslint no-underscore-dangle: ["error", { "allow": ["_authenticated", "_admin", _loaded, _loggedInThisSession, _uid, _tries] }] */

import firebase from 'firebase';
import HttpStatus from 'http-status-codes';
import { NewResponse, breadcrumble, wait } from './utils';

import { serialize, serializeCollection } from './serializers';
import { deserialize } from './deserializers';

import { fb, googleProvider, userSession } from './firebase';

const WAIT_DB_TIME = 3500;
const WAIT_AUTH_TIME = 2000;

export const db = {
  artists: {},
  colors: {},
  distributions: {},
  members: {},
  positions: {},
  songs: {},
  units: {},
  users: {},
};

export let dbRef = null; // eslint-disable-line

class API {
  constructor() {
    // const db = {};
    this._authenticated = false;
    this._admin = false;
    this._loaded = false;
    this._loggedInThisSession = false;
    this._tries = 0;
    this._uid = null;
  }

  dbRef() {
    return this._loaded ? dbRef : null;
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
      admin: this._authenticated ? this._admin : false,
      authenticated: this._authenticated,
      loaded: this._loaded,
    });

    return response.resolve();
  }

  /**
   * Creates a reference to the firebase database and updates api loaded status
   * @category Method
   * @returns {Boolean}
   */
  async init() {
    console.warn('Running init...');
    const response = new NewResponse();

    dbRef = await fb.database();

    if (dbRef) {
      this._loaded = true;
      response.status(HttpStatus.OK);
      response.data(this.dbInfo().data);
      this._loaded = true;
    } else {
      response.error(
        HttpStatus.BAD_REQUEST,
        'Failed to load firebase database'
      );
    }

    response.resolve();
    return this;
  }

  /**
   * Verifies if the users is still logged from a previous session
   * @category Method
   * @returns {Object} user
   */
  async auth() {
    console.warn('Running auth...');
    const response = new NewResponse();

    if (!this._loaded) {
      await wait(WAIT_AUTH_TIME);
    }

    const { user } = userSession;

    if (user.emailVerified) {
      this._authenticated = true;
      this._uid = user.uid;

      let userRes;
      try {
        userRes = await this.get(`/users/${user.uid}`);
      } catch (_) {
        userRes = await this.post(`/users/${user.uid}`);
      }

      userRes.data.attributes.displayName = user.displayName;
      userRes.data.attributes.photoURL = user.photoURL;

      this._admin = userRes.data.attributes.isAdmin;
      response.data(userRes.data);
    } else {
      this._authenticated = false;
      this._uid = null;
      response.data({}, HttpStatus.NO_CONTENT);
    }
    return response.resolve();
  }

  async login() {
    console.warn('Running login...');
    const response = new NewResponse();

    let result;

    try {
      await fb.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      result = await fb.auth().signInWithPopup(googleProvider);
    } catch (error) {
      response.error(error.code, error.message);
      return response.resolve();
    }

    try {
      const { user } = result;
      if (user.emailVerified) {
        this._authenticated = true;
        this._uid = user.uid;

        let userRes;
        try {
          userRes = await this.get(`/users/${user.uid}`);
        } catch (_) {
          userRes = await this.post(`/users/${user.uid}`);
        }

        userRes.data.attributes.displayName = user.displayName;
        userRes.data.attributes.photoURL = user.photoURL;

        this._admin = userRes.data.attributes.isAdmin;
        response.data(userRes.data);
      }
    } catch (error) {
      response.error(error.code, error.message);
    }

    return response.resolve();
  }

  async logoff() {
    console.warn('Running logout...');
    const response = new NewResponse();

    try {
      await fb.auth().signOut();
      this._authenticated = false;
      this._uid = null;
      response.ok();
      response.data(true);
    } catch (error) {
      response.error(error.code, error.message);
    }

    return response.resolve();
  }

  async get(path) {
    console.warn('Fetching data...', path);
    /*
     * List of possible get calls:
     * /artists
     * /artists/<id>
     * /artists/<id>/units
     * /colors
     * /members
     * /members/<id>
     * /positions
     * /songs
     * /songs/<id>
     * /units/<id>
     * /units/<id>/distribution
     * /units/<id>/members
     * /users/<id>
     */

    if (!this._loaded || !this._authenticated) {
      await wait(WAIT_DB_TIME);

      if (!this._loaded || !this._authenticated) {
        return this.throwDBError('GET');
      }
    }

    const route = breadcrumble(path);
    let result;

    switch (route.root) {
      // API/artists
      case 'artists':
        // API/artists/<id>/units
        if (route.referenceId && route.subPath === 'units') {
          result = await getFunctions.fetchArtistUnits(route.referenceId);
        }
        // API/artists/<id>
        else if (route.referenceId) {
          result = await getFunctions.fetchArtist(route.referenceId);
        }
        // API/aritsts
        else {
          result = await getFunctions.fetchArtists();
        }
        break;
      // API/colors
      case 'colors':
        result = await getFunctions.fetchColors();
        break;
      case 'members':
        // API/members/<id>
        if (route.referenceId) {
          result = await getFunctions.fetchMember(route.referenceId);
        }
        // API/members
        else {
          result = await getFunctions.fetchMembers();
        }
        break;
      // API/positions
      case 'positions':
        // TO-DO: fetch all positions
        break;
      // API/songs
      case 'songs':
        // API/songs/<id>
        if (route.referenceId) {
          result = await getFunctions.fetchSong(route.referenceId);
        }
        // API/songs
        else {
          result = await getFunctions.fetchSongs();
        }
        break;
      // API/units
      case 'units':
        // API/units/<id>/distributions
        if (route.referenceId && route.subPath === 'distributions') {
          result = await getFunctions.fetchUnitDistributions(route.referenceId);
        }
        // API/units/<id>/members
        else if (route.referenceId && route.subPath === 'members') {
          result = await getFunctions.fetchUnitMembers(route.referenceId);
        }
        // API/units/<id>
        else if (route.referenceId) {
          result = await getFunctions.fetchUnit(route.referenceId);
        }
        break;
      // API/users
      case 'users':
        // API/users/<id>
        result = await getFunctions.fetchUser(route.referenceId);
        break;
      default:
        return this.throwPathError('path');
    }

    const response = new NewResponse();
    response.data(result);
    return response.resolve();
  }

  async post(path, body) {
    console.warn('Writting data...');
    /*
     * List of possible post calls:
     * /artists
     * /distributions
     * /members
     * /songs
     * /units
     * /users
     */

    if (!this._loaded || !this._authenticated) {
      return this.throwDBError('POST');
    }

    const route = breadcrumble(path);
    let result;

    switch (route.root) {
      // API/artists/<id>
      case 'artists':
        result = await postFunctions.createArtist(body, this._uid);
        break;
      // API/distributions/<id>
      case 'distributions':
        result = await postFunctions.createDistribution(body, this._uid);
        break;
      // API/members/<id>
      case 'members':
        result = await postFunctions.createMember(body, this._uid);
        break;
      // API/songs/<id>
      case 'songs':
        result = await postFunctions.createSong(body, this._uid);
        break;
      // API/units/<id>
      case 'units':
        result = await postFunctions.createUnit(body, this._uid);
        break;
      // API/users/<id>
      case 'users':
        result = await postFunctions.createUser(body, this._uid);
        break;
      default:
        return this.throwPathError('path');
    }

    const response = new NewResponse();
    response.data(result);
    return response.resolve();
  }

  async put(path, body) {
    console.warn('Updating data...');
    /*
     * List of possible put calls:
     * /artists/<id>
     * /distributions/<id>
     * /members/<id>
     * /songs/<id>
     * /units/<id>
     * /users/<id>
     */

    if (!this._loaded || !this._authenticated) {
      return this.throwDBError('PUT');
    }

    const route = breadcrumble(path);
    let result;

    if (!route.referenceId) {
      // TO-DO: throw error
    }

    switch (route.root) {
      // API/artists/<id>
      case 'artists':
        result = await putFunctions.updateArtist(
          route.referenceId,
          body,
          this._uid
        );
        break;
      // API/distributions/<id>
      case 'distributions':
        result = await putFunctions.updateDistribution(
          route.referenceId,
          body,
          this._uid
        );
        break;
      // API/members/<id>
      case 'members':
        result = await putFunctions.updateMember(
          route.referenceId,
          body,
          this._uid
        );
        break;
      // API/songs/<id>
      case 'songs':
        result = await putFunctions.updateSong(
          route.referenceId,
          body,
          this._uid
        );
        break;
      // API/units/<id>
      case 'units':
        result = await putFunctions.updateUnit(
          route.referenceId,
          body,
          this._uid
        );
        break;
      // API/users/<id>
      case 'users':
        result = await putFunctions.updateUser(route.referenceId, body);
        break;
      default:
        return this.throwPathError('path');
    }

    const response = new NewResponse();
    response.data(result);
    return response.resolve();
  }

  async delete(path) {
    console.warn('Deleting data...');
    /*
     * List of possible delete calls:
     * /users/<id>
     */

    if (!this._loaded || !this._authenticated) {
      return this.throwDBError('DELETE');
    }

    if (!path) {
      return this.throwPathError('DELETE', 'path');
    }

    const route = breadcrumble(path);
    let result;

    if (!route.referenceId) {
      // TO-DO: throw error
    }

    switch (route.root) {
      // API/users/<id>
      case 'users':
        result = await deleteFunctions.destroyUser(route.referenceId);
        break;
      default:
        return this.throwPathError('path');
    }

    const response = new NewResponse();
    response.data(result);
    return response.resolve();
  }

  /**
   * Throws database related errors
   * @category Method
   * @param {String} action
   * @throws Error
   */
  throwDBError(action = '') {
    const response = new NewResponse();
    if (!this._loaded) {
      response.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Unable to perform ${action} action, database is not ready`
      );
    } else if (!this._authenticated) {
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
    if (this._loaded && type === 'body') {
      response.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Unable to perform ${action} action, data was not provided`
      );
    } else if (this._loaded && type === 'path') {
      response.error(
        HttpStatus.BAD_REQUEST,
        `Unable to perform ${action} action, path doesn't exist`
      );
    } else {
      response.error();
    }

    return response.resolve();
  }

  async test() {
    let r = 'bola';
    await this.dbRef().once('value', snap => {
      r = snap.val();
      return r;
    });

    return r;
  }

  async getDB() {
    return db;
  }

  async setter(key, value) {
    this[key] = value;
    return value;
  }
}

const getFunctions = {
  // Fetches all artists
  fetchArtists: async () => {
    if (Object.keys(db.artists).length === 0) {
      // TO-DO: Add 00 id to database, remove it in the serializer collection for a better cache check
      let response = {};
      await dbRef.ref(`/artists`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.artists = response;
    }
    return serializeCollection(db.artists, 'artist');
  },
  // Fetches single artist
  fetchArtist: async id => {
    if (!db.artists[id]) {
      let response = {};
      await dbRef.ref(`/artists/${id}`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.artists[id] = response;
    }
    return serialize.artist(db.artists[id], id);
  },
  // Fetches units from a single artist
  fetchArtistUnits: async id => {
    const artist = await getFunctions.fetchArtist(id);
    const response = await artist.attributes.units.map(unitId =>
      getFunctions.fetchUnit(unitId)
    );
    return Promise.all(response);
  },
  // Fetches all colors
  fetchColors: async () => {
    if (Object.keys(db.colors).length === 0) {
      let response = {};
      await dbRef.ref(`/colors`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.colors = response;
    }
    return serializeCollection(db.colors, 'color');
  },
  // Fetches single distribution
  fetchDistribution: async id => {
    if (!db.distributions[id]) {
      let response = {};
      await dbRef.ref(`/distributions/${id}`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.distributions[id] = response;
    }
    return serialize.distribution(db.distributions[id], id);
  },
  // Fetches all members
  fetchMembers: async () => {
    if (Object.keys(db.members).length === 0) {
      let response = {};
      await dbRef.ref(`/members`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.members = response;
    }
    return serializeCollection(db.members, 'member');
  },
  // Fetches single member
  fetchMember: async id => {
    if (!db.members[id]) {
      let response = {};
      await this.dbRef()
        .ref(`/members/${id}`)
        .once('value', snapshot => {
          response = snapshot.val();
        });
      db.members[id] = response;
    }
    return serialize.member(db.members[id], id);
  },
  // Fetches all songs
  fetchSongs: async () => {
    if (Object.keys(db.songs).length === 0) {
      // TO-DO: Add 00 id to database, remove it in the serializer collection for a better cache check
      let response = {};
      await dbRef.ref(`/songs`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.songs = response;
    }
    return serializeCollection(db.songs, 'song');
  },
  // Fetches single song
  fetchSong: async id => {
    if (!db.songs[id]) {
      let response = {};
      await dbRef.ref(`/songs/${id}`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.songs[id] = response;
    }
    return serialize.song(db.songs[id], id);
  },
  // Fetches single unit
  fetchUnit: async id => {
    if (!db.units[id]) {
      let response = {};
      await dbRef.ref(`/units/${id}`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.units[id] = response;
    }
    return serialize.unit(db.units[id], id);
  },
  // Fetches units from a single artist
  fetchUnitDistributions: async id => {
    const unit = await getFunctions.fetchUnit(id);
    const response = await unit.attributes.distributions.map(distributionId =>
      getFunctions.fetchDistribution(distributionId)
    );
    return Promise.all(response);
  },
  // Fetches units from a single artist
  fetchUnitMembers: async id => {
    const unit = await getFunctions.fetchUnit(id);
    const membersResponse = await unit.attributes.members.map(member =>
      getFunctions.fetchMember(member.memberId)
    );
    const promiseResponse = await Promise.all(membersResponse);
    const response = promiseResponse.map((member, index) => {
      member.attributes.positions = unit.attributes.members[index].positions;
      return member;
    });

    return response;
  },
  // Fetches single user
  fetchUser: async id => {
    if (!db.users[id]) {
      let response = {};
      await dbRef.ref(`/users/${id}`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.users[id] = response;
    }
    return serialize.user(db.users[id], id);
  },
};

const postFunctions = {
  // Creates single artist
  createArtist: async (body, uid) => {
    const key = await dbRef.ref(`/artists`).push().key;
    const data = deserialize.post.artist(body, key, uid);
    let response = {};
    await dbRef.ref(`/artists/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to create Artist ${key}: ${data.name}`;
        throw new Error(`${message}: ${error}`);
      } else {
        response = { ...data };
      }
    });
    db.artists[key] = response;
    return serialize.artist(db.artists[key]);
  },
  // Creates single color
  // TO-DO: Delete this after feeding firebase
  createColor: async body => {
    const key = await dbRef.ref(`/colors`).push().key;
    const data = deserialize.post.color(body, key);
    let response = {};
    await dbRef.ref(`/colors/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to create Color ${key}: ${data.name}`;
        throw new Error(`${message}: ${error}`);
      } else {
        response = { ...data };
      }
    });
    db.colors[key] = response;
    return serialize.color(db.colors[key]);
  },
  // Creates single distribution
  createDistribution: async body => {},
  // Creates single member
  createMember: async (body, uid) => {
    const key = await dbRef.ref(`/members`).push().key;
    const data = deserialize.post.member(body, key, uid);
    let response = {};
    await dbRef.ref(`/members/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to create Member ${key}: ${data.name}`;
        throw new Error(`${message}: ${error}`);
      } else {
        response = { ...data };
      }
    });
    db.members[key] = response;
    return serialize.member(db.members[key]);
  },
  // Creates single song
  createSong: async (body, uid) => {
    const key = await dbRef.ref(`/songs`).push().key;
    const data = deserialize.post.song(body, key, uid);
    let response = {};
    await dbRef.ref(`/songs/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to create Song ${key}: ${data.title}`;
        throw new Error(`${message}: ${error}`);
      } else {
        response = { ...data };
      }
    });
    db.songs[key] = response;
    return serialize.song(db.songs[key]);
  },
  // Creates single unit
  createUnit: async (body, uid) => {
    const key = await dbRef.ref(`/units`).push().key;
    const data = deserialize.post.unit(body, key, uid);
    let response = {};
    await dbRef.ref(`/units/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to create Unit ${key}: ${data.name}`;
        throw new Error(`${message}: ${error}`);
      } else {
        response = { ...data };
      }
    });
    db.units[key] = response;
    return serialize.unit(db.units[key]);
  },
  // Creates single user
  createUser: async (body, uid) => {
    const key = uid;
    const data = deserialize.post.user(body, key);
    let response = {};
    await dbRef.ref(`/users/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to create User ${key}`;
        throw new Error(`${message}: ${error}`);
      } else {
        response = { ...data };
      }
    });
    db.users[key] = response;
    return serialize.user(db.users[key]);
  },
};

const putFunctions = {
  // Updates single artist
  updateArtist: async (id, body, uid) => {
    const key = id;
    const data = deserialize.put.artist(body, key, uid);
    await dbRef.ref(`/artists/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to update Artist ${key}`;
        throw new Error(`${message}: ${error}`);
      }
    });
    let response = {};
    await dbRef.ref(`/artists/${key}`).once('value', snapshot => {
      response = snapshot.val();
    });
    db.artists[key] = response;
    return serialize.artist(db.artists[key]);
  },
  // Updates single distribution
  updateDistribution: async (id, body, uid) => {},
  // Updates single member
  updateMember: async (id, body, uid) => {
    console.log(id, body, uid);
    const key = id;
    const data = deserialize.put.member(body, key, uid);
    await dbRef.ref(`/members/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to update Member ${key}`;
        throw new Error(`${message}: ${error}`);
      }
    });
    let response = {};
    await dbRef.ref(`/members/${key}`).once('value', snapshot => {
      response = snapshot.val();
    });
    db.members[key] = response;
    return serialize.member(db.members[key]);
  },
  // Updates single song
  updateSong: async (id, body, uid) => {
    const key = id;
    const data = deserialize.put.song(body, key, uid);
    await dbRef.ref(`/songs/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to update Song ${key}`;
        throw new Error(`${message}: ${error}`);
      }
    });
    let response = {};
    await dbRef.ref(`/songs/${key}`).once('value', snapshot => {
      response = snapshot.val();
    });
    db.songs[key] = response;
    return serialize.song(db.songs[key]);
  },
  // Updates single unit
  updateUnit: async (id, body, uid) => {
    const key = id;
    const data = deserialize.put.unit(body, key, uid);
    await dbRef.ref(`/units/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to update Unit ${key}`;
        throw new Error(`${message}: ${error}`);
      }
    });
    let response = {};
    await dbRef.ref(`/units/${key}`).once('value', snapshot => {
      response = snapshot.val();
    });
    db.units[key] = response;
    return serialize.unit(db.units[key]);
  },
  // Updates single user
  updateUser: async (id, body, uid) => {
    const key = id;
    const data = deserialize.put.user(body, key, uid);
    await dbRef.ref(`/users/${key}`).update(data, error => {
      if (error) {
        const message = `Failed to update User ${key}: ${data.name}`;
        throw new Error(`${message}: ${error}`);
      }
    });
    let response = {};
    await dbRef.ref(`/users/${key}`).once('value', snapshot => {
      response = snapshot.val();
    });
    db.users[key] = response;
    return serialize.user(db.users[key]);
  },
};

const deleteFunctions = {
  // Destroys single user
  destroyUser: async (id, uid) => {
    if (id === uid) {
      await dbRef.ref(`/users/${uid}`).remove();
      return { [id]: true };
    }
  },
};

export default new API();
