import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import LoginRequired from './LoginRequired';

class Artist extends Component {
  componentDidMount() {
    const { artistId } = this.props.match.params;
    if (
      this.props.artists.selectedArtist &&
      this.props.artists.selectedArtist.id !== artistId
    ) {
      this.props.loadArtist(artistId, this.props.location.search);
    }
  }

  render() {
    const { app, artists, auth, db } = this.props;
    const { selectedArtist, selectedUnit, selectedUnits } = artists;

    if (db.loaded && (!auth.user || !auth.user.uid)) {
      return <LoginRequired login={this.props.login} />;
    }

    // If artists is not loaded yet
    if (!selectedArtist || selectedArtist.id === undefined) {
      return (
        <main className="container container--artist">
          <h1>Artist Page</h1>
        </main>
      );
    }

    return (
      <main className="container container--artist">
        <h1>
          Artist Page: {selectedArtist.name}
          <button
            className="btn btn-transparent"
            onClick={() => this.props.updateFavoriteArtists(selectedArtist.id)}
          >
            {selectedArtist &&
            selectedArtist.id &&
            auth.user &&
            auth.user.favoriteArtists[selectedArtist.id] ? (
              <Icon type="heart" color="red" size="20" />
            ) : (
              <Icon type="heart-hollow" color="gray" size="20" />
            )}
          </button>
        </h1>
        <section className="artist__section">
          <p>Genre: {selectedArtist.genre}</p>
          <p>
            Members:
            {selectedArtist.memberList &&
              selectedArtist.memberList.map(member => {
                const key = `pill-member-${member.id}`;
                return (
                  <span
                    key={key}
                    className={`pill background-${member.color.class}`}
                  >
                    {member.name}
                  </span>
                );
              })}
          </p>
        </section>
        <section className="artist__section">TABS</section>
      </main>
    );
  }
}

Artist.propTypes = {
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  loadArtist: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  updateFavoriteArtists: PropTypes.func.isRequired,
};

Artist.defaultProps = {};

export default Artist;
