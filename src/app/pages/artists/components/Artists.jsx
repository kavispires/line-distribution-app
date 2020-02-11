import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import common components
import {
  ActiveSong,
  ActiveUnit,
  PageTitle,
  RequirementWrapper,
  Switch,
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
    this.props.db.artists.read(this);
    // console.log(this.props.db.artists.data);
    // if (this.props.auth.isAuthenticated) {
    //   // this.props.loadArtists();
    // }

    this.localStorage();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.isAuthenticated && this.props.auth.isAuthenticated) {
      // this.props.loadArtists();
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
      const [artistId, unitId] = id.split(':::');

      // If artist has units, add first one to route
      const unitSubRoute = unitId.startsWith('-') ? `/${unitId}` : '';

      this.props.history.push(`/artists/${artistId}${unitSubRoute}`);
    }
  }

  render() {
    const {
      auth: { user },
      db: { artists },
      distribute: { activeSong, activeUnit },
      updateFavoriteArtists,
    } = this.props;

    const { artistSearchQuery, artistsFavoritesOnly } = this.state;

    // console.log(artists.data);

    // const isArtistPending =
    //   pending.REQUEST_ARTISTS ||
    //   pending.INITIALIZER ||
    //   pending.RUN_AUTH ||
    //   artists.isLoading;

    return (
      <RequirementWrapper>
        <main className="container container--artists">
          <section className="active-widget__group">
            <ActiveUnit activeUnit={activeUnit} showMembers />
            <ActiveSong activeSong={activeSong} />
          </section>

          <PageTitle title="Artists" />

          {/* TO-DO: Recent artists */}

          <section className="artists__section">
            <input
              className="artists__search-bar"
              type="text"
              placeholder="Filter..."
              onChange={e => this.updateSearchQuery(e.target.value)}
            />{' '}
            Show Favorite Artists Only:{' '}
            <Switch
              action={this.toggleShowFavoriteArtistsOnly}
              checked={artistsFavoritesOnly}
            />
            <ArtistsTable
              artists={artists.data}
              searchQuery={artistSearchQuery}
              pending={artists.isLoading}
              rowAction={this.handleTableClick}
              favoriteAction={updateFavoriteArtists}
              showFavoriteArtistsOnly={artistsFavoritesOnly}
              userFavoriteArtists={user.favoriteArtists}
            />
          </section>
        </main>
      </RequirementWrapper>
    );
  }
}

Artists.propTypes = {
  artists: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  distribute: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  updateFavoriteArtists: PropTypes.func.isRequired,
};

Artists.defaultProps = {};

export default Artists;
