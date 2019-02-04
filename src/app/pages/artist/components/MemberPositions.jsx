import React from 'react';
import PropTypes from 'prop-types';

// Import utility functions
import { FavoriteIcon } from '../../../../app/common';
import utils from '../../../../utils';

const MemberPositions = ({ memberId, positions }) => {
  // Sort positions by importance

  const sortedPositions = [];

  const positionPriority = {
    LEADER: 0,
    MAIN_VOCALIST: 1,
    MAIN_RAPPER: 2,
    MAIN_DANCER: 3,
    LEAD_VOCALIST: 4,
    LEAD_RAPPER: 5,
    LEAD_DANCER: 6,
    VOCALIST: 7,
    RAPPER: 8,
    DANCER: 9,
    CENTER: 10,
    VISUAL: 11,
    MAKNAE: 12,
  };

  positions.forEach(position => {
    sortedPositions[positionPriority[position]] = position;
  });

  return (
    <ul className="card__positions">
      {sortedPositions.map(position => (
        <li key={`${memberId}-${position}`} className="card__position">
          {utils.humanize(position, 'Capital')}
        </li>
      ))}
    </ul>
  );
};

MemberPositions.propTypes = {
  memberId: PropTypes.string.isRequired,
  positions: PropTypes.array.isRequired,
};

export default MemberPositions;
