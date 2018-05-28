import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginRequiredScreen from './LoginRequiredScreen';
import LoadingScreen from './LoadingScreen';

import UserArtistTable from './UserArtistTable';

import { ARTITST_PLACEHOLDER } from '../constants';

class Artists extends Component {
  componentWillMount() {
    if (this.props.db.loaded) {
      this.props.loadArtists();
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.db.loaded !== this.props.db.loaded) {
      this.props.loadArtists();
      this.render();
    }
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.filterArtists('');
    }
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
    const ARTISTS = this.props.artists;
    const { artistList } = ARTISTS;
    const currentArtist = APP.currentArtist.id ? APP.currentArtist : ARTITST_PLACEHOLDER;

    const handleArtistClick = (e) => {
      // Get id of the closest tr element
      const artist = ARTISTS.artistList[[].indexOf.call(e.currentTarget.children, e.target.closest('tr'))];
      const artistId = artist.id;
      this.props.history.push(`/artist/${artistId}`);
      if (artist.units && artist.units.length > 0) {
        this.props.toggleIsLoading(true);
        setTimeout(() => {
          this.props.updateSelectedUnit(artist.units[0]);
          this.props.toggleIsLoading(false);
        }, 1000);
      }
    };

    const setArtistUnit = (unit) => {
      this.props.history.push(`/artist/${unit.artist.id}`);
      this.props.toggleIsLoading(true);
      // Delays setting selected unit to override page landing functions
      setTimeout(() => {
        this.props.updateSelectedUnit(unit.id);
        this.props.toggleIsLoading(false);
      }, 1000);
    };

    return (
      <section className="container">
        <h1>Artists</h1>
        <p>Current Band: {currentArtist.name}</p>

        {
          this.props.user.isAuthenticated ? (
            <div className="user-artists-container">
              <UserArtistTable
                title="Your Latest Artists"
                icon="clock"
                unitList={ARTISTS.userLatestArtists}
                action={setArtistUnit}
                message="When you begin using the app, the 5 most recent artists you use will show up here."
              />
              <UserArtistTable
                title="Your Favorite Artists"
                icon="heart"
                unitList={ARTISTS.userFavoriteArtists}
                action={setArtistUnit}
                message="You may favorite up to 5 artists by clicking on the Heart icon in the Artist page."
              />
            </div>
          ) : null
        }


        <h2>All Artists</h2>
        <input className="search-bar" type="text" placeholder="Filter..." onChange={this.props.filterArtists} />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>Units</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody onClick={e => handleArtistClick(e)}>
            {
              artistList.length > 0 ?
              artistList.map((entry) => {
                const unitCount = entry.units ? entry.units.length : 0;
                return (
                  <tr key={entry.id}>
                    <td>{entry.name}</td>
                    <td>{entry.genre}</td>
                    <td>{unitCount}</td>
                    <td>{entry.memberList.join(', ')}</td>
                  </tr>
                );
              })
              :
              <tr><td>No artists available within your search</td><td /><td /><td /></tr>
            }
          </tbody>
        </table>
      </section>
    );
  }
}

Artists.propTypes = {
  app: PropTypes.object.isRequired, // eslint-disable-line
  artists: PropTypes.object.isRequired, // eslint-disable-line
  db: PropTypes.object.isRequired, // eslint-disable-line
  user: PropTypes.object.isRequired, // eslint-disable-line
  history: PropTypes.object.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
  filterArtists: PropTypes.func.isRequired,
  loadArtists: PropTypes.func.isRequired,
  toggleIsLoading: PropTypes.func.isRequired,
  updateSelectedUnit: PropTypes.func.isRequired,
};

export default Artists;
