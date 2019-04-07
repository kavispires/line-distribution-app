import React from 'react';
import PropTypes from 'prop-types';

// Import images
import loading from '../../../images/loading.svg';

const LoadingWrapper = ({ pending, children, size }) =>
  pending ? (
    <span className={`loading-icon loading-icon--${size}`}>
      <img className="loading-icon__image" src={loading} alt="Loading Icon" />
    </span>
  ) : (
    children
  );

LoadingWrapper.propTypes = {
  children: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  size: PropTypes.string,
};

LoadingWrapper.defaultProps = {
  size: 'medium',
};

export default LoadingWrapper;
