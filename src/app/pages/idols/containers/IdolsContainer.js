import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Idols from '../components/Idols';

import { artistsOperations } from '../../../../reducers/artists';
import { authOperations } from '../../../../reducers/auth';
import { dbOperations } from '../../../../reducers/db';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  ...dbOperations,
  ...artistsOperations,
  ...authOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Idols)
);
