import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import common components
import {
  ActiveUnit,
  Switch,
  RequirementWrapper,
  ActiveSong,
} from '../../../common';
// Import components
import ArtistsTable from './ArtistsTable';
// Import utils
import localStorage from '../../../../utils/local-storage';

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistsFavoritesOnly: false,
      artistSearchQuery: '',
    };

    this.handleTableClick = this.handleTableClick.bind(this);
    this.updateSearchQuery = this.updateSearchQuery.bind(this);
    this.toggleShowFavoriteArtistsOnly = this.toggleShowFavoriteArtistsOnly.bind(
      this
    );
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.loadArtists();
    }

    this.localStorage();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.isAuthenticated && this.props.auth.isAuthenticated) {
      this.props.loadArtists();
    }
  }

  localStorage() {
    this.setState({
      artistsFavoritesOnly: localStorage.get('artistsFavoritesOnly') || false,
    });
  }

  updateSearchQuery(value) {
    if (value === '' || value.length > 2) {
      this.setState({
        artistSearchQuery: value.toLowerCase(),
      });
    }
  }

  toggleShowFavoriteArtistsOnly() {
    const toggleValue = !this.state.artistsFavoritesOnly;

    this.setState({
      artistsFavoritesOnly: toggleValue,
    });

    localStorage.set({ artistsFavoritesOnly: toggleValue });
  }

  // Redirects user to the selected Artists page
  handleTableClick(e) {
    const { id } = e.target.parentNode;
    const { className } = e.target;
    if (id && className !== 'artists-cell-favorite') {
      const [index, artistId] = id.split(':a:');

      // If artist has units, add first one to route
      const unitIds = this.props.db.artists[index].unitIds || [];
      const unitSubRoute = unitIds.length > 0 ? `/${unitIds[0]}` : '';

      this.props.history.push(`/artists/${artistId}${unitSubRoute}`);
    }
  }

  render() {
    const {
      app: { pending },
      auth: { user },
      db,
      distribute: { activeSong, activeUnit },
    } = this.props;

    return (
      <RequirementWrapper>
        <main className="container container--artists">
          <h1>Artists</h1>

          <section className="active-widget__group">
            <ActiveUnit activeUnit={activeUnit} showMembers />
            <ActiveSong activeSong={activeSong} />
          </section>

          <section className="artists__section">
            <h2>All Artists</h2>
            <input
              className="artists__search-bar"
              type="text"
              placeholder="Filter..."
              onChange={e => this.updateSearchQuery(e.target.value)}
            />{' '}
            Show Favorite Artists Only:{' '}
            <Switch
              action={this.toggleShowFavoriteArtistsOnly}
              checked={this.state.artistsFavoritesOnly}
            />
            <ArtistsTable
              artists={db.artists}
              searchQuery={this.state.artistSearchQuery}
              pending={pending.REQUEST_ARTISTS}
              rowAction={this.handleTableClick}
              favoriteAction={this.props.updateFavoriteArtists}
              showFavoriteArtistsOnly={this.state.artistsFavoritesOnly}
              user={user}
            />
          </section>
        </main>
      </RequirementWrapper>
    );
  }
}

Artists.propTypes = {
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  distribute: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadArtists: PropTypes.func.isRequired,
  updateFavoriteArtists: PropTypes.func.isRequired,
};

Artists.defaultProps = {};

export default Artists;
