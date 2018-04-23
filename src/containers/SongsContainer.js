import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Songs from '../components/Songs';

import {
  loadSong,
  loadSongs,
  songsFilter,
} from '../reducers/songs';

const mapStateToProps = state => ({
  app: state.app,
  db: state.db,
  songs: state.songs,
  user: state.user,
});

const mapDispatchToProps = {
  loadSong,
  loadSongs,
  songsFilter,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Songs));
