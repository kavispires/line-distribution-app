import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artist from '../components/Artist';
import { artistsOperations } from '../reducers/artists';
import { authOperations } from '../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  loadArtist: artistsOperations.loadArtist,
  login: authOperations.login,
  switchUnitsTab: artistsOperations.switchUnitsTab,
  updateFavoriteArtists: authOperations.updateFavoriteArtists,
  updateFavoriteMembers: authOperations.updateFavoriteMembers,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Artist)
);
