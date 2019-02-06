import React from 'react';
import PropTypes from 'prop-types';

// Import images
import loading from '../../../images/loading.svg';

const LoadingIcon = ({ size }) => (
  <span className={`loading-icon loading-icon--${size}`}>
    <img className="loading-icon__image" src={loading} alt="Loading Icon" />
  </span>
);

LoadingIcon.propTypes = {
  size: PropTypes.string,
};

LoadingIcon.defaultProps = {
  size: 'medium',
};

export default LoadingIcon;
