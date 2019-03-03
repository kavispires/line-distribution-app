import actions from './actions';

const activateSong = () => (dispatch, getState) => {};

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
