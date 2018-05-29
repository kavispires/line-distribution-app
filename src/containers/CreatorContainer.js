import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Creator from '../components/Creator';

import {
  fetchCompleteDatabase,
} from '../reducers/admin';

import {
  addNewMember,
  checkValidation,
  clearPositions,
  handleNewArtistGenre,
  handleNewArtistName,
  handleNewArtistOtherNames,
  handleNewUnitName,
  handleNewUnitDebutYear,
  handleNewUnitOfficial,
  loadArtist,
  loadMember,
  loadUnit,
  removeNewMember,
  removePosition,
  reset,
  save,
  switchCreatorTab,
  unloadMember,
  updateExistingMember,
  updateNewMember,
} from '../reducers/creator';

const mapStateToProps = state => ({
  admin: state.admin,
  app: state.app,
  creator: state.creator,
  database: state.database,
  db: state.db,
  user: state.user,
});

const mapDispatchToProps = {
  addNewMember,
  checkValidation,
  clearPositions,
  handleNewArtistGenre,
  handleNewArtistName,
  handleNewArtistOtherNames,
  handleNewUnitName,
  handleNewUnitDebutYear,
  handleNewUnitOfficial,
  loadArtist,
  loadMember,
  loadUnit,
  removeNewMember,
  removePosition,
  reset,
  save,
  switchCreatorTab,
  unloadMember,
  updateExistingMember,
  updateNewMember,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Creator));
