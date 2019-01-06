import React from 'react';
import PropTypes from 'prop-types';

// Import shared components
import { Icon } from '../../common';

const FavoriteIcon = ({ action, className, id, size, state }) => (
  <button
    className={`btn btn-transparent test ${className}`}
    onClick={() => action(id)}
  >
    {state ? (
      <Icon type="heart" color="red" size={size} />
    ) : (
      <Icon type="heart-hollow" color="gray" size={size} />
    )}
  </button>
);

FavoriteIcon.propTypes = {
  action: PropTypes.func.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  size: PropTypes.string,
  state: PropTypes.bool,
};

FavoriteIcon.defaultProps = {
  className: '',
  size: 12,
  state: false,
};

export default FavoriteIcon;
