import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Songs from '../components/Songs';

import {
  loadSong,
  loadSongs,
  songsFilter,
} from '../reducers/songs';

import {
  login,
} from '../reducers/user';

const mapStateToProps = state => ({
  app: state.app,
  db: state.db,
  songs: state.songs,
  user: state.user,
});

const mapDispatchToProps = {
  loadSong,
  loadSongs,
  login,
  songsFilter,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Songs));
