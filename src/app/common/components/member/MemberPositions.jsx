import React from 'react';
import PropTypes from 'prop-types';

// Import position icons
import iconLeader from '../../../../images/icon-leader.svg';
import iconMainVocalist from '../../../../images/icon-main-vocalist.svg';
import iconMainRapper from '../../../../images/icon-main-rapper.svg';
import iconMainDancer from '../../../../images/icon-main-dancer.svg';
import iconLeadVocalist from '../../../../images/icon-lead-vocalist.svg';
import iconLeadRapper from '../../../../images/icon-lead-rapper.svg';
import iconLeadDancer from '../../../../images/icon-lead-dancer.svg';
import iconVocalist from '../../../../images/icon-vocalist.svg';
import iconDancer from '../../../../images/icon-dancer.svg';
import iconRapper from '../../../../images/icon-rapper.svg';
import iconCenter from '../../../../images/icon-center.svg';
import iconVisual from '../../../../images/icon-visual.svg';
import iconMaknae from '../../../../images/icon-maknae.svg';
// Import utility functions
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

  const iconBank = {
    LEADER: iconLeader,
    MAIN_VOCALIST: iconMainVocalist,
    MAIN_RAPPER: iconMainRapper,
    MAIN_DANCER: iconMainDancer,
    LEAD_VOCALIST: iconLeadVocalist,
    LEAD_RAPPER: iconLeadRapper,
    LEAD_DANCER: iconLeadDancer,
    VOCALIST: iconVocalist,
    RAPPER: iconDancer,
    DANCER: iconRapper,
    CENTER: iconCenter,
    VISUAL: iconVisual,
    MAKNAE: iconMaknae,
  };

  return (
    <ul className="card__positions">
      {sortedPositions.map(position => {
        const positionName = utils.humanize(position, 'Capital');
        return (
          <li key={`${memberId}-${position}`} className="card__position">
            <img
              className="card__position-icon"
              src={iconBank[position]}
              alt={`Position: ${positionName}`}
              title={position}
            />
            {positionName}
          </li>
        );
      })}
    </ul>
  );
};

MemberPositions.propTypes = {
  memberId: PropTypes.string.isRequired,
  positions: PropTypes.array.isRequired,
};

export default MemberPositions;
