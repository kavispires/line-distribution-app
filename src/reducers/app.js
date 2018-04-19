import _ from 'lodash';

import API from '../api';
import { initDatabase } from './database';

/* ------------------   ACTIONS   ------------------ */

const SET_ARTISTS_LIST = 'SET_ARTISTS_LIST';
const SET_ARTISTS_LIST_BACKUP = 'SET_ARTISTS_LIST_BACKUP';
const SET_ARTIST_PAGE_TAB = 'SET_ARTIST_PAGE_TAB';
const SET_ARTISTS_SEARCH_INDEXATION = 'SET_ARTISTS_SEARCH';
const SET_COLOR_COUNT = 'SET_COLOR_COUNT';
const SET_COLOR_SHEET_TAB = 'SET_COLOR_SHEET_TAB';
const SET_CURRENT_ARTIST = 'SET_CURRENT_ARTIST';
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
const SET_CURRENT_UNIT = 'SET_CURRENT_UNIT';
const SET_LATEST_UNITS = 'SET_LATEST_UNITS';
const SET_MEMBERS_LIST = 'SET_MEMBERS_LIST';
const SET_SELECTED_ARTIST = 'SET_SELECTED_ARTIST';
const SET_SELECTED_UNIT = 'SET_SELECTED_UNIT';
const SET_SELECTED_UNIT_SONGS = 'SET_SELECTED_UNIT_SONGS';
const SET_SELECTED_UNITS = 'SET_SELECTED_UNITS';
const SET_SHOULD_RESET = 'SET_SHOULD_RESET';
const SET_SONGS_PER_UNIT = 'SET_SONGS_PER_UNIT';
const SET_DISTRIBUTION_PER_MEMBER = 'SET_DISTRIBUTION_PER_MEMBER';
const SET_DISTRIBUTION_PER_MEMBER_OFFICIAL = 'SET_DISTRIBUTION_PER_MEMBER_OFFICIAL';
const SET_DISTRIBUTION_TOTAL = 'SET_DISTRIBUTION_TOTAL';
const SET_DISTRIBUTION_TOTAL_OFFICIAL = 'SET_DISTRIBUTION_TOTAL_OFFICIAL';
const SET_IS_LOADING = 'SET_IS_LOADING';

/* --------------   ACTION CREATORS   -------------- */

export const setArtistsList = payload => dispatch => dispatch({ type: SET_ARTISTS_LIST, payload });
export const setArtistsListBackUp = payload => dispatch => dispatch({ type: SET_ARTISTS_LIST_BACKUP, payload });
export const setArtistPageTab = payload => dispatch => dispatch({ type: SET_ARTIST_PAGE_TAB, payload });
export const setArtistsSearchIndexation = payload => dispatch => dispatch({ type: SET_ARTISTS_SEARCH_INDEXATION, payload });
export const setColorCount = payload => dispatch => dispatch({ type: SET_COLOR_COUNT, payload });
export const setColorSheetTab = payload => dispatch => dispatch({ type: SET_COLOR_SHEET_TAB, payload });
export const setCurrentArtist = payload => dispatch => dispatch({ type: SET_CURRENT_ARTIST, payload });
export const setCurrentSong = payload => dispatch => dispatch({ type: SET_CURRENT_SONG, payload });
export const setCurrentUnit = payload => dispatch => dispatch({ type: SET_CURRENT_UNIT, payload });
export const setDistributionPerMember = payload => dispatch => dispatch({ type: SET_DISTRIBUTION_PER_MEMBER, payload });
export const setDistributionPerMemberOfficial = payload => dispatch => dispatch({ type: SET_DISTRIBUTION_PER_MEMBER_OFFICIAL, payload });
export const setDistributionTotal = payload => dispatch => dispatch({ type: SET_DISTRIBUTION_TOTAL, payload });
export const setDistributionTotalOfficial = payload => dispatch => dispatch({ type: SET_DISTRIBUTION_TOTAL_OFFICIAL, payload });
export const setLatestUnits = payload => dispatch => dispatch({ type: SET_LATEST_UNITS, payload });
export const setMembersList = payload => dispatch => dispatch({ type: SET_MEMBERS_LIST, payload });
export const setSelectedArtist = payload => dispatch => dispatch({ type: SET_SELECTED_ARTIST, payload });
export const setSelectedUnit = payload => dispatch => dispatch({ type: SET_SELECTED_UNIT, payload });
export const setSelectedUnitSongs = payload => dispatch => dispatch({ type: SET_SELECTED_UNIT_SONGS, payload });
export const setSelectedUnits = payload => dispatch => dispatch({ type: SET_SELECTED_UNITS, payload });
export const setShouldReset = payload => dispatch => dispatch({ type: SET_SHOULD_RESET, payload });
export const setSongsPerUnit = payload => dispatch => dispatch({ type: SET_SONGS_PER_UNIT, payload });
export const setIsLoading = payload => dispatch => dispatch({ type: SET_IS_LOADING, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  artistList: [],
  artistListBackUp: [],
  artistPageTab: 0,
  artistsSearchIndexation: {},
  colorCount: {},
  colorSheetTab: 'list',
  currentArtist: 0,
  currentSong: 0,
  currentUnit: {},
  distributionPerMember: {},
  distributionPerMemberOfficial: {},
  distributionTotal: 0,
  distributionTotalOfficial: 0,
  isLoading: false,
  latestUnits: [],
  membersList: [],
  selectedArtist: 0,
  selectedUnit: {},
  selectedUnitSongs: [],
  selectedUnits: {},
  shouldReset: true,
  songsPerUnit: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_ARTISTS_LIST:
      newState.artistList = action.payload;
      break;

    case SET_ARTISTS_LIST_BACKUP:
      newState.artistListBackUp = action.payload;
      break;

    case SET_ARTIST_PAGE_TAB:
      newState.artistPageTab = action.payload;
      break;

    case SET_ARTISTS_SEARCH_INDEXATION:
      newState.artistsSearchIndexation = action.payload;
      break;

    case SET_COLOR_COUNT:
      newState.colorCount = action.payload;
      break;

    case SET_COLOR_SHEET_TAB:
      newState.colorSheetTab = action.payload;
      break;

    case SET_CURRENT_ARTIST:
      newState.currentArtist = action.payload;
      break;

    case SET_CURRENT_SONG:
      newState.currentSong = action.payload;
      break;

    case SET_CURRENT_UNIT:
      newState.currentUnit = action.payload;
      break;

    case SET_DISTRIBUTION_PER_MEMBER:
      newState.distributionPerMember = action.payload;
      break;

    case SET_DISTRIBUTION_PER_MEMBER_OFFICIAL:
      newState.distributionPerMemberOfficial = action.payload;
      break;

    case SET_DISTRIBUTION_TOTAL:
      newState.distributionTotal = action.payload;
      break;

    case SET_DISTRIBUTION_TOTAL_OFFICIAL:
      newState.distributionTotalOfficial = action.payload;
      break;

    case SET_LATEST_UNITS:
      newState.latestUnits = action.payload;
      break;

    case SET_MEMBERS_LIST:
      newState.membersList = action.payload;
      break;

    case SET_SELECTED_ARTIST:
      newState.selectedArtist = action.payload;
      break;

    case SET_SELECTED_UNIT:
      newState.selectedUnit = action.payload;
      break;

    case SET_SELECTED_UNIT_SONGS:
      newState.selectedUnitSongs = action.payload;
      break;

    case SET_SELECTED_UNITS:
      newState.selectedUnits = action.payload;
      break;

    case SET_SHOULD_RESET:
      newState.shouldReset = action.payload;
      break;

    case SET_SONGS_PER_UNIT:
      newState.songsPerUnit = action.payload;
      break;

    case SET_IS_LOADING:
      newState.isLoading = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const init = () => (dispatch) => {
  dispatch(initDatabase());
  dispatch(getColorCount());
  dispatch(parseArtists());
  dispatch(parseMembers());
  dispatch(parseSongs());
  dispatch(getLatestUnits());
};

const getColorCount = () => (dispatch) => {
  const count = API.get('/colors/count');
  dispatch(setColorCount(count));
};

export const parseArtists = () => (dispatch, getState) => {
  // if (Object.keys(getState().app.artists).length > 0) return;
  /* Get list of artists
   * Remove artists with no members
   * Split members and colors
   * Sort in alphabetical order
   * Update state
   */
  const ARTISTS = _.cloneDeep(getState().database.artists);

  const searchIndexation = {};

  // Loop though ARTISTS to set indexation
  Object.keys(ARTISTS).forEach((id) => {
    const artist = ARTISTS[id];
    searchIndexation[id] = `${artist.name} ${artist.otherNames} ${artist.allMembers.join(' ')}`.toLowerCase();
  });

  // Set Indexation
  dispatch(setArtistsSearchIndexation(searchIndexation));

  // Order by Artists Name
  const orderedArtists = _.sortBy(ARTISTS, [artist => artist.name.toLowerCase()]).map(band => band.id);
  dispatch(setArtistsList(orderedArtists));
  dispatch(setArtistsListBackUp(orderedArtists));
};

export const parseMembers = () => (dispatch, getState) => {
  const MEMBERS = _.cloneDeep(getState().database.members);
  const orderedMembers = _.sortBy(MEMBERS, ['name', 'birthdate']).map(member => member.id);
  dispatch(setMembersList(orderedMembers));
};

export const parseSongs = () => (dispatch) => {
  const songs = API.get('/units/songs');
  dispatch(setSongsPerUnit(songs));
};

export const getLatestUnits = () => (dispatch, getState) => {
  const latestUnits = API.get('/units/latest');
  dispatch(setLatestUnits(latestUnits));
};

export const artistsfilter = e => (dispatch, getState) => {
  if (typeof e === 'string') {
    return dispatch(setArtistsList([...getState().app.artistListBackUp]));
  }
  const value = e.target.value.toLowerCase();
  if (value.length > 0 && value.length < 3) return;
  const { artistsSearchIndexation } = getState().app;
  if (value.length === 0) {
    dispatch(setArtistsList([...getState().app.artistListBackUp]));
  } else {
    // Find band names with value and push id to artistList
    const filteredArtists = [];
    Object.keys(artistsSearchIndexation).forEach((key) => {
      const artist = artistsSearchIndexation[key];
      if (artist.includes(value)) {
        filteredArtists.push(key);
      }
    });

    dispatch(setArtistsList(filteredArtists));
  }
};

export const toggleIsLoading = bool => (dispatch, getState) => {
  if (bool) {
    dispatch(setIsLoading(bool));
  } else {
    const value = getState().app.isLoading;
    dispatch(setIsLoading(!value));
  }
};

export const updateSelectedArtist = artistId => (dispatch, getState) => {
  dispatch(setSelectedArtist(artistId));
  // Reset selected unit
  dispatch(setSelectedUnit({}));

  // Update selected Units
  const units = API.get(`/artists/${artistId}/units`);
  dispatch(setSelectedUnits(units));

  // Reset song
  dispatch(setCurrentSong(0));
};

export const updateSelectedUnit = id => (dispatch, getState) => {
  const unit = API.get(`/units/${id}`);
  dispatch(setSelectedUnit(unit));

  let currentUnitSongs = [];
  if (getState().app.songsPerUnit[id]) {
    currentUnitSongs = [...getState().app.songsPerUnit[id]];
    currentUnitSongs = currentUnitSongs.map(songId => API.get(`/songs/${songId}`));
  }
  dispatch(parseUnitSongs(currentUnitSongs));
};

export const toggleColorSheetTab = event => (dispatch) => {
  const { id } = event.target;
  dispatch(setColorSheetTab(id));
};

export const switchUnitsTab = event => (dispatch) => {
  const { id } = event.target;
  dispatch(setArtistPageTab(id));
};

export const updateCurrentSong = id => (dispatch, getState) => {
  dispatch(setCurrentSong(id));
};

export const updateCurrentUnit = id => (dispatch, getState) => {
  let { selectedArtist, selectedUnit } = getState().app;

  if (id) {
    const unit = API.get(`/units/${id}`);
    selectedArtist = unit.bandId;
    selectedUnit = unit;
  }
  const currentArtist = API.get(`/artists/${selectedArtist}`);
  const currentUnit = API.get(`/units/${selectedUnit.id}/all`);

  // Get unique main colors to the members
  const colorDict = {};
  // Create color dictionary
  for (let i = 0; i < currentUnit.members.length; i++) {
    const member = currentUnit.members[i];
    if (colorDict[member.colorId] === undefined) {
      colorDict[member.colorId] = true;
    }
  }
  // Check color availability
  for (let i = 0; i < currentUnit.members.length; i++) {
    const member = currentUnit.members[i];
    if (colorDict[member.colorId]) {
      colorDict[member.colorId] = false;
    } else if (colorDict[member.altColorId] === undefined) {
      currentUnit.members[i].colorId = member.altColorId;
    } else {
      // If altColor is taken, assign random color
      let newColor = Math.floor(Math.random() * 36) + 1;
      while (colorDict[newColor] !== undefined) {
        newColor += 1;
        if (newColor > 36) newColor = 1;
      }
      currentUnit.member[i].colorId = newColor;
    }
  }

  dispatch(setCurrentArtist(currentArtist));
  dispatch(setCurrentUnit(currentUnit));
  dispatch(setCurrentSong(0));
};

export const updateLatestUnits = id => (dispatch, getState) => {
  const unit = id || getState().app.selectedUnit;
  const latestUnits = [...getState().app.latestUnits];
  const containsInLatest = latestUnits.indexOf(unit.id);
  if (containsInLatest !== -1) {
    latestUnits.splice(containsInLatest, 1);
  }
  if (unit.id) {
    latestUnits.unshift(unit.id);
    if (latestUnits.length > 5) {
      latestUnits.pop();
    }
    dispatch(setLatestUnits(latestUnits));
    API.post('/units/latest', latestUnits);
  }
};

export const updateShouldReset = (bool = false) => (dispatch) => {
  dispatch(setShouldReset(bool));
};

export const parseUnitSongs = songs => (dispatch) => {
  const distributionPerMember = {};
  const distributionPerMemberOfficial = {};
  let distributionTotal = 0;
  let distributionTotalOfficial = 0;

  songs.forEach((song) => {
    const { distribution } = song;
    const distDict = {};
    let total = 0;

    // Get member totals
    for (let i = 0; i < distribution.length; i++) {
      const instance = distribution[i];
      if (distDict[instance.memberId] === undefined) {
        distDict[instance.memberId] = instance.duration;
      } else {
        distDict[instance.memberId] += instance.duration;
      }
      total += instance.duration;
    }

    const distTotals = [];
    let totalPercentage = 0;
    for (let i = 0; i < Object.keys(distDict).length; i++) {
      // Calculate bar
      const key = Object.keys(distDict)[i];
      const memberTotal = Math.round((distDict[key] * 100) / total);
      distTotals.push({
        memberId: key,
        memberTotal,
      });
      totalPercentage += memberTotal;
      // Add to state/reducer
      if (distributionPerMember[key] === undefined) {
        distributionPerMember[key] = distDict[key];
      } else {
        distributionPerMember[key] += distDict[key];
      }
      if (song.type === 'official') {
        if (distributionPerMemberOfficial[key] === undefined) {
          distributionPerMemberOfficial[key] = distDict[key];
        } else {
          distributionPerMemberOfficial[key] += distDict[key];
        }
      }
    }
    distributionTotal += total;
    if (song.type === 'official') {
      distributionTotalOfficial += total;
    }

    const result = _.orderBy(distTotals, ['memberTotal'], ['desc']);
    if (totalPercentage < 100) {
      const remaining = 100 - totalPercentage;
      result[result.length - 1].memberTotal += remaining;
    }
    if (totalPercentage > 100) {
      const remaining = totalPercentage - 100;
      result[result.length - 1].memberTotal -= remaining;
    }
    song.result = result;
  });

  dispatch(setDistributionPerMember(distributionPerMember));
  dispatch(setDistributionPerMemberOfficial(distributionPerMemberOfficial));
  dispatch(setDistributionTotal(distributionTotal));
  dispatch(setDistributionTotalOfficial(distributionTotalOfficial));
  dispatch(setSelectedUnitSongs(songs));
};
