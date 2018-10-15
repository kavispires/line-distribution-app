import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artists from '../components/Artists';

import { loadArtists, setSearchQuery } from '../reducers/artists';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  loadArtists,
  setSearchQuery,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Artists)
);
