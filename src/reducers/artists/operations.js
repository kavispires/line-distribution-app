import _ from 'lodash';
import { toastr } from 'react-redux-toastr';

import actions from './actions';

import API from '../../api';

import utils from '../../utils';

import { appOperations } from '../app';

const loadArtists = () => dispatch => dispatch({ type: 'REQUEST_ARTISTS' });

const loadArtist = (artistId, queryParams) => dispatch =>
  dispatch({ type: 'REQUEST_ARTIST', artistId, queryParams });

const loadUserArtists = () => async (dispatch, getState) => {};

const findUnitIndex = (units, unitId) => units.findIndex(u => u.id === unitId);

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

const switchArtistPageTab = event => async (dispatch, getState) => {
  let { id } = event.target;

  // When clicking on the tab icon, the id is lost
  if (!id) {
    id = event.target.parentNode.parentNode.id; // eslint-disable-line
  }
  if (!id) return null;

  dispatch(actions.setArtistPageTab(id));

  const selectedArtist = { ...getState().artists.selectedArtist };
  const unitIndex = findUnitIndex(selectedArtist.units, id);
  const currentUnit = selectedArtist.units[unitIndex];

  // If unit has the complete flag, use it, else request a new complete one
  if (currentUnit.complete) {
    dispatch(actions.setSelectedUnit(currentUnit));
  } else {
    await dispatch({
      type: 'REQUEST_UNIT',
      unitId: id,
      selectedArtist,
      unitIndex,
    });
  }
};

export default {
  loadArtists,
  loadUserArtists,
  loadArtist,
  updateSearchQuery,
  updateLatestUnits,
  showFavoriteArtistsOnlyToggle,
  switchArtistPageTab,
};
