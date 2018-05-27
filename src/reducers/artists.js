import _ from 'lodash';

import API from '../api';

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
const SET_USER_FAVORITE_ARTISTS = 'SET_USER_FAVORITE_ARTISTS';
const SET_USER_LATEST_ARTISTS = 'SET_USER_LATEST_ARTISTS';

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
export const setUserFavoriteArtists = payload => dispatch => dispatch({ type: SET_USER_FAVORITE_ARTISTS, payload });
export const setUserLatestArtists = payload => dispatch => dispatch({ type: SET_USER_LATEST_ARTISTS, payload });

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

export const loadArtists = () => (dispatch) => {
  const artistList = API.get('/artists');

  const sortedArtistList = _.sortBy(artistList, [a => a.name.toLowerCase()]);

  dispatch(setArtistList(sortedArtistList));
  dispatch(setArtistListBackUp(sortedArtistList));

  // Also, load latest artists, and favorite units
  dispatch(loadUserArtists());
};

export const loadUserArtists = () => (dispatch, getState) => {
  const { user } = getState().user;
  if (user.uid) {
    const userLatestArtists = API.get(`/user/latest/${user.uid}`);
    dispatch(setUserLatestArtists(userLatestArtists));
    const userFavoriteArtists = API.get(`/user/favorite/${user.uid}`);
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

const parseUnitSongs = unit => (dispatch) => {
  const distributionPerMember = {};
  const distributionPerMemberOfficial = {};
  let distributionTotal = 0;
  let distributionTotalOfficial = 0;

  unit.songs.forEach((song) => {
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
  dispatch(setSelectedUnit(unit));
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
};

export const updateSelectedUnit = id => (dispatch) => {
  const unit = API.get(`/units/${id}/all`);
  dispatch(parseUnitSongs(unit));
  dispatch(setSelectedUnit(unit));
};

export const updateLatestUnits = id => (dispatch, getState) => {
  const unitId = id || getState().app.currentUnit.id;
  const { user } = getState().user;
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
    API.post(`/user/latest/${user.uid}`, latestUnits);
    setTimeout(() => {
      const newUserLatestArtists = API.get(`/user/latest/${user.uid}`);
      dispatch(setUserLatestArtists(newUserLatestArtists));
    }, 3000);
  }
};

export const updateFavoriteUnits = id => (dispatch, getState) => {
  const unitId = id || getState().app.currentUnit.id;
  const { user } = getState().user;
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
    API.post(`/user/favorite/${user.uid}`, favoriteUnits);
    setTimeout(() => {
      const newUserFavoriteArtists = API.get(`/user/favorite/${user.uid}`);
      dispatch(setUserFavoriteArtists(newUserFavoriteArtists));
    }, 3000);
  }
};
