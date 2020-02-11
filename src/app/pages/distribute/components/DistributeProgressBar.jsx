import React from 'react';
import PropTypes from 'prop-types';

const DistributeProgressBar = ({
  active,
  color,
  duration,
  name,
  percentage,
}) => {
  const widthStyle = {
    width: `${percentage}%`,
    transition: '0.1s',
  };

  return (
    <div className="distribute-progress-bar">
      <div
        className={`distribute-progress-bar__name foreground-color-${color}`}
      >
        {name}
      </div>
      <div className="distribute-progress-bar__progress">
        <span
          className={`distribute-progress-bar__bar background-color-${color}`}
          style={widthStyle}
        />
      </div>
      {active ? (
        <div
          className={`distribute-progress-bar__active-icon background-color-${color}`}
        />
      ) : (
        <div className="distribute-progress-bar__duration">
          {duration.toFixed(1)}s
        </div>
      )}
    </div>
  );
};

DistributeProgressBar.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  color: PropTypes.number,
  duration: PropTypes.number,
  percentage: PropTypes.number,
};

DistributeProgressBar.defaultProps = {
  active: false,
  name: 'Bob',
  color: 1,
  duration: 15.4,
  percentage: 40,
};

export default DistributeProgressBar;
