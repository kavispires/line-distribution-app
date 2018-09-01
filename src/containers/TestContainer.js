import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Test from '../components/Test';

import { testFunction } from '../reducers/test';

const mapStateToProps = state => ({
  app: state.app,
  db: state.db,
  database: state.database,
  user: state.user,
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
