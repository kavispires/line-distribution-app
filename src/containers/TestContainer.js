import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Test from '../components/Test';

const mapStateToProps = state => ({
  app: state.app,
  db: state.db,
  database: state.database,
  user: state.user,
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Test));
