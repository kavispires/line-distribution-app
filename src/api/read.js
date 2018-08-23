import _ from 'lodash';

import { ensureColorUniqueness } from '../utils';

import { ROOT_PATHS } from './schema';

import serializer from './serializer';

import mockDB from '../mock/mock_db';

/* ----------------      ------------------- */

let DB = mockDB;

const read = (fullPath, database) => {
  // Is database provided
  if (database) {
    DB = database;
  } else {
    console.warn('***USING MOCK DATABASE***');
  }

  const path = fullPath.split('/');
  const { length } = path;
  const root = path[1];
  const subPath = path[length - 1];

  // Prevent calls to database root
  if (length < 2) {
    throw new Error(
      `Unable to retrive data from database root. Make sure your path starts with /.`
    );
  }

  // Verify call to root paths
  if (ROOT_PATHS[root.toUpperCase()] === undefined) {
    throw new Error(
      `Unable to retrive data. Path ${path[1] || '/'} does not exist.`
    );
  }

  console.warn(`Fetching api path: ${fullPath}`);

  switch (root) {
    case 'artists':
      // API/artists
      if (length === 2) return GET.fetchArtists();
      // API/artists/:id
      if (length === 3) return GET.fetchArtist(path[2], true);
      // API/artists/:id/units
      if (length === 4 && subPath === 'units')
        return GET.fetchArtistUnits(path[2]);
      // Error
      throw new Error(`Wrong artists API path: ${fullPath}`);

    case 'colors':
      // API/colors
      if (length === 2) return GET.fetchColors();
      // API/colors/count
      if (length === 3 && subPath === 'count') return GET.fetchColorCount();
      // API/colors/:id
      if (length === 3) return GET.fetchColor(path[2], true);
      // Error
      throw new Error(`Wrong colors API path: ${fullPath}`);

    case 'lyrics':
      // Error
      throw new Error(`Lyrics GET API is not implemented: ${fullPath}`);

    case 'members':
      // API/members
      if (length === 2) return GET.fetchMembers();
      // API/members/:id
      if (length === 3) return GET.fetchMember(path[2], true);
      // Error
      throw new Error(`Wrong members API path: ${fullPath}`);

    case 'positions':
      // API/positions
      if (length === 2) return GET.fetchPositions();
      // API/positions/:id
      if (length === 3) return GET.fetchPosition(path[2], true);
      // Error
      throw new Error(`Wrong positions API path: ${fullPath}`);

    case 'songs':
      // API/songs
      if (length === 2) return GET.fetchSongs();
      // API/songs/:id
      if (length === 3) return GET.fetchSong(path[2], true);
      // Error
      throw new Error(`Wrong songs API path: ${fullPath}`);

    case 'units':
      // API/units
      if (length === 2) return GET.fetchUnits();
      // API/units/:id
      if (length === 3) return GET.fetchUnit(path[2], true);
      // Error
      throw new Error(`Wrong units API path: ${fullPath}`);

    case 'users':
      // API/users/:id
      if (length === 3) return GET.fetchUser(path[2]);
      // API/users/:id/favorite
      if (length === 4 && path[3] === 'favorite')
        return GET.fetchUserFavoriteUnits(path[2]);
      // API/users/:id/latest
      if (length === 4 && path[3] === 'latest')
        return GET.fetchUserLatestUnits(path[2]);
      // API/users/:id/session
      if (length === 4 && path[3] === 'session')
        return GET.fetchUserSession(path[2]);
      // Error
      throw new Error(`Wrong users API path: ${fullPath}`);

    default:
      throw new Error(`Wrong API path: ${fullPath}`);
  }
};

/* ----------------   GET CALLS   ------------------- */

const GET = {
  // Artists
  fetchArtists: () => {
    const response = _.cloneDeep(DB.artists);

    Object.keys(response).forEach(key => {
      response[key] = GET.fetchArtist(key);
    });
    return response;
  },
  fetchArtist: id => {
    const data = _.cloneDeep(DB.artists[id]);

    if (data !== undefined) {
      data.id = id;

      const response = serializer('artist', data);

      const members = [];

      // Build members list
      if (response.units) {
        const tracker = {};
        response.units.map(unitId => GET.fetchUnit(unitId)).forEach(unit => {
          if (unit.members) {
            unit.members.forEach(memberEntry => {
              const { memberId } = memberEntry;
              if (tracker[memberId] === undefined) {
                members.push(GET.fetchMember(memberId, true));
                tracker[memberId] = true;
              }
            });
          }
        });
        response.memberList = ensureColorUniqueness(members);
      } else {
        response.memberList = [];
      }
      // Build search query
      response.query = `${response.name} ${
        response.otherNames
      } ${response.memberList.map(m => m.name).join(' ')}`.toLocaleUpperCase();

      return response;
    }
    throw new Error(`Failed to retrieve artist for id: ${id}`);
  },
  fetchArtistUnits: id => {
    const artist = GET.fetchArtist(id);
    const units = {};
    if (artist && artist.units) {
      artist.units.forEach(unitId => {
        units[unitId] = GET.fetchUnit(unitId);
      });
      return units;
    }
    return [];
  },

  // Colors
  fetchColors: () => {
    const response = _.cloneDeep(DB.colors);
    // Set class property and id
    Object.keys(response).forEach(key => {
      response[key] = GET.fetchColor(key);
    });
    return response;
  },
  fetchColorCount: () => {
    const colors = GET.fetchColors();
    const members = GET.fetchMembers();

    const colorCount = {};
    if (colors && members) {
      Object.keys(colors).forEach(key => {
        colorCount[key] = 0;
      });

      Object.keys(members).forEach(key => {
        const { id } = members[key].color;
        colorCount[id] += 1;
      });
    }
    return colorCount;
  },
  fetchColor: id => {
    const data = _.cloneDeep(DB.colors[id]);

    if (data !== undefined) {
      // Check if data schema is correct
      const response = serializer('color-database', data);
      // Add id
      response.id = id;
      // Add class
      const parsedId = Number(response.id.substring(3)).toString();
      response.class = `color-${parsedId}`;

      return serializer('color', response);
    }
    throw new Error(`Failed to retrieve color for id: ${id}`);
  },

  // Lyrics

  // Members
  fetchMembers: () => {
    const response = _.cloneDeep(DB.members);
    Object.keys(response).forEach(key => {
      response[key] = GET.fetchMember(key, true);
    });
    return response;
  },
  fetchMember: (id, includeChildren = false) => {
    const data = _.cloneDeep(DB.members[id]);
    if (data !== undefined) {
      // Check if data schema is correct
      const response = serializer('member-database', data);
      // Add Id
      response.id = id;
      // Include Dependencies
      if (includeChildren) {
        // Fetch color
        response.color = GET.fetchColor(response.colorId);
        delete response.colorId;
        // Fetch alternative color
        response.altColor = GET.fetchColor(response.altColorId);
        delete response.altColorId;
        // Fetch position
        response.positions = response.positions.map(pos =>
          GET.fetchPosition(pos)
        );
        return serializer('member-dependencies', response);
      }
      return serializer('member', response);
    }
    throw new Error(`Failed to retrieve member for id: ${id}`);
  },

  // Positions
  fetchPositions: () => {
    const response = _.cloneDeep(DB.positions);
    Object.keys(response).forEach(key => {
      response[key] = GET.fetchPosition(key);
    });
    return response;
  },
  fetchPosition: id => {
    const data = _.cloneDeep(DB.positions[id]);
    if (data !== undefined) {
      // Check if data schema is correct
      const response = serializer('position-database', data);
      // Add id
      response.id = id;
      return serializer('position', response);
    }
    throw new Error(`Failed to retrieve position for id: ${id}`);
  },

  // Songs
  fetchSongs: () => {
    const response = _.cloneDeep(DB.songs);

    Object.keys(response).forEach(key => {
      response[key] = GET.fetchSong(key);
    });
    return response;
  },
  fetchSong: (id, includeChildren = false) => {
    const data = _.cloneDeep(DB.songs[id]);

    if (data !== undefined) {
      // Check if data schema is correct
      const response = serializer('song-database', data);
      // Add id
      response.id = id;

      // Parse distribution
      if (response.distribution) {
        response.distribution = JSON.parse(response.distribution);
      } else {
        response.distribution = [];
      }

      // Add dependencies
      if (includeChildren) {
        // Fetch unit
        if (response.unit) {
          response.unit = GET.fetchUnit(response.unitId);
          delete response.unitId;
        }
        return serializer('song-dependencies', response);
      }
      return serializer('song', response);
    }
    throw new Error(`Failed to retrieve song for id: ${id}`);
  },

  // Units
  fetchUnits: () => {
    const response = _.cloneDeep(DB.units);

    Object.keys(response).forEach(key => {
      response[key] = GET.fetchUnit(key);
    });
    return response;
  },
  fetchUnit: (id, includeChildren = false) => {
    const data = _.cloneDeep(DB.units[id]);

    if (data !== undefined) {
      // Check if data schema is correct
      const response = serializer('unit-database', data);
      // Add id
      response.id = id;

      if (includeChildren) {
        // Include artist
        if (response.artistId) {
          response.artist = GET.fetchArtist(response.artistId);
          delete response.artistId;
        }
        // Include members
        if (response.members) {
          const members = response.members.map(member =>
            GET.fetchMember(member.memberId, true)
          );
          response.members = ensureColorUniqueness(members);
        }
        // Include songs
        if (response.songs && response.songs.length) {
          response.songs = response.songs.map(song => GET.fetchSong(song));
        }
        return serializer('unit-dependencies', response);
      }
      return serializer('unit', response);
    }
    throw new Error(`Failed to retrieve unit for id: ${id}`);
  },

  // Users
  fetchUser: id => {
    const data = _.cloneDeep(DB.users[id]);
    if (data) {
      const response = serializer('user-database', data);
      response.id = id;
      return response;
    }
    throw new Error(`Failed to retrieve user for id: ${id}`);
  },
  fetchUserFavoriteUnits: id => {
    let response = [];
    try {
      response = GET.fetchUser(id).favoriteUnits;
    } catch (error) {
      throw new Error(`Failed to get favorite units for user: ${id}`);
    }
    return response.map(unitId => GET.fetchUnit(unitId, true));
  },
  fetchUserLatestUnits: id => {
    let response = [];
    try {
      response = GET.fetchUser(id).latestUnits;
    } catch (error) {
      throw new Error(`Failed to get latest units for user: ${id}`);
    }
    return response.map(unitId => GET.fetchUnit(unitId, true));
  },
  fetchUserSession: id => GET.fetchUser(id).session,
};

export default read;
