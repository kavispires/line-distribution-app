import React from 'react';
import PropTypes from 'prop-types';

// Import common components
import { Icon } from '..';

const ActiveSongWidget = ({ activeSong, inline, ...props }) => {
  // Return nothing if currentUnit is not available
  if (!activeSong.id) {
    return null;
  }

  const inlineClass = inline ? 'inline' : '';

  const goToDistribution = () => {
    props.history.push(`/distribute`);
  };

  return (
    <section className={`active-widget active-widget--quarter ${inlineClass}`}>
      <h3>Active Song:</h3>
      <button
        className="active-widget__go-to-button"
        onClick={() => goToDistribution()}
      >
        <Icon type="go-to" />
      </button>
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
  history: PropTypes.object.isRequired,
  inline: PropTypes.bool,
};

ActiveSongWidget.defaultProps = {
  activeSong: {},
  inline: false,
};

export default ActiveSongWidget;
