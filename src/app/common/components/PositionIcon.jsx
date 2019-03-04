import React from 'react';
import PropTypes from 'prop-types';

// Import position icons
import iconLeader from '../../../images/icon-leader.svg';
import iconMainVocalist from '../../../images/icon-main-vocalist.svg';
import iconMainRapper from '../../../images/icon-main-rapper.svg';
import iconMainDancer from '../../../images/icon-main-dancer.svg';
import iconLeadVocalist from '../../../images/icon-lead-vocalist.svg';
import iconLeadRapper from '../../../images/icon-lead-rapper.svg';
import iconLeadDancer from '../../../images/icon-lead-dancer.svg';
import iconVocalist from '../../../images/icon-vocalist.svg';
import iconDancer from '../../../images/icon-dancer.svg';
import iconRapper from '../../../images/icon-rapper.svg';
import iconCenter from '../../../images/icon-center.svg';
import iconVisual from '../../../images/icon-visual.svg';
import iconMaknae from '../../../images/icon-maknae.svg';
import iconAll from '../../../images/icon-all.svg';

const PositionIcon = ({ className, position }) => {
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
    ALL: iconAll,
  };

  return (
    <span className={className}>
      <img
        className="position-icon"
        src={iconBank[position]}
        alt={`Position: ${position}`}
        title={position}
      />
    </span>
  );
};

PositionIcon.propTypes = {
  className: PropTypes.string,
  position: PropTypes.string.isRequired,
};

PositionIcon.defaultProps = {
  className: 'position-icon-container--inline',
};

export default PositionIcon;
