import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components
import ArtistPicture from './ArtistPicture';
import Bias from './Bias';
import UnitsContainer from '../containers/UnitsContainer';
// Import common components
import {
  FavoriteIcon,
  Icon,
  LoadingWrapper,
  PageTitle,
  RequirementWrapper,
} from '../../../common';

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
    const {
      app,
      artists: { selectedArtist },
      auth,
      updateBias,
    } = this.props;

    const isArtistPending = app.pending.REQUEST_ARTIST;

    const hasNoUnits =
      !selectedArtist.units || selectedArtist.units.length === 0;

    const isArtistFavoritedByUser =
      selectedArtist &&
      selectedArtist.id &&
      auth.user &&
      auth.user.favoriteArtists[selectedArtist.id];

    return (
      <RequirementWrapper requirements={['selectedArtist']}>
        <main className="container container--artist">
          <PageTitle title="Artist Page" />
          <LoadingWrapper pending={isArtistPending}>
            <section className="artist-section">
              <div className="artist-section-wrapper">
                <ArtistPicture artistName={selectedArtist.name} />
                <div className="artist-page-info">
                  <h2 className="artist-page-info__name">
                    {selectedArtist.name}
                    <FavoriteIcon
                      action={this.props.updateFavoriteArtists}
                      id={selectedArtist.id || ''}
                      className="artist-page-info__name--fav-icon"
                      size="20"
                      state={isArtistFavoritedByUser}
                    />
                  </h2>
                  <p className="artist-page-info__genre">
                    {selectedArtist.agency} • {selectedArtist.genre}{' '}
                    {selectedArtist.disbanded ? (
                      <span>
                        • <Icon type="grave" inline color="purple" /> Disbanded
                      </span>
                    ) : null}
                  </p>
                  <ul className="artist-page-info__members-list">
                    {selectedArtist.members &&
                      selectedArtist.members.map(member => (
                        <li
                          className={`artist-page-info__member-pill background-color-${member.color}`}
                          key={`mp-${member.id}`}
                        >
                          {member.name}
                        </li>
                      ))}
                  </ul>
                </div>
                <Bias
                  artistId={selectedArtist.id}
                  isPending={app.pending.UPDATE_USER_BIASES}
                  members={selectedArtist.members}
                  updateBias={updateBias}
                  userBiases={auth.user.biases}
                />
              </div>
              {/* Artist has no units */
              hasNoUnits ? (
                <div className="no-units-container">
                  The selected artist has no units available.
                </div>
              ) : (
                /* Artist has units */
                <UnitsContainer />
              )}
            </section>
          </LoadingWrapper>
        </main>
      </RequirementWrapper>
    );
  }
}

Artist.propTypes = {
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadArtist: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  updateFavoriteArtists: PropTypes.func.isRequired,
  updateBias: PropTypes.func.isRequired,
};

Artist.defaultProps = {};

export default Artist;
