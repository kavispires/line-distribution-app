import React from 'react';
import PropTypes from 'prop-types';

import PositionIcons from './icons/PositionIcons';
import { parseBirthDate } from '../utils';

const Member = ({ member, props }) => {
  const ARTISTS = props.artists;
  // Calculate averages
  let average = 0;
  let averageOfficial = 0;
  if (ARTISTS.distributionPerMember[member.id]) {
    average = Math.round((ARTISTS.distributionPerMember[member.id] * 100) / ARTISTS.distributionTotal);
  }
  if (ARTISTS.distributionPerMemberOfficial[member.id]) {
    averageOfficial = Math.round((ARTISTS.distributionPerMemberOfficial[member.id] * 100) / ARTISTS.distributionTotalOfficial);
  }

  return (
    <section className="pill">
      <p className="pill-name">{member.name}</p>
      <span className="pill-color-bar">
        <span className={`pill-color-main ${member.color.class}`} />
        <span className={`pill-color-alt ${member.altColor.class}`} />
      </span>
      <p><b>Date of Birth:</b> {parseBirthDate(member.birthdate)}</p>
      <p><b>Average per Official Song:</b> {averageOfficial}%</p>
      <p><b>Total Average per Song:</b> {average}%</p>
      <p><b>Positions:</b></p>
      <ul className="pill-positions">
        {
          member.positions.map(position => (
            <li key={`${member.name}-${position.name}`} className="pill-position">
              <PositionIcons positions={[position.id]} memberId={member.id} iconClass="pill-icon" /> {position.name}
            </li>
          ))
        }
      </ul>
    </section>
  );
};

Member.propTypes = {
  props: PropTypes.object.isRequired, // eslint-disable-line
  artists: PropTypes.object.isRequired, // eslint-disable-line
  member: PropTypes.object.isRequired, // eslint-disable-line
  results: PropTypes.object.isRequired, // eslint-disable-line
};


export default Member;
