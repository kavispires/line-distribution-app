import React from 'react';
import PropTypes from 'prop-types';

const DistributeProgressBar = ({
  active,
  colorNumber,
  duration,
  name,
  percentage,
}) => {
  const widthStyle = {
    width: `${percentage}%`,
  };

  // if (active) {
  //   console.log({
  //     colorNumber,
  //     duration,
  //     name,
  //     percentage,
  //   });
  // }
  return (
    <div className="distribute-progress-bar">
      <div
        className={`distribute-progress-bar__name foreground-color-${colorNumber}`}
      >
        {name}
      </div>
      <div className="distribute-progress-bar__progress">
        <span
          className={`distribute-progress-bar__bar background-color-${colorNumber}`}
          style={widthStyle}
        />
      </div>
      <div
        className={`distribute-progress-bar__active-icon--${
          active ? 'on' : 'off'
        }`}
      />
      <div className="distribute-progress-bar__duration">
        {duration.toFixed(1)}s
      </div>
    </div>
  );
};

DistributeProgressBar.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  colorNumber: PropTypes.number,
  duration: PropTypes.number,
  percentage: PropTypes.number,
};

DistributeProgressBar.defaultProps = {
  active: false,
  name: 'Bob',
  colorNumber: 1,
  duration: 15.4,
  percentage: 40,
};

export default DistributeProgressBar;
