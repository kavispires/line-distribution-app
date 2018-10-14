import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { setIsLoading } from '../reducers/app';
import { initDB } from '../reducers/db';

const mapStateToProps = state => ({
  app: state.app,
  db: state.app,
});

const mapDispatchToProps = {
  initDB,
  setIsLoading,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
