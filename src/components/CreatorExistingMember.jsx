import React from 'react';

import PositionIcons from './icons/PositionIcons';

import { makeIdNumber } from '../utils';

const CreatorMember = ({id, props}) => {
  const MEMBER = props.admin.members[id];
  const POSITIONS = props.admin.positions;
  const COLOR_NAME = props.admin.colors[MEMBER.colorId].name;

  return (
    <div className="form-member">
      <div className={`color-swatch color-${makeIdNumber(MEMBER.colorId)}`} />
      <div className="info">
        <button className="btn-close" onClick={e => props.unloadMember(e, id)}>×</button>
        <label htmlFor="memberName">Name:</label>
        <input
          type="text"
          name="memberName"
          value={MEMBER.name}
          disabled="true"
        />
        <label htmlFor="memberBirthdate">Birthdate:</label>
        <input
          type="number"
          name="memberBirthdate"
          value={MEMBER.birthdate}
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
          {
            MEMBER.positions.map(posId => (
              <li key={`${MEMBER.name}-${posId}`} className="pill-position">
                <PositionIcons
                  memberId={MEMBER.id}
                  positions={[posId]}
                  iconClass="icon-positions-inline"
                />
                {POSITIONS[posId].name}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default CreatorMember;
