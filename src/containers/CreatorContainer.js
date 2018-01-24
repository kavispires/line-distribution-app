import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Creator from '../components/Creator';

import {
  addBlankMember,
  generateBandJSON,
  generateFullJSON,
  generateMembersJSON,
  handleBandName,
  handleOtherNames,
  handleVersion,
  handleGenre,
  handleOfficial,
  removeNewMember,
  removePosition,
  updateNewMember
} from '../reducers/creator';

const mapStateToProps = (state) => ({ app: state.app, creator: state.creator });

const mapDispatchToProps = {
  addBlankMember,
  generateBandJSON,
  generateFullJSON,
  generateMembersJSON,
  handleBandName,
  handleOtherNames,
  handleVersion,
  handleGenre,
  handleOfficial,
  removeNewMember,
  removePosition,
  updateNewMember,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Creator));
