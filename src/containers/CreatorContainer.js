import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Creator from '../components/Creator';

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

  addNewMember,
  generateArtistJSON,
  generateFullJSON,
  generateUnitJSON,
  generateMembersJSON,

  removeNewMember,
  removePosition,
  updateNewMember,

} from '../reducers/creator';

const mapStateToProps = state => ({
  app: state.app,
  creator: state.creator,
  database: state.database,
  db: state.db,
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

  addNewMember,
  generateArtistJSON,
  generateFullJSON,
  generateUnitJSON,
  generateMembersJSON,

  removeNewMember,
  removePosition,
  updateNewMember,

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Creator));
