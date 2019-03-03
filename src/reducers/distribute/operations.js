import _ from 'lodash';

import actions from './actions';

const activateSong = id => (dispatch, getState) => {
  const activeSong = _.find(getState().admin.songs, { id });
  dispatch(actions.setActiveSong(activeSong));
};

const activateUnit = () => (dispatch, getState) => {
  const selectedArtist = { ...getState().artists.selectedArtist };
  const activeUnit = { ...getState().artists.selectedUnit };

  activeUnit.artistName = selectedArtist.name;
  activeUnit.genre = selectedArtist.genre;

  dispatch(actions.setActiveUnit(activeUnit));
};

export default {
  activateSong,
  activateUnit,
};
