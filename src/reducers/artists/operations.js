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
    console.error(error);
    toastr.error('Unable to load artists database', error);
  } finally {
    dispatch(appOperations.setLoading(false, 'artists'));
  }

  // Also, load latest artists, and favorite units
  // dispatch(loadUserArtists());
};

const loadUserArtists = () => async (dispatch, getState) => {};

const loadArtist = (artistId, queryParams) => async (dispatch, getState) => {
  dispatch(appOperations.setLoading(true, 'artist'));

  let selectedArtist = {};

  // Fetch Artist
  try {
    const response = await API.get(`/artists/${artistId}`);
    selectedArtist = utils.parseResponse(response);
  } catch (error) {
    console.error(error);
    toastr.error(`Unable to load artist ${artistId} from database`, error);
    dispatch(appOperations.setLoading(false, 'artist'));
  }

  // Select default unit id
  queryParams = utils.parseQueryParams(queryParams);
  let selectedUnitId = selectedArtist.units[0];
  let unitIndex = 0;
  if (
    queryParams &&
    queryParams.unit &&
    selectedArtist.units.includes(queryParams.unit)
  ) {
    selectedUnitId = queryParams.unit;
    unitIndex = selectedArtist.units.indexOf(selectedUnitId);
  }

  // Fetch Artist's Units
  try {
    const response = await API.get(`/artists/${artistId}/units`);

    selectedArtist.units = utils.parseResponse(response);
  } catch (error) {
    console.error(error);
    toastr.error(
      `Unable to load artist ${artistId}'s units from database`,
      error
    );
  }

  // Fetch complete unit for default unit
  selectedArtist = await loadCompleteUnit(selectedUnitId, selectedArtist);

  dispatch(actions.setArtistPageTab(selectedUnitId));
  dispatch(actions.setSelectedArtist(selectedArtist));
  dispatch(actions.setSelectedUnit(selectedArtist.units[unitIndex]));

  dispatch(appOperations.setLoading(false, 'artist'));
};

const findUnitIndex = (units, unitId) => units.findIndex(u => u.id === unitId);

const loadCompleteUnit = async (unitId, selectedArtist) => {
  const artist = { ...selectedArtist };

  // Find unit in artist
  const unitIndex = findUnitIndex(artist.units, unitId);

  if (unitIndex !== -1) {
    const unit = { ...artist.units[unitIndex] };

    // Fetch unit members
    if (unit.members[0].id === undefined) {
      try {
        const response = await API.get(`/units/${unitId}/members`);
        unit.members = utils.parseResponse(response);
      } catch (error) {
        console.error(error);
        toastr.error(`Unable to load unitId 's units from database: ${error}`);
      }
    }

    // Fetch unit distributions
    if (unit.distributions[0] && unit.distributions[0].id === undefined) {
      console.log('should fetch unit distributions');
    }

    // Fetch unit legacy distributions
    if (
      unit.distributions_legacy[0] &&
      unit.distributions_legacy[0].id === undefined
    ) {
      console.log('should fetch unit legacy distributions');
    }

    artist.units[unitIndex] = unit;
  }

  return artist;
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

const switchArtistPageTab = event => async (dispatch, getState) => {
  const { id } = event.target;
  let selectedArtist = { ...getState().artists.selectedArtist };
  selectedArtist = await loadCompleteUnit(id, selectedArtist);
  const unitIndex = findUnitIndex(selectedArtist.units, id);
  dispatch(actions.setArtistPageTab(id));
  dispatch(actions.setSelectedArtist(selectedArtist));
  dispatch(actions.setSelectedUnit(selectedArtist.units[unitIndex]));

  // dispatch(updateSelectedUnit(id));
  console.log(selectedArtist.units[unitIndex]);
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
