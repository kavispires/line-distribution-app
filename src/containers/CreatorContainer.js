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
<<<<<<< HEAD
  reset,
  save,
  checkValidation,
  clearPositions,
=======

  checkValidation,
>>>>>>> 8d43733c6b64ea9d373230bd63473522a2e7c616
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
<<<<<<< HEAD
  reset,
  save,
  fetchCompleteDatabase,
  checkValidation,
  clearPositions,
=======

  fetchCompleteDatabase,
  checkValidation,
>>>>>>> 8d43733c6b64ea9d373230bd63473522a2e7c616
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Creator));
