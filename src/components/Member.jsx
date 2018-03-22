import React from 'react';

import PositionIcons from './icons/PositionIcons';
import { parseBirthDate } from '../utils';

const Member = ({ memberId, props }) => {
  const { app, database } = props;
  const MEMBER = database.members[memberId];
  const { colorId, birthdate, altColorId } = MEMBER;
  const POSITIONS = MEMBER.positions.map(pos => database.positions[pos]);
  let average = 0;
  let averageOfficial = 0;
  if (app.distributionPerMember[memberId]) {
    average = Math.round((app.distributionPerMember[memberId] * 100) / app.distributionTotal);
  }
  if (app.distributionPerMemberOfficial[memberId]) {
    averageOfficial = Math.round((app.distributionPerMemberOfficial[memberId] * 100) / app.distributionTotalOfficial);
  }

  return (
    <section className="pill">
      <p className="pill-name">{MEMBER.name}</p>
      <span className="pill-color-bar">
        <span className={`pill-color-main color-${colorId}`} />
        <span className={`pill-color-alt color-${altColorId}`} />
      </span>
      <p><b>Date of Birth:</b> {parseBirthDate(birthdate)}</p>
      <p><b>Average per Official Song:</b> {averageOfficial}%</p>
      <p><b>Total Average per Song:</b> {average}%</p>
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
