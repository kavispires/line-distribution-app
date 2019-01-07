import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Songs from '../components/Songs';

import { toggleBrackets } from '../reducers/lyrics';

import { loadSong, loadSongs, songsFilter } from '../reducers/songs';

import { login } from '../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
  db: state.db,
  songs: state.songs,
});

const mapDispatchToProps = {
  loadSong,
  loadSongs,
  login,
  songsFilter,
  toggleBrackets,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Songs)
);
