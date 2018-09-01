import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import shared components
import ExpandableCard from './shared/ExpandableCard';
import LoginRequiredScreen from './shared/LoginRequiredScreen';
import LoadingScreen from './shared/LoadingScreen';
// Import other components
import UserArtistTable from './UserArtistTable';
// Import constants
import { ARTITST_PLACEHOLDER } from '../constants';

class Artists extends Component {
  componentWillMount() {
    if (this.props.db.loaded) {
      this.props.loadArtists();
      this.props.init();
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.db.loaded !== this.props.db.loaded) {
      this.props.loadArtists();
      this.props.init();
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
    const currentArtist = APP.currentArtist.id
      ? APP.currentArtist
      : ARTITST_PLACEHOLDER;

    const handleArtistClick = e => {
      // Get id of the closest tr element
      const artist =
        ARTISTS.artistList[
          [].indexOf.call(e.currentTarget.children, e.target.closest('tr'))
        ];
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

    const setArtistUnit = unit => {
      this.props.history.push(`/artist/${unit.artist.id}`);
      this.props.toggleIsLoading(true);
      // Delays setting selected unit to override page landing functions
      setTimeout(() => {
        this.props.updateSelectedUnit(unit.id);
        this.props.toggleIsLoading(false);
      }, 1000);
    };

    return (
      <main className="container">
        <h1>Artists</h1>
        <p>Current Band: {currentArtist.name}</p>

        {this.props.user.isAuthenticated ? (
          <section className="user-artists-container">
            <ExpandableCard
              props={this.props}
              sessionId="user-latest-artists"
              title="Your Latest Artists"
              icon="clock"
              width="half"
            >
              {ARTISTS.userLatestArtists.length > 0 ? (
                <UserArtistTable
                  list={ARTISTS.userLatestArtists}
                  action={setArtistUnit}
                  prefix="user-latest-artists"
                />
              ) : (
                <p className="user-artists-message">
                  When you begin using the app, the 5 most recent artists you
                  use will show up here.
                </p>
              )}
            </ExpandableCard>
            <ExpandableCard
              props={this.props}
              sessionId="user-favorite-artists"
              title="Your Favorite Artists"
              icon="heart"
              width="half"
            >
              {ARTISTS.userLatestArtists.length > 0 ? (
                <UserArtistTable
                  list={ARTISTS.userFavoriteArtists}
                  action={setArtistUnit}
                  prefix="user-favorite-artists"
                />
              ) : (
                <p className="user-artists-message">
                  You may favorite up to 5 artists by clicking on the Heart icon
                  in the Artist page.
                </p>
              )}
            </ExpandableCard>
          </section>
        ) : null}

        <h2>All Artists</h2>
        <input
          className="search-bar"
          type="text"
          placeholder="Filter..."
          onChange={this.props.filterArtists}
        />
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
            {artistList.length > 0 ? (
              artistList.map(entry => {
                const unitCount = entry.units ? entry.units.length : 0;
                return (
                  <tr key={`all-artists-${entry.id}`}>
                    <td>{entry.name}</td>
                    <td>{entry.genre}</td>
                    <td>{unitCount}</td>
                    <td>{entry.memberList.map(m => m.name).join(', ')}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No artists available within your search</td>
                <td />
                <td />
                <td />
              </tr>
            )}
          </tbody>
        </table>
      </main>
    );
  }
}

Artists.propTypes = {
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  filterArtists: PropTypes.func.isRequired,
  loadArtists: PropTypes.func.isRequired,
  toggleIsLoading: PropTypes.func.isRequired,
  updateSelectedUnit: PropTypes.func.isRequired,
};

export default Artists;
