import React from 'react';
import PropTypes from 'prop-types';

import { FavoriteIcon } from '../../../common';

const ArtistDetails = ({ props, updateFavoriteArtists }) => {
  const { artists, auth } = props;
  const { selectedArtist } = artists;

  return (
    <section className="artist__section">
      <h2 className="artist-page__name">
        {selectedArtist.name}
        <FavoriteIcon
          action={updateFavoriteArtists}
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
          selectedArtist.memberList.map(memberName => (
            <li className="artist-page__member-pill" key={`mp-${memberName}`}>
              {memberName}
            </li>
          ))}
      </ul>
    </section>
  );
};

ArtistDetails.propTypes = {
  artists: PropTypes.object,
  auth: PropTypes.object,
  props: PropTypes.object.isRequired,
  updateFavoriteArtists: PropTypes.func.isRequired,
};

ArtistDetails.defaultProps = {
  artists: {},
  auth: {},
};

export default ArtistDetails;
