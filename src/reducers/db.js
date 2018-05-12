import { toastr } from 'react-redux-toastr';

import _ from 'lodash';

import { base } from '../firebase';

/* ------------------   FIREBASE   ----------------- */

let dbRef = null;
let DB = null;

/* ------------------   ACTIONS   ------------------ */

const SET_LOADED = 'SET_LOADED';

/* --------------   ACTION CREATORS   -------------- */

const setLoaded = payload => dispatch => dispatch({ type: SET_LOADED, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  loaded: false,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_LOADED:
      newState.loaded = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const initDB = () => (dispatch) => {
  // Initiate firebase db
  dbRef = base.database().ref();
  const time = Date.now();

  dbRef.on('value', (snap) => {
    DB = snap.val();
    dispatch(setLoaded(true));
    console.log(`Database successfully loaded in ${Date.now() - time} ms`);
  });
};

/* -------------------   API   --------------------- */

export const get = (str) => {
  // If the database is not loaded/ready
  if (!DB) return console.error(`Enable to retrive ${str}, database is not ready.`);

  const path = str.split('/');
  const { length } = path;
  const last = path[length - 1];
  const all = last === 'all';

  console.log('Fetching api path:', str);
  switch (path[1]) {
    case 'artists':
      // API/artists/all
      if (length === 3 && all) return GET.fetchAllArtists(true);
      // API/artists
      if (length === 2) return GET.fetchAllArtists();
      // API/artists/:id/all
      if (length === 4 && all) return GET.fetchArtist(path[2], true);
      // API/artists/:id/members
      if (length === 4 && last === 'members') return GET.fetchArtistMembers(path[2]);
      // API/artists/:id/units
      if (length === 4 && last === 'units') return GET.fetchArtistUnits(path[2]);
      // API/artists/:id
      if (length === 3) return GET.fetchArtist(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'colors':
      // API/colors
      if (length === 2) return GET.fetchAllColors();
      // API/colors/count
      if (length === 3 && last === 'count') return GET.fetchColorCount();
      // API/colors/:id
      if (length === 3) return GET.fetchColor(path[2]);
      // API/colors/:id/name
      if (length === 4 && last === 'name') return GET.fetchColorName(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'members':
      // API/members/all
      if (length === 3 && all) return GET.fetchAllMembers(true);
      // API/members
      if (length === 2) return GET.fetchAllMembers();
      // API/members/:id/all
      if (length === 4 && all) return GET.fetchMember(path[2], true);
      // API/members/:id
      if (length === 3) return GET.fetchMember(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'positions':
      // API/positions
      if (length === 2) return GET.fetchAllPositions();
      // API/positions/:id
      if (length === 3) return GET.fetchPosition(path[2]);
      // API/colors/:id/name
      if (length === 4 && last === 'name') return GET.fetchPositionName(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'songs':
      // API/songs/all
      if (length === 3 && all) return GET.fetchAllSongs(true);
      // API/songs
      if (length === 2) return GET.fetchAllSongs();
      // API/songs/:id/all
      if (length === 4 && all) return GET.fetchSong(path[2], true);
      // API/songs/:id
      if (length === 3) return GET.fetchSong(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'units':
      // API/units/all
      if (length === 3 && all) return GET.fetchAllUnits(true);
      // API/units/songs
      if (length === 3 && last === 'songs') return GET.fetchAllUnitsSongs();
      // API/units
      if (length === 2) return GET.fetchAllUnits();
      // API/units/:id/all
      if (length === 4 && all) return GET.fetchUnit(path[2], true);
      // API/units/:id
      if (length === 3) return GET.fetchUnit(path[2]);
      // API/units/:id/songs
      if (length === 4 && last === 'songs') return GET.fetchUnitSongs(path[2]);
      // API/units/:id/members
      if (length === 4 && last === 'members') return GET.fetchUnitMembers(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'user':
      // API/user/latest/:id
      if (length === 4 && path[2] === 'latest') return GET.fetchUserLatestUnits(path[3]);
      // API/user/favorite/:id
      if (length === 4 && path[2] === 'favorite') return GET.fetchUserFavoriteUnits(path[3]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    default:
      return {};
  }
};

export const post = (str, body) => {
  const path = str.split('/');
  const { length } = path;
  const last = path[length - 1];
  const all = last === 'all';

  console.log('Posting to api path:', str);
  switch (path[1]) {
    case 'user':
      // API/user/latest/:id
      if (length === 4 && path[2] === 'latest') return POST.postUserLatestUnits(path[3], body);
      // API/user/favorite/:id
      if (length === 4 && path[2] === 'favorite') return POST.postUserFavoriteUnits(path[3], body);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'songs':
      // API/songs
      if (length === 2) return POST.postSong(body);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'completeArtist':
      // API/completeArtist
      if (length === 2) return POST.postCompleteArtist(body);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    default:
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
  }
};

/* ----------------   GET CALLS   ------------------- */

const GET = {
  // API/artists
  fetchAllArtists: (include) => {
    const response = _.cloneDeep(DB.artists);

    // Always include list of members throughout units
    Object.keys(response).forEach((key) => {
      const entry = response[key];
      const members = {};
      if (entry.units) {
        const units = entry.units.map(unitId => GET.fetchUnit(unitId));
        units.forEach((unit) => {
          if (unit.members) {
            unit.members.forEach((memberId) => {
              members[memberId] = true;
            });
          }
        });
        entry.memberListIds = Object.keys(members);
        entry.memberList = Object.keys(members).map(m => GET.fetchMember(m).name);
      } else {
        entry.memberListIds = [];
        entry.memberList = [];
      }
      // Generation search query
      entry.query = `${entry.name} ${entry.otherNames}`;
      if (entry.memberList) {
        entry.query += `${entry.memberList.join('')}`;
      }
      entry.query = entry.query.toUpperCase();
    });

    // Include dependencies?
    if (include) {
      Object.keys(response).forEach((key) => {
        const entry = response[key];
        // Fetch units
        if (entry.units) {
          entry.units = entry.units.map(unitId => GET.fetchUnit(unitId));
        }
      });
    }
    return response;
  },

  // API/colors
  fetchAllColors: () => {
    const response = _.cloneDeep(DB.colors);
    Object.keys(response).forEach((key) => {
      const color = response[key];
      const parsedId = Number(color.id.substring(3)).toString();
      color.class = `color-${parsedId}`;
    });
    return response;
  },

  // API/members
  fetchAllMembers: (include) => {
    const response = _.cloneDeep(DB.members);

    if (include) {
      Object.keys(response).forEach((key) => {
        const entry = response[key];
        // Fetch color
        entry.color = GET.fetchColor(entry.colorId);
        // Fetch alternative color
        entry.altColor = GET.fetchColor(entry.altColorId);
        // Fetch position
        entry.positions = entry.positions.map(pos => GET.fetchPosition(pos));
        return entry;
      });
    }

    return response;
  },

  // API/positions
  fetchAllPositions: () => _.cloneDeep(DB.positions),

  // API/songs
  fetchAllSongs: (include) => {
    const response = _.cloneDeep(DB.songs);

    if (include) {
      Object.keys(response).forEach((key) => {
        const entry = response[key];
        // Fetch unit
        if (entry.unit) {
          entry.unit = GET.fetchUnit(entry.unitId);
          delete entry.unitId;
        }
        return entry;
      });
    }

    return response;
  },

  // API/units
  fetchAllUnits: (include) => {
    const response = _.cloneDeep(DB.units);

    if (include) {
      Object.keys(response).forEach((key) => {
        const entry = response[key];
        // Fetch artist
        if (entry.artist) {
          entry.artist = GET.fetchArtist(entry.artistId);
          delete entry.artistId;
        }
        // Fetch members
        if (entry.members) {
          entry.members = entry.members.map(mem => GET.fetchMember(mem));
        }
        // Fetch songs
        if (entry.songs) {
          entry.songs = entry.songs.map(song => GET.fetchSong(song));
        }
        return entry;
      });
    }

    return response;
  },

  // API/units/songs
  fetchAllUnitsSongs: () => {
    const songs = _.cloneDeep(DB.songs);
    const response = {};

    Object.keys(songs).forEach((key) => {
      const song = songs[key];
      const { unitId } = song;
      if (response[unitId] === undefined) {
        response[unitId] = [song];
      } else {
        response[unitId].push(song);
      }
    });

    Object.keys(response).forEach((key) => {
      response[key] = _.sortBy(response[key], 'title');
    });

    Object.keys(response).forEach((key) => {
      response[key] = response[key].map(item => item.id);
    });

    return response;
  },

  // API/artists/:id
  fetchArtist: (id, include) => {
    const response = _.cloneDeep(DB.artists[id]);

    // Always include the members throughout units
    if (response !== undefined) {
      if (response.units) {
        const tracker = {};
        const members = [];
        const units = response.units.map(unitId => GET.fetchUnit(unitId));
        units.forEach((unit) => {
          if (unit.members) {
            unit.members.forEach((memberId) => {
              if (tracker[memberId] === undefined) {
                members.push(GET.fetchMember(memberId, true));
                tracker[memberId] = true;
              }
            });
          }
        });
        response.memberList = members;
      } else {
        response.memberList = [];
      }

      if (include) {
        // Fetch units
        if (response.units) {
          response.units = response.units.map(unitId => GET.fetchUnit(unitId));
        } else {
          response.units = [];
        }
      }
      return response;
    }
    return 'NO-BAND-AVAILABLE';
  },

  // API/artists/:id/members
  fetchArtistMembers: (id) => {
    const artist = GET.fetchArtist(id);
    const members = {};
    if (artist && artist.units) {
      const units = artist.units.map(unitId => GET.fetchUnit(unitId));
      units.forEach((unit) => {
        unit.members.forEach((memberId) => {
          members[memberId] = true;
        });
      });
    }

    return Object.keys(members).map(m => GET.fetchMember(m));
  },

  // API/artists/:id/units
  fetchArtistUnits: (id) => {
    const artist = GET.fetchArtist(id);
    const units = {};
    if (artist && artist.units) {
      artist.units.forEach((unitId) => {
        units[unitId] = GET.fetchUnit(unitId);
      });
      return units;
    }
    return 'NO-UNITS-AVAILABE';
  },

  // API/color/:id
  fetchColor: (id) => {
    const response = _.cloneDeep(DB.colors[id]);
    if (response !== undefined) {
      const parsedId = Number(response.id.substring(3)).toString();
      response.class = `color-${parsedId}`;
      return response;
    }
    return 'NO-COLOR-AVAILABLE';
  },

  // API/colors/count
  fetchColorCount: () => {
    const colors = GET.fetchAllColors();
    const members = GET.fetchAllMembers();

    const colorCount = {};
    if (colors && members) {
      Object.keys(colors).forEach((key) => {
        colorCount[key] = 0;
      });

      Object.keys(members).forEach((key) => {
        const { colorId } = members[key];
        colorCount[colorId] += 1;
      });
    }
    return colorCount;
  },

  // API/color/:id/name
  fetchColorName: (id) => {
    const response = _.cloneDeep(DB.colors[id]);
    if (response !== undefined) {
      return response.name;
    }
    return 'NO-COLOR-AVAILABLE';
  },

  // API/members/:id
  fetchMember: (id, include) => {
    const response = _.cloneDeep(DB.members[id]);
    if (response !== undefined) {
      if (include) {
        // Fetch color
        response.color = GET.fetchColor(response.colorId);
        delete response.colorId;
        // Fetch alternative color
        response.altColor = GET.fetchColor(response.altColorId);
        delete response.altColorId;
        // Fetch position
        response.positions = response.positions.map(pos => GET.fetchPosition(pos));
      }
      return response;
    }
    return 'NO-MEMBER-AVAILABLE';
  },

  // API/position/:id
  fetchPosition: (id) => {
    const response = _.cloneDeep(DB.positions[id]);
    if (response !== undefined) {
      return response;
    }
    return 'NO-POSITION-AVAILABLE';
  },

  // API/position/:id/name
  fetchPositionName: (id) => {
    const response = _.cloneDeep(DB.positions[id]);
    if (response !== undefined) {
      return response.name;
    }
    return 'NO-POSITION-AVAILABLE';
  },

  // API/song/:id
  fetchSong: (id, include) => {
    const response = _.cloneDeep(DB.songs[id]);
    if (response !== undefined) {
      if (include) {
        // Fetch unit
        if (response.unit) {
          response.unit = GET.fetchUnit(response.unitId);
          delete response.unitId;
        }
      }
      // Parse distribution
      if (response.distribution) {
        response.distribution = JSON.parse(response.distribution);
      } else {
        response.distribution = [];
      }
      return response;
    }
    return 'NO-SONG-AVAILABLE';
  },

  // API/units/:id
  fetchUnit: (id, include) => {
    const response = _.cloneDeep(DB.units[id]);

    if (response !== undefined) {
      if (include && response.artistId) {
        // Fetch band/artist
        response.artist = GET.fetchArtist(response.artistId);
        delete response.artistId;
        // Fetch members
        if (response.members) {
          response.members = response.members.map(mem => GET.fetchMember(mem, true));
        } else {
          response.members = [];
        }
        // Fetch songs
        if (response.songs && response.songs.length) {
          response.songs = response.songs.map(song => GET.fetchSong(song));
        } else {
          response.songs = [];
        }
      }
      return response;
    }
    return 'NO-UNIT-AVAILABLE';
  },

  // API/units/:id/members
  fetchUnitMembers: (id) => {
    const unit = _.cloneDeep(DB.units[id]);
    let response;
    if (unit !== undefined && unit.members) {
      // Fetch members
      response = unit.members.map(memberId => GET.fetchMember(memberId));
      return response;
    }
    return 'NO-MEMBERS-AVAILABLE';
  },

  // API/units/:id/songs
  fetchUnitSongs: (id) => {
    const unit = _.cloneDeep(DB.units[id]);
    let response;
    if (unit !== undefined && unit.songs) {
      // Fetch members
      response = unit.songs.map(songId => GET.fetchSong(songId));
      return response;
    }
    return 'NO-SONGS-AVAILABLE';
  },

  // API/user/latest/:id
  fetchUserLatestUnits: (uid) => {
    if (DB.users[uid] && DB.users[uid].latestUnits) {
      const latest = DB.users[uid].latestUnits;
      return latest.map(unitId => GET.fetchUnit(unitId, true));
    }
    return [];
  },

  // API/user/favorite/:id
  fetchUserFavoriteUnits: (uid) => {
    if (DB.users[uid] && DB.users[uid].favoriteUnits) {
      const favorites = DB.users[uid].favoriteUnits;
      return favorites.map(unitId => GET.fetchUnit(unitId, true));
    }
    return [];
  },
};

const POST = {
  // API/user/latest/:id
  postUserLatestUnits: (uid, body) => {
    if (DB.users[uid]) {
      base.database().ref('users').child(uid).child('latestUnits').set(body);
      toastr.success('Your Latest Units updated successfully');
    }
  },

  // API/user/favorite/:id
  postUserFavoriteUnits: (uid, body) => {
    if (DB.users[uid]) {
      base.database().ref('users').child(uid).child('favoriteUnits').set(body);
      toastr.success('Unit updated to Favorites successfully!', `You have ${body.length} favorite artists out of 5.`);
    }
  },

  // API/song
  postSong: (body) => {
    const missingInfo = [];
    // Check if song has all necessary params. Optional: distribution, lyrics
    if (!body.originalArtist) missingInfo.push('Original Artist\n'); // REMOVE THIS, DEBUGGING ONLY
    if (!body.unitId) missingInfo.push('Unit Id\n'); // REMOVE THIS, DEBUGGING ONLY
    if (!body.userUid) missingInfo.push('User Id (Are you logged in?\n'); // REMOVE THIS, DEBUGGING ONLY
    if (!body.userEmail) missingInfo.push('User Email (Are you logged in?\n'); // REMOVE THIS, DEBUGGING ONLY
    if (!body.title) missingInfo.push('Title\n');
    if (!body.type) missingInfo.push('Type\n');
    if (!body.originalArtist) missingInfo.push('Original Artist');

    // If distribution is not stringified, stringify it!
    if (body.distribution && typeof body.distribution !== 'string') {
      body.distribution = JSON.stringify(body.distribution);
    }
    if (missingInfo.length > 0) {
      toastr.error(`Song missing information: \n${missingInfo.join(', ')}`);
      return false;
    }
    const query = `${body.title} - ${body.originalArtist}`.toLowerCase();

    const newSong = {
      distribution: body.distribution,
      lyrics: body.lyrics,
      originalArtist: body.originalArtist,
      query,
      title: body.title,
      type: body.type,
      unitId: body.unitId,
      userId: body.userEmail,
    };

    // If song has already an id and new user is the same, save over old one
    if (body.songId) {
      toastr.info('It has a song Id');
      toastr.success('Your song was updated successfully!');
      return true;
    }

    // Else, create a new song
    base.database()
      .ref('songs')
      .push(newSong)
      .then((snap) => {
        const { key } = snap;
        newSong.id = key;
        const unitSongs = DB.units[newSong.unitId].songs || [];
        unitSongs.push(key);
        base.database()
          .ref(`units/${newSong.unitId}/songs`)
          .set(unitSongs);
        base.database()
          .ref(`songs/${key}`)
          .set(newSong)
          .then(() => {
            toastr.success('Your song was saved successfully!');
          });
      });
    return true;
  },

  // API/completeArtist
  postCompleteArtist: (body) => {
    const missingInfo = [];
    // Check if song has all necessary params. Optional: distribution, lyrics
    // if (!body.originalArtist) missingInfo.push('Original Artist\n'); // REMOVE THIS, DEBUGGING ONLY

    if (missingInfo.length > 0) {
      toastr.error(`Missing information: \n${missingInfo.join(', ')}`);
      return false;
    }

    // First, post all new members and get their ids;
    // base.database()
    //   .child('members')
    //   .push
    // Second, post the unit get its id

    // Third, post
  }
};

