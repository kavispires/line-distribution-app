import React from 'react';

import PositionIcons from './icons/PositionIcons';

import { getTrueKeys, makeIdNumber } from '../utils';

const CreatorMember = ({ id, props }) => {
  let member;
  let memberPositions;
  if (typeof id === 'string') {
    member = props.admin.members[id];
    memberPositions = member.positions;
  } else {
    member = id;
    memberPositions = getTrueKeys(member.positions);
  }

  const COLOR_NAME = props.admin.colors[member.colorId].name;
  const POSITIONS = props.admin.positions;

  return (
    <div className="form-member">
      <div className={`color-swatch color-${makeIdNumber(member.colorId)}`} />
      <div className="info">
        <label htmlFor="memberName">Name:</label>
        <input
          type="text"
          name="memberName"
          value={member.name}
          disabled="true"
        />
        <label htmlFor="memberBirthdate">Birthdate:</label>
        <input
          type="text"
          name="memberBirthdate"
          value={member.birthdate}
          disabled="true"
        />
        <label htmlFor="memberColor">Color:</label>
        <input
          type="text"
          name="memberColor"
          value={COLOR_NAME}
          disabled="true"
        />
        <label htmlFor="memberPosition">Position:</label>
        <ul className="pill-positions-creator">
          {memberPositions.map(posId => (
            <li key={`${member.id}-${posId}`} className="pill-position">
              <PositionIcons
                memberId={member.id}
                positions={[posId]}
                iconClass="icon-positions-inline"
              />
              {POSITIONS[posId].name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreatorMember;
