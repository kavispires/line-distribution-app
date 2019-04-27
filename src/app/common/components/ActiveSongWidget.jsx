import React from 'react';
import PropTypes from 'prop-types';

const ActiveSongWidget = ({ activeSong, inline }) => {
  // Return nothing if currentUnit is not available
  if (!activeSong.id) {
    return null;
  }

  const inlineClass = inline ? 'inline' : '';

  return (
    <section className={`active-widget active-widget--quarter ${inlineClass}`}>
      <h3>Active Song:</h3>
      <div className="active-widget__content">
        <h1>
          {activeSong.title.toUpperCase()}{' '}
          <span className="active-widget__unit">
            (by {activeSong.originalArtist})
          </span>
        </h1>
      </div>
    </section>
  );
};

ActiveSongWidget.propTypes = {
  activeSong: PropTypes.object,
  inline: PropTypes.bool,
};

ActiveSongWidget.defaultProps = {
  activeSong: {},
  inline: false,
};

export default ActiveSongWidget;
