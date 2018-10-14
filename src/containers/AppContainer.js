import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
