import React from 'react';

const CurrentArtistName = ({currentArtist}) => {
  let artistName = '';
  if (typeof currentArtist === 'string') {
    artistName = currentArtist;
  } else if (typeof currentArtist === 'object' && currentArtist.name !== undefined) {
    artistName = currentArtist.name;
  }

  if (artistName) {
    return (
      <span className="widget-h1-title">
        <i> {artistName}</i>
      </span>
    );
  }

  return <span />;
};

export default CurrentArtistName;
