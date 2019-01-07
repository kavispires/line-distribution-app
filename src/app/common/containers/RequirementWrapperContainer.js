import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RequirementWrapper from '../components/RequirementWrapper';

import { authOperations } from '../../../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  ...authOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RequirementWrapper)
);
