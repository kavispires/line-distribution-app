import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Test from '../components/Test';

import { testFunction } from '../reducers/temp';

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
  db: state.db,
  database: state.database,
  test: state.test,
});

const mapDispatchToProps = {
  testFunction,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Test)
);
