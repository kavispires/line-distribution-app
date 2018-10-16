import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artists from '../components/Artists';

import { setIsLoading } from '../reducers/app';
import { loadArtists, setSearchQuery } from '../reducers/artists';
import { login, updateFavoriteArtists } from '../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  loadArtists,
  login,
  setIsLoading,
  setSearchQuery,
  updateFavoriteArtists,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Artists)
);
