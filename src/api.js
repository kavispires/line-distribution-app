import _ from 'lodash';
import DB from './database/index';
import { loadLocalStorage, saveLocalStorage } from './utils';

/* API */

// API/artists
const fetchAllBands = (include) => {
  const response = _.cloneDeep(DB.ARTISTS);

  if (include) {
    Object.keys(response).forEach((key) => {
      const entry = response[key];
      // Fetch units
      entry.units = entry.units.map(unit => fetchUnit(unit));
    });
  }

  // Include list of members throughout units
  Object.keys(response).forEach((key) => {
    const entry = response[key];
    const members = {};
    // Fetch units
    const units = entry.units.map(unit => fetchUnit(unit));
    units.forEach((unit) => {
      unit.members.forEach((memberId) => {
        members[memberId] = true;
      });
    });
    entry.allMembersId = Object.keys(members).map(m => Number(m));
    entry.allMembers = Object.keys(members).map(m => fetchMember(m).name);
  });

  return response;
};

// API/artists/:id
const fetchBand = (id, include) => {
  const response = _.cloneDeep(DB.ARTISTS[id]);

  if (response !== undefined) {
    if (include) {
      // Fetch units
      response.units = response.units.map(unit => fetchUnit(unit));
    }
    return response;
  }
  return 'NO-BAND-AVAILABLE';
};

// API/artists/:id/members
const fetchBandMembers = (id) => {
  const band = fetchBand(id);
  const members = {};
  const units = band.units.map(unitId => fetchUnit(unitId));
  units.forEach((unit) => {
    unit.members.forEach((memberId) => {
      members[memberId] = true;
    });
  });

  return Object.keys(members).map(m => fetchMember(m));
};

// API/artists/:id/units
const fetchBandUnits = (id) => {
  const band = fetchBand(id);
  const units = {};
  band.units.forEach((unitId) => {
    units[unitId] = fetchUnit(unitId);
  });

  return units;
};

// API/colors
const fetchAllColors = () => {
  return _.cloneDeep(DB.COLORS);
};

// API/colors/:id
const fetchColor = (id) => {
  const response = _.cloneDeep(DB.COLORS[id]);
  if (response !== undefined) {
    return response;
  }
  return 'NO-COLOR-AVAILABLE';
};

// API/colors/:id/name
const fetchColorName = (id) => {
  const response = _.cloneDeep(DB.COLORS[id]);
  if (response !== undefined) {
    return response.name;
  }
  return 'NO-COLOR-AVAILABLE';
};

// API/colors/count
const fetchColorCount = () => {
  const colors = fetchAllColors();
  const members = fetchAllMembers();

  const colorCount = {};

  Object.keys(colors).forEach((key) => {
    colorCount[key] = 0;
  });

  Object.keys(members).forEach((key) => {
    const { colorId } = members[key];
    colorCount[colorId] += 1;
  });

  return colorCount;
};

// API/members
const fetchAllMembers = (include) => {
  const response = _.cloneDeep(DB.MEMBERS);

  if (include) {
    Object.keys(response).forEach((key) => {
      const entry = response[key];
      // Fetch color
      entry.color = fetchColor(entry.colorId);
      // Fetch alternative color
      entry.altColor = fetchColor(entry.altColorId);
      // Fetch position
      entry.positions = entry.positions.map(pos => fetchPosition(pos));
      return entry;
    });
  }

  return response;
};

// API/members/:id
const fetchMember = (id, include) => {
  const response = _.cloneDeep(DB.MEMBERS[id]);
  if (response !== undefined) {
    if (include) {
      // Fetch color
      response.color = fetchColor(response.colorId);
      delete response.colorId;
      // Fetch alternative color
      response.altColor = fetchColor(response.altColorId);
      delete response.altColorId;
      // Fetch position
      response.positions = response.positions.map(pos => fetchPosition(pos));
    }
    return response;
  }
  return 'NO-MEMBER-AVAILABLE';
};

// API/positions
const fetchAllPositions = () => {
  return _.cloneDeep(DB.POSITIONS);
};

// API/positions/:id
const fetchPosition = (id) => {
  const response = _.cloneDeep(DB.POSITIONS[id]);
  if (response !== undefined) {
    return response;
  }
  return 'NO-POSITION-AVAILABLE';
};

// API/positions/:id/name
const fetchPositionName = (id) => {
  const response = _.cloneDeep(DB.POSITIONS[id]);
  if (response !== undefined) {
    return response.name;
  }
  return 'NO-POSITION-AVAILABLE';
};

// API/songs
const fetchAllSongs = (include) => {
  const response = _.cloneDeep(DB.SONGS);

  if (include) {
    Object.keys(response).forEach((key) => {
      const entry = response[key];
      // Fetch unit
      entry.unit = fetchUnit(entry.unitId);
      delete entry.unitId;
      return entry;
    });
  }

  return response;
};

// API/songs/:id
const fetchSong = (id, include) => {
  const response = _.cloneDeep(DB.SONGS[id]);
  if (response !== undefined) {
    if (include) {
      // Fetch unit
      response.unit = fetchUnit(response.unitId);
      delete response.unitId;
    }
    return response;
  }
  return 'NO-SONG-AVAILABLE';
};

// API/units
const fetchAllUnits = (include) => {
  const response = _.cloneDeep(DB.UNITS);

  if (include) {
    Object.keys(response).forEach((key) => {
      const entry = response[key];
      // Fetch band/artist
      entry.artist = fetchBand(entry.bandId);
      delete entry.bandId;
      // Fetch members
      entry.members = entry.members.map(mem => fetchMember(mem));
      // Fetch songs
      entry.songs = entry.songs.map(song => fetchSong(song));
      return entry;
    });
  }

  return response;
};

// API/units/latest
const fetchLatestUnits = () => {
  const LS = loadLocalStorage();
  let result = [];
  if (LS.latest) result = LS.latest;
  return result;
};

// API/units/:id
const fetchUnit = (id, include) => {
  const response = _.cloneDeep(DB.UNITS[id]);
  if (response !== undefined) {
    if (include) {
      // Fetch band/artist
      response.artist = fetchBand(response.bandId);
      delete response.bandId;
      // Fetch members
      response.members = response.members.map(mem => fetchMember(mem));
      // Fetch songs
      response.songs = response.songs.map(song => fetchSong(song));
    }
    return response;
  }
  return 'NO-UNIT-AVAILABLE';
};

// API/units/:id/song
// TO-DO: WRONG FUNCTION
const fetchUnitSongs = (id, include) => {
  const units = _.cloneDeep(DB.UNITS[id]);
  let response;
  if (response !== undefined) {

    if (include) {
      // Fetch color
      response.color = fetchColor(response.colorId);
      // Fetch alternative color
      response.altColor = fetchColor(response.altColorId);
      // Fetch position
      response.songs = response.songs.map(song => fetchSong(song));
    }
    return response;
  }
  return 'NO-MEMBER-AVAILABLE';
};

const get = (str) => {
  const path = str.split('/');
  const { length } = path;
  const last = path[length - 1];
  const all = last === 'all';

  console.log('Fetching api path:', str);
  switch (path[1]) {
    case 'artists':
      // API/artists/all
      if (length === 3 && all) return fetchAllBands(true);
      // API/artists
      if (length === 2) return fetchAllBands();
      // API/artists/:id/all
      if (length === 4 && all) return fetchBand(path[2], true);
      // API/artists/:id/members
      if (length === 4 && last === 'members') return fetchBandMembers(path[2]);
      // API/artists/:id/units
      if (length === 4 && last === 'units') return fetchBandUnits(path[2]);
      // API/artists/:id
      if (length === 3) return fetchBand(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'colors':
      // API/colors
      if (length === 2) return fetchAllColors();
      // API/colors/count
      if (length === 3 && last === 'count') return fetchColorCount();
      // API/colors/:id
      if (length === 3) return fetchColor(path[2]);
      // API/colors/:id/name
      if (length === 4 && last === 'name') return fetchColorName(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'members':
      // API/members/all
      if (length === 3 && all) return fetchAllMembers(true);
      // API/members
      if (length === 2) return fetchAllMembers();
      // API/members/:id/all
      if (length === 4 && all) return fetchMember(path[2], true);
      // API/members/:id
      if (length === 3) return fetchMember(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'positions':
      // API/positions
      if (length === 2) return fetchAllPositions();
      // API/positions/:id
      if (length === 3) return fetchPosition(path[2]);
      // API/colors/:id/name
      if (length === 4 && last === 'name') return fetchPositionName(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'songs':
      // API/songs/all
      if (length === 3 && all) return fetchAllSongs(true);
      // API/songs
      if (length === 2) return fetchAllSongs();
      // API/songs/:id/all
      if (length === 4 && all) return fetchSong(path[2], true);
      // API/songs/:id
      if (length === 3) return fetchSong(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    case 'units':
      // API/units/all
      if (length === 3 && all) return fetchAllUnits(true);
      // API/units/latest
      if (length === 3 && last === 'latest') return fetchLatestUnits();
      // API/units
      if (length === 2) return fetchAllUnits();
      // API/units/:id/all
      if (length === 4 && all) return fetchUnit(path[2], true);
      // API/units/:id
      if (length === 3) return fetchUnit(path[2]);
      // API/units/:id/songs
      if (length === 4 && last === 'songs') return fetchUnitSongs(path[2]);
      // Error
      console.error(`Wrong API path: ${str}`);
      return {};
    default:
      return {};
  }
};

// API/units/latest
const postLatestUnits = (body) => {
  const LS = loadLocalStorage();
  // Trim body to have only latest 3;
  if (body.length > 3) {
    LS.latest = body.slice(0, 3);
  } else {
    LS.latest = body;
  }
  saveLocalStorage(LS);
};

// API/songs
const postSong = (body) => {
  const LS = loadLocalStorage();
  console.log(body);
  if (body) {
    if (LS.songs === undefined) {
      LS.songs = {};
    }
    LS.songs[body.id] = body;
  }
  saveLocalStorage(LS);
};

const post = (str, body) => {
  const path = str.split('/');
  const { length } = path;
  const last = path[length - 1];
  const all = last === 'all';

  console.log('Posting to api path:', str);
  switch (path[1]) {
    case 'units':
      // API/units/latest
      if (length === 3 && last === 'latest') return postLatestUnits(body);
      return {};
    case 'songs':
      // API/songs
      if (length === 2) return postSong(body);
      return {};
    default:
      console.error(`Wrong API path: ${str}`);
      return {};
  }
};

export default {
  get,
  post,
};
