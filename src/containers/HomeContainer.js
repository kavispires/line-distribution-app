import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Home from '../components/Home';

const mapStateToProps = state => ({
  app: state.app,
  db: state.db,
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
