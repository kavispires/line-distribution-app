import HttpStatus from 'http-status-codes';
import { NewResponse, breadcrumble } from './utils';

import { serialize, serializeCollection } from './serializers';

import { fb, googleProvider } from './firebase';

const db = {
  artists: {},
  colors: {},
  distributions: {},
  members: {},
  positions: {},
  songs: {},
  units: {},
  users: {},
};

let dbRef = null;

class API {
  constructor() {
    // const db = {};
    this.authenticated = false;
    this.admin = false;
    this.loaded = false;
    this.loggedInThisSession = false;
  }

  dbRef() {
    return this.loaded ? dbRef : null;
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
    console.warn('Running init...');
    const response = new NewResponse();

    dbRef = await fb.database();

    if (dbRef) {
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

    await fb.auth().onAuthStateChanged(async user => {
      if (user) {
        this.authenticated = true;
        // TO-DO If users doesn't exist, create it, then merge
        const userRes = await this.get(`/users/${user.uuid}`); // TO-DO: this might break
        userRes.attributes.displayName = user.displayName;
        userRes.attributes.photoUrl = user.photoUrl;

        this.admin = userRes.attributes.isAdmin;
        response.data(userRes);
        return response.resolve();
      }
      this.authenticated = false;
      return {};
    });
  }

  async login() {
    console.warn('Running login...');
    const response = new NewResponse();

    let result;
    try {
      await fb.auth().setPersistence(fb.auth.Auth.Persistence.LOCAL);

      result = await fb.auth().signInWithPopup(googleProvider);
    } catch (error) {
      response.error(error.code, error.message);
      return response.resolve();
    }

    try {
      const { user } = result;
      if (user.emailVerified) {
        this.authenticated = true;

        const userRes = await this.get(`/users/${user.uuid}`);
        userRes.attributes.displayName = user.displayName;
        userRes.attributes.photoUrl = user.photoUrl;

        this.admin = userRes.attributes.isAdmin;
        response.data(userRes);
      }
    } catch (error) {
      console.error(error);
    }

    return response.resolve();
  }

  async logoff() {
    console.warn('Running logout...');
    const response = new NewResponse();

    try {
      await fb.auth().signOut();
      this.authenticated = false;
      response.ok();
      response.data(true);
    } catch (error) {
      response.error(error.code, error.message);
    }

    return response.resolve();
  }

  async get(path) {
    console.warn('Fetching data...', path);
    /**
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
     **/

    if (!this.loaded || !this.authenticated) {
      return this.throwDBError('GET');
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

  async test() {
    let r = 'bola';
    await this.dbRef().once('value', snap => {
      r = snap.val();
      return r;
    });

    return r;
  }

  async setter(authenticated) {
    this.authenticated = authenticated;
    return authenticated;
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

export default new API();
