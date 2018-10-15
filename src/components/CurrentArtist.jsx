import React from 'react';
import PropTypes from 'prop-types';

const CurrentArtist = ({ ...props }) => {
  return (
    <section className="current-artist">
      <b>Current Artist:</b> No Artist Selected
    </section>
  );
};

CurrentArtist.propTypes = {};

CurrentArtist.defaultProps = {};

export default CurrentArtist;
