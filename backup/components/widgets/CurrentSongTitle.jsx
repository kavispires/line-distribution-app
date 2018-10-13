import React from 'react';
import PropTypes from 'prop-types';

const CurrentArtist = ({ currentArtist }) => {
  let artistName = '';
  if (typeof currentArtist === 'string') {
    artistName = currentArtist;
  } else if (
    typeof currentArtist === 'object' &&
    currentArtist.name !== undefined
  ) {
    artistName = currentArtist.name;
  }

  if (artistName) {
    return (
      <span className="widget-current-artist">
        <i> {artistName}</i>
      </span>
    );
  }

  return <span />;
};

CurrentArtist.propTypes = {
  currentArtist: PropTypes.object.isRequired,
};

export default CurrentArtist;
