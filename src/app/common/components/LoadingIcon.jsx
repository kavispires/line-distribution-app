import React from 'react';
import PropTypes from 'prop-types';

// Import images
import loading from '../../../images/loading.svg';

const LoadingIcon = ({ size, inline }) => (
  <span
    className={`loading-icon loading-icon--${size} ${inline ? 'inline' : ''}`}
  >
    <img className="loading-icon__image" src={loading} alt="Loading Icon" />
  </span>
);

LoadingIcon.propTypes = {
  size: PropTypes.string,
  inline: PropTypes.bool,
};

LoadingIcon.defaultProps = {
  size: 'medium',
  inline: false,
};

export default LoadingIcon;
