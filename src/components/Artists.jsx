import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import components
import CurrentArtist from './CurrentArtist';
// Import shared components
import FavoriteIcon from './shared/FavoriteIcon';
import { Icon } from '../app/common';
import ArtistsTableContainer from '../containers/ArtistsTableContainer';

class Artists extends Component {
  componentDidMount() {
    this.props.loadArtists();
    this.props.updateSearchQuery('');
  }
  render() {
    const { artists, auth } = this.props;
    const { artistList, searchQuery, userLatestArtists } = artists;
    const { user } = auth;

    let filteredArtists = artistList;
    if (searchQuery) {
      filteredArtists = _.filter(artistList, o =>
        o.query.includes(searchQuery)
      );
    }

    const handleTableClick = e => {
      const { id } = e.target.parentNode;
      const { className } = e.target;
      if (id && className !== 'favorite') {
        const artistId = id.substring(2);
        this.props.history.push(`/artists/${artistId}`);
      }
    };

    const log = () => {
      console.log('test');
    };

    return (
      <main className="container container--artists">
        <h1>Artists</h1>

        <CurrentArtist props={this.props} />

        <ArtistsTableContainer
          artists={filteredArtists}
          searchQuery={searchQuery}
          rowAction={log}
        />

        {userLatestArtists.length > 0 ? (
          <section className="artists__section">
            <h2>
              <Icon type="clock" size="20" color="blue" /> Your Recently Used
              Artists
            </h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Genre</th>
                  <th>Unit</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody onClick={handleTableClick}>
                {userLatestArtists.map(entry => (
                  <tr key={`all-artists-${entry.id}`}>
                    <td>{entry.artist.name}</td>
                    <td>{entry.artist.genre}</td>
                    <td>{entry.name}</td>
                    <td>{entry.memberList.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        <section className="artists__section">
          <h2>All Artists</h2>
          <input
            className="artists__search-bar"
            type="text"
            placeholder="Filter..."
            onChange={e => this.props.updateSearchQuery(e.target.value)}
          />
          <table className="table">
            <thead>
              <tr>
                <th />
                <th>Name</th>
                <th>Genre</th>
                <th>Units</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody onClick={handleTableClick}>
              {filteredArtists.length > 0 ? (
                filteredArtists.map(entry => {
                  const unitCount = entry.units ? entry.units.length : 0;

                  return (
                    <tr key={`all-artists-${entry.id}`} id={`a-${entry.id}`}>
                      <td className="favorite">
                        <FavoriteIcon
                          action={this.props.updateFavoriteArtists}
                          id={entry.id}
                          size="12"
                          state={
                            user.favoriteArtists &&
                            user.favoriteArtists[entry.id]
                          }
                        />
                      </td>
                      <td>{entry.name}</td>
                      <td>{entry.genre}</td>
                      <td>{unitCount}</td>
                      <td>{entry.memberList.join(', ')}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">No artists available within your search</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    );
  }
}

Artists.propTypes = {
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadArtists: PropTypes.func.isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
  updateFavoriteArtists: PropTypes.func.isRequired,
};

Artists.defaultProps = {};

export default Artists;
