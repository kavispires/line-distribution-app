import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artist from '../components/Artist';
import { loadArtist, switchUnitsTab } from '../reducers/artists';
import {
  login,
  updateFavoriteArtists,
  updateFavoriteMembers,
} from '../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  loadArtist,
  login,
  switchUnitsTab,
  updateFavoriteArtists,
  updateFavoriteMembers,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Artist)
);
