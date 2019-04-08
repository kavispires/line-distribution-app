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
  children: PropTypes.object.isRequired,
  pending: PropTypes.bool,
  size: PropTypes.string,
};

LoadingWrapper.defaultProps = {
  pending: false,
  size: 'medium',
};

export default LoadingWrapper;
