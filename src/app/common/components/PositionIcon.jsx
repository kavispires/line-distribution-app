import React from 'react';
import PropTypes from 'prop-types';

// Import utilities
import constants from '../../../utils/constants';
import { bem } from '../../../utils';

const PositionIcon = ({ position, displayName, className }) => {
  const pos = constants.POSITIONS_LIST_ICON[position] || 'unknown';
  const baseClasses = bem('position-icon', [pos]);
  const name =
    typeof displayName === 'boolean'
      ? constants.POSITIONS_DISPLAY_NAME[position] || position
      : displayName;

  const iconComponent = (
    <span
      className={`${baseClasses} ${displayName ? className : ''}`}
      title={`Position: ${name}`}
      data-testid="position-icon"
    />
  );

  if (displayName) {
    return (
      <div
        className={`position-icon-container ${className}`}
        data-testid="position-icon-container"
      >
        {iconComponent}
        <span className="position-icon-name">{name}</span>
      </div>
    );
  }

  return iconComponent;
};

PositionIcon.propTypes = {
  className: PropTypes.string,
  displayName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  position: PropTypes.string.isRequired,
};

PositionIcon.defaultProps = {
  className: '',
  displayName: false,
};

export default PositionIcon;
