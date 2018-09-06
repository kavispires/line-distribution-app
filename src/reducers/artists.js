import _ from 'lodash';

import { API } from './db';

/* ------------------   ACTIONS   ------------------ */

const SET_ARTIST_LIST = 'SET_ARTIST_LIST';
const SET_ARTIST_LIST_BACK_UP = 'SET_ARTISTS_LIST_BACK_UP';
const SET_ARTIST_PAGE_TAB = 'SET_ARTIST_PAGE_TAB';
const SET_DISTRIBUTION_PER_MEMBER = 'SET_DISTRIBUTION_PER_MEMBER';
const SET_DISTRIBUTION_PER_MEMBER_OFFICIAL =
  'SET_DISTRIBUTION_PER_MEMBER_OFFICIAL';
const SET_DISTRIBUTION_PER_MEMBER_WOULD = 'SET_DISTRIBUTION_PER_MEMBER_WOULD';
const SET_DISTRIBUTION_TOTAL = 'SET_DISTRIBUTION_TOTAL';
const SET_DISTRIBUTION_TOTAL_OFFICIAL = 'SET_DISTRIBUTION_TOTAL_OFFICIAL';
const SET_DISTRIBUTION_TOTAL_WOULD = 'SET_DISTRIBUTION_TOTAL_WOULD';
const SET_SELECTED_ARTIST = 'SET_SELECTED_ARTIST';
const SET_SELECTED_UNIT = 'SET_SELECTED_UNIT';
const SET_SELECTED_UNIT_SONGS = 'SET_SELECTED_UNIT_SONGS';
const SET_SELECTED_UNITS = 'SET_SELECTED_UNITS';
const SET_USER_FAVORITE_ARTISTS = 'SET_USER_FAVORITE_ARTISTS';
const SET_USER_LATEST_ARTISTS = 'SET_USER_LATEST_ARTISTS';

/* --------------   ACTION CREATORS   -------------- */

export const setArtistList = payload => dispatch =>
  dispatch({ type: SET_ARTIST_LIST, payload });
export const setArtistListBackUp = payload => dispatch =>
  dispatch({ type: SET_ARTIST_LIST_BACK_UP, payload });
export const setArtistPageTab = payload => dispatch =>
  dispatch({ type: SET_ARTIST_PAGE_TAB, payload });
export const setDistributionPerMember = payload => dispatch =>
  dispatch({ type: SET_DISTRIBUTION_PER_MEMBER, payload });
export const setDistributionPerMemberOfficial = payload => dispatch =>
  dispatch({ type: SET_DISTRIBUTION_PER_MEMBER_OFFICIAL, payload });
export const setDistributionPerMemberWould = payload => dispatch =>
  dispatch({ type: SET_DISTRIBUTION_PER_MEMBER_WOULD, payload });
export const setDistributionTotal = payload => dispatch =>
  dispatch({ type: SET_DISTRIBUTION_TOTAL, payload });
export const setDistributionTotalOfficial = payload => dispatch =>
  dispatch({ type: SET_DISTRIBUTION_TOTAL_OFFICIAL, payload });
export const setDistributionTotalWould = payload => dispatch =>
  dispatch({ type: SET_DISTRIBUTION_TOTAL_WOULD, payload });
export const setSelectedArtist = payload => dispatch =>
  dispatch({ type: SET_SELECTED_ARTIST, payload });
export const setSelectedUnit = payload => dispatch =>
  dispatch({ type: SET_SELECTED_UNIT, payload });
export const setSelectedUnitSongs = payload => dispatch =>
  dispatch({ type: SET_SELECTED_UNIT_SONGS, payload });
export const setSelectedUnits = payload => dispatch =>
  dispatch({ type: SET_SELECTED_UNITS, payload });
export const setUserFavoriteArtists = payload => dispatch =>
  dispatch({ type: SET_USER_FAVORITE_ARTISTS, payload });
export const setUserLatestArtists = payload => dispatch =>
  dispatch({ type: SET_USER_LATEST_ARTISTS, payload });

/* -----------------   REDUCERS   ------------------ */

export const initialState = {
  artistList: {},
  artistListBackUp: {},
  artistPageTab: 0,
  distributionPerMember: {},
  distributionPerMemberOfficial: {},
  distributionPerMemberWould: {},
  distributionTotal: 0,
  distributionTotalOfficial: 0,
  distributionTotalWould: 0,
  selectedArtist: {},
  selectedUnit: {},
  selectedUnitSongs: [],
  selectedUnits: {},
  userFavoriteArtists: [],
  userLatestArtists: [],
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

    case SET_DISTRIBUTION_PER_MEMBER_WOULD:
      newState.distributionPerMemberWould = action.payload;
      break;

    case SET_DISTRIBUTION_TOTAL:
      newState.distributionTotal = action.payload;
      break;

    case SET_DISTRIBUTION_TOTAL_OFFICIAL:
      newState.distributionTotalOfficial = action.payload;
      break;

    case SET_DISTRIBUTION_TOTAL_WOULD:
      newState.distributionTotalWould = action.payload;
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

    case SET_USER_FAVORITE_ARTISTS:
      newState.userFavoriteArtists = action.payload;
      break;

    case SET_USER_LATEST_ARTISTS:
      newState.userLatestArtists = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const loadArtists = () => async dispatch => {
  const artistList = await API.get('/artists');

  const sortedArtistList = _.sortBy(artistList, [a => a.name.toLowerCase()]);

  dispatch(setArtistList(sortedArtistList));
  dispatch(setArtistListBackUp(sortedArtistList));

  // Also, load latest artists, and favorite units
  dispatch(loadUserArtists());
};

export const loadUserArtists = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  if (user.uid) {
    const userLatestArtists = await API.get(`/users/${user.uid}/latest`);
    dispatch(setUserLatestArtists(userLatestArtists));
    const userFavoriteArtists = await API.get(`/users/${user.uid}/favorite`);
    dispatch(setUserFavoriteArtists(userFavoriteArtists));
  }
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

const parseUnitSongs = unit => dispatch => {
  const distributionPerMember = {};
  const distributionPerMemberOfficial = {};
  const distributionPerMemberWould = {};
  let distributionTotal = 0;
  let distributionTotalOfficial = 0;
  let distributionTotalWould = 0;

  if (unit.songs) {
    unit.songs.forEach(song => {
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
        // Add to
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
        } else {
          if (distributionPerMemberWould[key] === undefined) {
            distributionPerMemberWould[key] = distDict[key];
          } else {
            distributionPerMemberWould[key] += distDict[key];
          }
        }
      }
      distributionTotal += total;
      if (song.type === 'official') {
        distributionTotalOfficial += total;
      } else {
        distributionTotalWould += total;
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
  }

  dispatch(setDistributionPerMember(distributionPerMember));
  dispatch(setDistributionPerMemberOfficial(distributionPerMemberOfficial));
  dispatch(setDistributionPerMemberWould(distributionPerMemberWould));
  dispatch(setDistributionTotal(distributionTotal));
  dispatch(setDistributionTotalOfficial(distributionTotalOfficial));
  dispatch(setDistributionTotalWould(distributionTotalWould));
  dispatch(setSelectedUnit(unit));
};

export const switchUnitsTab = event => dispatch => {
  const { id } = event.target;
  dispatch(setArtistPageTab(id));
  dispatch(updateSelectedUnit(id));
};

export const updateSelectedArtist = id => async dispatch => {
  const artist = await API.get(`/artists/${id}`);

  dispatch(setSelectedArtist(artist));
  // Reset selected unit
  dispatch(setSelectedUnit({}));

  // Update selected Units
  const units = await API.get(`/artists/${id}/units`);
  dispatch(setSelectedUnits(units));

  // Reset song
  // TO-DO: Remove this call from here. Don't use other reducer functions here
};

export const updateSelectedUnit = id => async dispatch => {
  const unit = await API.get(`/units/${id}`);

  dispatch(parseUnitSongs(unit));
  dispatch(setSelectedUnit(unit));
};

export const updateLatestUnits = id => async (dispatch, getState) => {
  const unitId = id || getState().app.currentUnit.id;
  const { user } = getState().auth;
  if (id && user.uid) {
    let latestUnits = [];
    const { userLatestArtists } = getState().artists;
    if (userLatestArtists.length > 0) {
      latestUnits = userLatestArtists.map(unit => unit.id);
    }
    if (id === latestUnits[0]) {
      return null;
    }

    // Check if it already contains, then remove it
    const containsInLatest = latestUnits.indexOf(unitId);
    if (containsInLatest !== -1) {
      latestUnits.splice(containsInLatest, 1);
    }
    // Add it to the beginning
    latestUnits.unshift(id);
    // Remove the last one if array is larger than 5
    if (latestUnits.length > 5) {
      latestUnits.pop();
    }
    // Post then reload app
    const newUserLatestArtists = await API.post(
      `/users/${user.uid}/latest`,
      latestUnits
    );

    dispatch(setUserLatestArtists(newUserLatestArtists));
  }
};

export const updateFavoriteUnits = id => async (dispatch, getState) => {
  const unitId = id || getState().app.currentUnit.id;
  const { user } = getState().auth;
  if (id && user.uid) {
    let favoriteUnits = [];
    const { userFavoriteArtists } = getState().artists;
    if (userFavoriteArtists.length > 0) {
      favoriteUnits = userFavoriteArtists.map(unit => unit.id);
    }

    // Check if it already contains, then remove it
    const containsInFavorite = favoriteUnits.indexOf(unitId);
    if (containsInFavorite !== -1) {
      favoriteUnits.splice(containsInFavorite, 1);
    } else {
      // Add it to the beginning
      favoriteUnits.unshift(id);
    }

    // Remove the last one if array is larger than 5
    if (favoriteUnits.length > 5) {
      favoriteUnits.pop();
    }
    // Post then reload app
    const newUserFavoriteArtists = await API.post(
      `/users/${user.uid}/favorite`,
      favoriteUnits
    );

    dispatch(setUserFavoriteArtists(newUserFavoriteArtists));
  }
};
