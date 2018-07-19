import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LoginRequiredScreen from './LoginRequiredScreen';
import LoadingScreen from './LoadingScreen';

import CurrentArtistName from './widgets/CurrentArtistName';

import { getLyricsSnippet } from '../utils';

class Songs extends Component {
  componentDidMount() {
    const reload = this.props.songs.songList.length < 0;
    this.props.loadSongs(reload);
  }

  render() {
    // LOGIN Check if user is logged in
    if (this.props.user.isAuthenticated === false) {
      return <LoginRequiredScreen props={this.props} redirect="/artists" />;
    }

    // DB Check if db is ready
    if (this.props.db.loaded === false) {
      return <LoadingScreen />;
    }

    const APP = this.props.app;
    const SONGS = this.props.songs;
    const CURRENT_UNIT = APP.currentUnit;
    const { songList } = SONGS;

    if (CURRENT_UNIT && !CURRENT_UNIT.members) {
      return (
        <div className="container-flex">
          <section className="container container-distribution">
            <section className="section-distribution container-fixed">
              <h1>Songs</h1>
              <div>
                <p>You must select an Artist and Unit in the <Link to="/artists">Artists Page</Link> before loading song lyrics.</p>
              </div>
            </section>
          </section>
        </div>
      );
    }

    const handleSongLoadClick = (e) => {
      // Get id of the closest tr element
      const song = SONGS.songList[[].indexOf.call(e.currentTarget.children, e.target.closest('tr'))];
      this.props.loadSong(song);
      setTimeout(() => {
        this.props.toggleBrackets(false);
        this.props.history.push('/lyrics/');
      }, 500);
    };

    return (
      <section className="container">
        <h1>Songs<CurrentArtistName currentArtist={APP.currentArtist} /></h1>
        <p>Search for previously used songs and load its lyrics to the lyrics parser.</p>

        <input className="search-bar" type="text" placeholder="Filter..." onChange={this.props.songsFilter} />
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Snippet</th>
            </tr>
          </thead>
          <tbody onClick={e => handleSongLoadClick(e)}>
            {
              songList.length > 0 ?
              songList.map((song) => {
                const snippet = getLyricsSnippet(song.lyrics);
                return (
                  <tr key={song.id}>
                    <td>{song.title}</td>
                    <td>{song.originalArtist}</td>
                    <td>{snippet}</td>
                  </tr>
                );
              })
              :
              <tr><td>No songs available within your search</td><td /><td /></tr>
            }
          </tbody>
        </table>
      </section>
    );
  }
}

Songs.propTypes = {
  app: PropTypes.object.isRequired, // eslint-disable-line
  db: PropTypes.object.isRequired, // eslint-disable-line
  songs: PropTypes.object.isRequired, // eslint-disable-line
  user: PropTypes.object.isRequired, // eslint-disable-line
  history: PropTypes.object.isRequired, // eslint-disable-line
  loadSong: PropTypes.func.isRequired,
  loadSongs: PropTypes.func.isRequired,
  songsFilter: PropTypes.func.isRequired,
  toggleBrackets: PropTypes.func.isRequired,
};

export default Songs;
