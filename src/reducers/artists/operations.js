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
    dispatch(actions.setLoading(false, 'artists'));
  }

  // Also, load latest artists, and favorite units
  // dispatch(loadUserArtists());
  dispatch(appOperations.setLoading(false, 'artists'));
};

const loadUserArtists = () => async (dispatch, getState) => {};

const loadArtist = (artistId, queryParams) => async (dispatch, getState) => {};

const updateSearchQuery = value => dispatch => {
  if (value === '' || value.length > 2) {
    dispatch(actions.setSearchQuery(value.toLowerCase()));
  }
};

const updateLatestUnits = id => async (dispatch, getState) => {};

const switchUnitsTab = e => async dispatch => {};

export default {
  loadArtists,
  loadUserArtists,
  loadArtist,
  updateSearchQuery,
  updateLatestUnits,
  switchUnitsTab,
};
