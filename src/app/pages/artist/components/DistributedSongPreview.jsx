import React from 'react';
import PropTypes from 'prop-types';

const DistributedSongPreview = ({ rates, members }) => (
  <div className="distribution-rates-preview__container">
    {Object.keys(members).map(memberId => {
      const percentage = (100 * rates[memberId]) / (rates.total - rates.ALL);

      const spanWidth = {
        width: `${percentage}%`,
      };

      return (
        <span
          key={`bar-${memberId}-${percentage}`}
          className={`distribution-rates-preview__bar background-color-${
            members[memberId].color.number
          }`}
          style={spanWidth}
        >
          {percentage.toFixed(1)}%
        </span>
      );
    })}
  </div>
);

DistributedSongPreview.propTypes = {
  rates: PropTypes.object.isRequired,
  members: PropTypes.object.isRequired,
};

DistributedSongPreview.defaultProps = {};

export default DistributedSongPreview;
