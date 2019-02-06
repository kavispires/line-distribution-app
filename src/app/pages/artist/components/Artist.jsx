import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components
import ArtistDetails from './ArtistDetails';
// Import common components
import { RequirementWrapper, LoadingIcon } from '../../../common';

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
    const { app, artists } = this.props;
    const { selectedArtist } = artists;

    const isArtistPending = app.pending && !Object.keys(selectedArtist).length;

    return (
      <RequirementWrapper requirements={['selectedArtist']}>
        <main className="container container--artist">
          <h1>Artist Page</h1>
          {isArtistPending ? (
            <LoadingIcon />
          ) : (
            <ArtistDetails
              props={this.props}
              switchArtistPageTab={this.props.switchArtistPageTab}
              updateFavoriteArtists={this.props.updateFavoriteArtists}
            />
          )}
        </main>
      </RequirementWrapper>
    );
  }
}

Artist.propTypes = {
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  loadArtist: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  switchArtistPageTab: PropTypes.func.isRequired,
  updateFavoriteArtists: PropTypes.func.isRequired,
};

Artist.defaultProps = {};

export default Artist;
