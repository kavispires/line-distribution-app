import React from 'react';

import PositionIcons from './icons/PositionIcons';
import { parseBirthDate } from '../utils';

const Member = ({ memberId, props }) => {
  const { database } = props;
  const MEMBER = database.members[memberId];
  const { colorId, birthdate } = MEMBER;
  const POSITIONS = MEMBER.positions.map(pos => database.positions[pos]);

  return (
    <section className="pill">
      <p className="pill-name">{MEMBER.name}</p>
      <span className={`pill-color-bar color-${colorId}`} />
      <p><b>Date of Birth:</b> {parseBirthDate(birthdate)}</p>
      <p><b>Average Per Song:</b> 0%</p>
      <p><b>Positions:</b></p>
      <ul className="pill-positions">
        {
          POSITIONS.map(pos => (
            <li key={`${MEMBER.name}-${pos.name}`} className="pill-position">
              <PositionIcons positions={[pos.id]} memberId={MEMBER.id} iconClass="pill-icon" /> {pos.name}
            </li>
          ))
        }
      </ul>
    </section>
  );
};

export default Member;