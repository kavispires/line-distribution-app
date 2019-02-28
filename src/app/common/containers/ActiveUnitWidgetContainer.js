import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ActiveUnitWidget from '../components/ActiveUnitWidget';

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
  )(ActiveUnitWidget)
);
