import { toastr } from 'react-redux-toastr';

import { base } from '../firebase';

import { ROOT_PATHS } from './schema';

import serializer from './serializer';

import mockDB from '../mock/mock_db';

/* ----------------      ------------------- */

let DB = mockDB;
let firebase = {};

const create = (fullPath, body, database) => {
  // Is database provided
  if (database) {
    DB = database;
    firebase = base;
  } else {
    console.warn('***USING MOCK DATABASE***');
  }
  // Is body provided
  if (!body) {
    throw new Error(`Unable to write ${fullPath}, body was not provided.`);
  }

  const path = fullPath.split('/');
  const { length } = path;
  const root = path[1];
  const id = path[2] || '';

  // Prevent calls to database root
  if (length < 2) {
    throw new Error(
      `Unable to write data on database root. Make sure your path starts with /.`
    );
  }

  // Verify call to root paths
  if (ROOT_PATHS[root.toUpperCase()] === undefined) {
    throw new Error(`Unable to write data. Path ${path[1]} does not exist.`);
  }

  console.warn(`Writing on path: ${fullPath}`);

  switch (root) {
    case 'artists':
      // API/artists/:id
      if (length === 3) return POST.postArtist(path[2], body);
      // Error
      throw new Error(`Wrong artists API path: ${fullPath}`);

    case 'colors':
      // Error
      throw new Error(`Colors POST API is not implemented: ${fullPath}`);

    case 'lyrics':
      // Error
      throw new Error(`Lyrics POST API is not implemented: ${fullPath}`);

    case 'members':
      // API/members/:id
      if (length === 3) return POST.postMember(path[2], body);
      // Error
      throw new Error(`Wrong members API path: ${fullPath}`);

    case 'positions':
      // Error
      throw new Error(`Positions POST API is not implemented: ${fullPath}`);

    case 'songs':
      // API/songs/:id
      if (length === 3) return POST.postSong(path[2], body);
      // Error
      console.error(`Wrong songs API path: ${fullPath}`);
      return {};

    case 'units':
      // API/units/:id
      if (length === 3) return POST.postUnit(path[2], body);
      // Error
      throw new Error(`Wrong units API path: ${fullPath}`);

    case 'users':
      // API/users/:id
      if (length === 3) return POST.postUser(id, body);
      // API/users/:id/favorite
      if (length === 4 && path[3] === 'favorite')
        return POST.postUserFavoriteUnits(id, body);
      // API/users/:id/latest
      if (length === 4 && path[3] === 'latest')
        return POST.postUserLatestUnits(id, body);
      // API/users/:id/session
      if (length === 4 && path[3] === 'session')
        return POST.postUserSession(id, body);
      // Error
      throw new Error(`Wrong users API path: ${fullPath}`);

    default:
      throw new Error(`Wrong API path: ${fullPath}`);
  }
};

/* ----------------   POST CALLS   ------------------- */

const POST = {
  // Artists
  postArtist: async (id, body) => {
    // Verify body
    if (typeof body !== 'object' && Object.keys(body).length === 0)
      throw new Error('Failed to post Artist, data was not provided');

    // Serialize Artist
    const data = serializer('artist-database', body);

    const key = (await DB.members[id])
      ? id
      : firebase
          .database()
          .ref()
          .child('artists')
          .push().key;

    let response = {};

    await firebase
      .database()
      .ref()
      .child(`/artists/${key}`)
      .update(data, error => {
        if (error) {
          const message = `Failed to post Artist ${key}`;
          toastr.error(message, error);
          throw new Error(`${message}: ${error}`);
        } else {
          toastr.success(`Artist ${key} updated successfully!`);
          response = { ...data };
          response.id = key;
        }
      });
    return response;
  },

  // Members
  postMember: async (id, body) => {
    // Verify body
    if (typeof body !== 'object' && Object.keys(body).length === 0)
      throw new Error('Failed to post Member, data was not provided');

    // Serialize Member
    const data = serializer('member-database', body);

    const key = (await DB.members[id])
      ? id
      : firebase
          .database()
          .ref()
          .child('members')
          .push().key;

    let response = {};

    await firebase
      .database()
      .ref()
      .child(`/members/${key}`)
      .update(data, error => {
        if (error) {
          const message = `Failed to post Member ${key}`;
          toastr.error(message, error);
          throw new Error(`${message}: ${error}`);
        } else {
          toastr.success(`Member ${key} updated successfully!`);
          response = { ...data };
          response.id = key;
        }
      });

    return response;
  },

  // Songs
  postSong: async (id, body) => {
    // Verify body
    if (typeof body !== 'object' && Object.keys(body).length === 0)
      throw new Error('Failed to post song, data was not provided');

    // Serialize song
    // const data = serializer('song-database', body);
    const data = body; // TO-DO Redo schema

    const key = (await DB.members[id])
      ? id
      : firebase
          .database()
          .ref()
          .child('members')
          .push().key;

    let response = {};

    await firebase
      .database()
      .ref()
      .child(`/songs2/${key}`)
      .update(data, error => {
        if (error) {
          const message = `Failed to post Song ${key}`;
          toastr.error(message, error);
          throw new Error(`${message}: ${error}`);
        } else {
          toastr.success(`Song ${key} updated successfully!`);
          response = { ...data };
          response.id = key;
        }
      });

    return response;
  },

  // Units
  postUnit: async (id, body) => {
    // Verify body
    if (typeof body !== 'object' && Object.keys(body).length === 0)
      throw new Error('Failed to post Unit, data was not provided');

    // Serialize Artist
    const data = serializer('unit-database', body);

    const key = (await DB.members[id])
      ? id
      : firebase
          .database()
          .ref()
          .child('units')
          .push().key;

    let response = {};

    await firebase
      .database()
      .ref()
      .child(`/units/${key}`)
      .update(data, error => {
        if (error) {
          const message = `Failed to post Unit ${key}`;
          toastr.error(message, error);
          throw new Error(`${message}: ${error}`);
        } else {
          toastr.success(`Unit ${key} updated successfully!`);
          response = { ...data };
          response.id = key;
        }
      });
    return response;
  },

  // Users
  postUser: async (id, body) => {
    if (!id) throw new Error('Failed to create user, uid not provided');

    // Serialize User
    const data = serializer('user-database', body);

    // Post user
    let response = {};
    await firebase
      .database()
      .ref()
      .child(`/users/${id}`)
      .update(data, error => {
        if (error) {
          const message = `Failed to create User ${id}`;
          toastr.error(message, error);
          throw new Error(`${message}: ${error}`);
        } else {
          toastr.success(`User ${id} created successfully!`);
          response = { ...data };
          response.id = id;
        }
      });

    return response;
  },
  postUserFavoriteUnits: async (id, body) => {
    // Verify body
    if (!Array.isArray(body))
      throw new Error('Failed to update Favorite Units, data is not an array');

    let response = [];

    if (DB.users[id]) {
      await firebase
        .database()
        .ref()
        .child(`/users/${id}/favoriteUnits`)
        .set(body, error => {
          if (error) {
            const message = `Failed to post Favorite Units to user ${id}`;
            toastr.error(message, error);
            throw new Error(`${message}: ${error}`);
          } else {
            toastr.success(
              'Unit updated to Favorites successfully!',
              `You have ${body.length} favorite artists out of 5.`
            );
            response = body;
          }
        });
    }
    return response;
  },
  postUserLatestUnits: async (id, body) => {
    // Verify body
    if (!Array.isArray(body))
      throw new Error('Failed to update Favorite Units, data is not an array');

    let response = [];

    if (DB.users[id]) {
      await firebase
        .database()
        .ref()
        .child(`/users/${id}/latestUnits`)
        .set(body, error => {
          if (error) {
            const message = `Failed to update Latest Units to user ${id}`;
            toastr.error(message, error);
            throw new Error(`${message}: ${error}`);
          } else {
            response = body;
          }
        });
    }
    return response;
  },
  postUserSession: async (id, body) => {
    // Verify body
    if (typeof body !== 'object' && Object.keys(body).length === 0)
      throw new Error('Failed to update Session, data was not provided');

    let response = {};

    if (DB.users[id]) {
      await firebase
        .database()
        .ref()
        .child(`/users/${id}/session`)
        .set(body, error => {
          if (error) {
            const message = `Failed to update Session for user ${id}`;
            toastr.error(message, error);
            throw new Error(`${message}: ${error}`);
          } else {
            response = body;
          }
        });
    }

    return response;
  },
};

export default create;
