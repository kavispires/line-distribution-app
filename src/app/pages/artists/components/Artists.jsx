import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import components
// import CurrentArtist from './CurrentArtist';
// Import common components
import { Icon, Switch, RequirementWrapper } from '../../../common';
import ArtistsTable from './ArtistsTable';

class Artists extends Component {
  componentDidMount() {
    this.props.loadArtists();
    this.props.updateSearchQuery('');
  }
  render() {
    const { artists, auth } = this.props;
    const {
      artistList,
      searchQuery,
      showFavoriteArtistsOnly,
      userLatestArtists,
    } = artists;
    const { user } = auth;

    let filteredArtists = artistList;
    if (showFavoriteArtistsOnly) {
      filteredArtists = _.filter(artistList, o => user.favoriteArtists[o.id]);
    }

    // Row click should send user to the selected artist page
    const handleTableClick = e => {
      const { id } = e.target.parentNode;
      const { className } = e.target;
      if (id && className !== 'artists-cell-favorite') {
        const artistId = id.substring(2);
        this.props.history.push(`/artists/${artistId}`);
      }
    };

    return (
      <RequirementWrapper>
        <main className="container container--artists">
          <h1>Artists</h1>

          {/* <CurrentArtist props={this.props} /> */}

          {userLatestArtists.length > 0 ? (
            <section className="artists__section">
              <h2>
                <Icon type="clock" size="20" color="blue" /> Your Recently Used
                Artists
              </h2>

              <ArtistsTable
                artists={filteredArtists}
                rowAction={handleTableClick}
                favoriteAction={this.props.updateFavoriteArtists}
                user={user}
              />
            </section>
          ) : null}

          <section className="artists__section">
            <h2>All Artists</h2>
            <input
              className="artists__search-bar"
              type="text"
              placeholder="Filter..."
              onChange={e => this.props.updateSearchQuery(e.target.value)}
            />{' '}
            Show Favorite Artists Only:{' '}
            <Switch
              action={this.props.showFavoriteArtistsOnlyToggle}
              checked={showFavoriteArtistsOnly}
            />
            <ArtistsTable
              artists={filteredArtists}
              searchQuery={searchQuery}
              rowAction={handleTableClick}
              favoriteAction={this.props.updateFavoriteArtists}
              user={user}
            />
          </section>
        </main>
      </RequirementWrapper>
    );
  }
}

Artists.propTypes = {
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadArtists: PropTypes.func.isRequired,
  showFavoriteArtistsOnlyToggle: PropTypes.func.isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
  updateFavoriteArtists: PropTypes.func.isRequired,
};

Artists.defaultProps = {};

export default Artists;
