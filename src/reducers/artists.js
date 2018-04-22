import _ from 'lodash';

import API from '../api';

import { setCurrentSong } from './app';

/* ------------------   ACTIONS   ------------------ */

const SET_ARTIST_LIST = 'SET_ARTIST_LIST';
const SET_ARTIST_LIST_BACK_UP = 'SET_ARTISTS_LIST_BACK_UP';
const SET_ARTIST_PAGE_TAB = 'SET_ARTIST_PAGE_TAB';
const SET_DISTRIBUTION_PER_MEMBER = 'SET_DISTRIBUTION_PER_MEMBER';
const SET_DISTRIBUTION_PER_MEMBER_OFFICIAL = 'SET_DISTRIBUTION_PER_MEMBER_OFFICIAL';
const SET_DISTRIBUTION_TOTAL = 'SET_DISTRIBUTION_TOTAL';
const SET_DISTRIBUTION_TOTAL_OFFICIAL = 'SET_DISTRIBUTION_TOTAL_OFFICIAL';
const SET_SELECTED_ARTIST = 'SET_SELECTED_ARTIST';
const SET_SELECTED_UNIT = 'SET_SELECTED_UNIT';
const SET_SELECTED_UNIT_SONGS = 'SET_SELECTED_UNIT_SONGS';
const SET_SELECTED_UNITS = 'SET_SELECTED_UNITS';

/* --------------   ACTION CREATORS   -------------- */

export const setArtistList = payload => dispatch => dispatch({ type: SET_ARTIST_LIST, payload });
export const setArtistListBackUp = payload => dispatch => dispatch({ type: SET_ARTIST_LIST_BACK_UP, payload });
export const setArtistPageTab = payload => dispatch => dispatch({ type: SET_ARTIST_PAGE_TAB, payload });
export const setDistributionPerMember = payload => dispatch => dispatch({ type: SET_DISTRIBUTION_PER_MEMBER, payload });
export const setDistributionPerMemberOfficial = payload => dispatch => dispatch({ type: SET_DISTRIBUTION_PER_MEMBER_OFFICIAL, payload });
export const setDistributionTotal = payload => dispatch => dispatch({ type: SET_DISTRIBUTION_TOTAL, payload });
export const setDistributionTotalOfficial = payload => dispatch => dispatch({ type: SET_DISTRIBUTION_TOTAL_OFFICIAL, payload });
export const setSelectedArtist = payload => dispatch => dispatch({ type: SET_SELECTED_ARTIST, payload });
export const setSelectedUnit = payload => dispatch => dispatch({ type: SET_SELECTED_UNIT, payload });
export const setSelectedUnitSongs = payload => dispatch => dispatch({ type: SET_SELECTED_UNIT_SONGS, payload });
export const setSelectedUnits = payload => dispatch => dispatch({ type: SET_SELECTED_UNITS, payload });

/* -----------------   REDUCERS   ------------------ */

export const initialState = {
  artistList: {},
  artistListBackUp: {},
  artistPageTab: 0,
  distributionPerMember: {},
  distributionPerMemberOfficial: {},
  distributionTotal: 0,
  distributionTotalOfficial: 0,
  selectedArtist: {},
  selectedUnit: {},
  selectedUnitSongs: [],
  selectedUnits: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_ARTIST_LIST:
      newState.artistList = action.payload;
      break;

    case SET_ARTIST_LIST_BACK_UP:
      newState.artistListBackUp = action.payload;
      break;

    case SET_ARTIST_PAGE_TAB:
      newState.artistPageTab = action.payload;
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

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const loadArtists = () => (dispatch) => {
  const artistList = API.get('/artists');

  const sortedArtistList = _.sortBy(artistList, [a => a.name.toLowerCase()]);

  dispatch(setArtistList(sortedArtistList));
  dispatch(setArtistListBackUp(sortedArtistList));
};

export const filterArtists = e => (dispatch, getState) => {
  if (typeof e === 'string') {
    return dispatch(setArtistList([...getState().artists.artistListBackUp]));
  }

  const value = e.target.value.toUpperCase();

  // If empty
  if (value.length === 0) {
    return dispatch(setArtistList([...getState().artists.artistListBackUp]));
  }
  // If less than 3 characters
  if (value.length < 3) {
    return undefined;
  }

  // If searchable
  const artistList = [...getState().artists.artistListBackUp];
  const filteredArtists = _.filter(artistList, o => o.query.includes(value));
  dispatch(setArtistList(filteredArtists));
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

export const switchUnitsTab = event => (dispatch) => {
  const { id } = event.target;
  dispatch(setArtistPageTab(id));
};

export const updateSelectedArtist = id => (dispatch) => {
  const artist = API.get(`/artists/${id}`);

  dispatch(setSelectedArtist(artist));
  // Reset selected unit
  dispatch(setSelectedUnit({}));

  // Update selected Units
  const units = API.get(`/artists/${id}/units`);
  dispatch(setSelectedUnits(units));

  // Reset song
  // TO-DO: Remove this call from here. Don't use other reducer functions here
  dispatch(setCurrentSong(0));
};

export const updateSelectedUnit = id => (dispatch, getState) => {
  const unit = API.get(`/units/${id}/all`);
  dispatch(setSelectedUnit(unit));

  let currentUnitSongs = [];
  if (getState().app.songsPerUnit[id]) {
    currentUnitSongs = [...getState().app.songsPerUnit[id]];
    currentUnitSongs = currentUnitSongs.map(songId => API.get(`/songs/${songId}`));
  }
  dispatch(parseUnitSongs(currentUnitSongs));
};
