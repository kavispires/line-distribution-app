import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Creator from '../components/Creator';

import {
  fetchCompleteDatabase,
} from '../reducers/admin';

import {
  loadArtist,
  handleNewArtistName,
  handleNewArtistOtherNames,
  handleNewArtistGenre,
  loadUnit,
  handleNewUnitName,
  handleNewUnitDebutYear,
  handleNewUnitOfficial,
  loadMember,
  unloadMember,
  switchCreatorTab,
  addNewMember,
  generateArtistJSON,
  generateFullJSON,
  generateUnitJSON,
  generateMembersJSON,

  removeNewMember,
  removePosition,
  updateNewMember,
  reset,
  save,
  checkValidation,
  clearPositions,
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
  loadArtist,
  handleNewArtistName,
  handleNewArtistOtherNames,
  handleNewArtistGenre,
  loadUnit,
  handleNewUnitName,
  handleNewUnitDebutYear,
  handleNewUnitOfficial,
  loadMember,
  unloadMember,
  switchCreatorTab,
  addNewMember,
  generateArtistJSON,
  generateFullJSON,
  generateUnitJSON,
  generateMembersJSON,

  removeNewMember,
  removePosition,
  updateNewMember,
  reset,
  save,
  fetchCompleteDatabase,
  checkValidation,
  clearPositions,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Creator));
