import React from 'react';
import PropTypes from 'prop-types';

const DistributedSongPreview = ({ rates, members }) => (
  <div className="distribution-rates-preview__container">
    {members.map(member => {
      const allRate = rates.ALL || 0;
      const noneRate = rates.NONE || 0;
      const percentage =
        (100 * rates[member.id]) / (rates.total - allRate - noneRate);

      const spanWidth = {
        width: `${percentage}%`,
      };

      return (
        <span
          key={`bar-${member.id}-${percentage}`}
          className={`distribution-rates-preview__bar background-color-${member.color}`}
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
  members: PropTypes.array.isRequired,
};

DistributedSongPreview.defaultProps = {};

export default DistributedSongPreview;
