import React from 'react';

// Import images
import loading from '../../../images/loading.svg';

const LoadingIcon = () => (
  <span className="loading-icon">
    <img className="loading-icon__image" src={loading} alt="Loading Icon" />
  </span>
);

LoadingIcon.propTypes = {};

LoadingIcon.defaultProps = {};

export default LoadingIcon;
