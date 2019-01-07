import _ from 'lodash';
import { toastr } from 'react-redux-toastr';

import actions from './actions';

import API from '../../api';

import utils from '../../utils';

import { appOperations } from '../app';

const loadArtists = () => async dispatch => {
  dispatch(appOperations.setLoading(true, 'artists'));

  try {
    const response = await API.get('/artists');
    const artistList = utils.parseResponse(response);

    const sortedArtistList = _.sortBy(artistList, [a => a.name.toLowerCase()]);
    dispatch(actions.setArtistList(sortedArtistList));
  } catch (error) {
    console.log(error);
    toastr.error('Unable to load artists database', error);
  } finally {
    dispatch(appOperations.setLoading(false, 'artists'));
  }

  // Also, load latest artists, and favorite units
  // dispatch(loadUserArtists());
};

const loadUserArtists = () => async (dispatch, getState) => {};

const loadArtist = (artistId, queryParams) => async (dispatch, getState) => {
  let selectedArtist = {};

  try {
    dispatch(appOperations.setLoading(true, 'artist'));

    const response = await API.get(`/artists/${artistId}`);
    selectedArtist = utils.parseResponse(response);
    console.log(selectedArtist);
    // Get units
  } catch (error) {
    console.log(error);
    toastr.error(`Unable to load artist ${artistId} database`, error);
  } finally {
    dispatch(appOperations.setLoading(false, 'artist'));
  }

  dispatch(actions.setSelectedArtist(selectedArtist));
};

const updateSearchQuery = value => dispatch => {
  if (value === '' || value.length > 2) {
    dispatch(actions.setSearchQuery(value.toLowerCase()));
  }
};

const showFavoriteArtistsOnlyToggle = () => (dispatch, getState) => {
  const { showFavoriteArtistsOnly } = getState().artists;

  dispatch(actions.setShowFavoriteArtistsOnly(!showFavoriteArtistsOnly));
};

const updateLatestUnits = id => async (dispatch, getState) => {};

const switchUnitsTab = e => async dispatch => {};

export default {
  loadArtists,
  loadUserArtists,
  loadArtist,
  updateSearchQuery,
  updateLatestUnits,
  showFavoriteArtistsOnlyToggle,
  switchUnitsTab,
};
