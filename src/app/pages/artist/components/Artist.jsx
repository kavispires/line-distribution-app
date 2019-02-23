import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components
import Units from './Units';
// Import common components
import { FavoriteIcon, LoadingIcon, RequirementWrapper } from '../../../common';
// Import utility functions
import utils from '../../../../utils';

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberColors: {},
    };
  }

  componentDidMount() {
    const { artistId } = this.props.match.params;
    if (
      this.props.artists.selectedArtist &&
      this.props.artists.selectedArtist.id !== artistId
    ) {
      this.props.loadArtist(artistId, this.props.location.search);
    }
    console.log('COMPONENT_DID_MOUNT');
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.artists.selectedUnit.id !== this.props.artists.selectedUnit.id
    ) {
      this.getMemberColors();
    }
  }

  getMemberColors() {
    const memberColors = { ...this.state.memberColors };
    Object.values(this.props.artists.selectedUnit.members).forEach(member => {
      memberColors[member.id] = utils.getColorNumber(member.colorId);
    });
    this.setState({ memberColors });
  }

  render() {
    const {
      app,
      artists: { selectedArtist },
      auth,
    } = this.props;

    const isArtistPending = app.pending.REQUEST_ARTIST;

    return (
      <RequirementWrapper requirements={['selectedArtist']}>
        <main className="container container--artist">
          <h1>Artist Page</h1>
          {isArtistPending ? (
            <LoadingIcon />
          ) : (
            <section className="artist__section">
              <h2 className="artist-page__name">
                {selectedArtist.name}
                <FavoriteIcon
                  action={this.props.updateFavoriteArtists}
                  id={selectedArtist.id || ''}
                  className="artist-page__name--fav-icon"
                  size="20"
                  state={
                    selectedArtist &&
                    selectedArtist.id &&
                    auth.user &&
                    auth.user.favoriteArtists[selectedArtist.id]
                  }
                />
              </h2>
              <p className="artist-page__genre">{selectedArtist.genre}</p>
              <ul className="artist-page__members-list">
                {selectedArtist.memberList &&
                  selectedArtist.memberList.map((memberName, index) => (
                    <li
                      className={`artist-page__member-pill background-color-${
                        this.state.memberColors[selectedArtist.memberIds[index]]
                      }`}
                      key={`mp-${memberName}`}
                    >
                      {memberName}
                    </li>
                  ))}
              </ul>
              <Units props={this.props} />
            </section>
          )}
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
};

Artist.defaultProps = {};

export default Artist;
