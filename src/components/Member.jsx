import React from 'react';
import PropTypes from 'prop-types';

import PositionIcons from './icons/PositionIcons';
import { parseBirthDate } from '../utils';
import MemberProfile from './MemberProfile';

const Member = ({ member, props }) => {
  const ARTISTS = props.artists;
  // Calculate averages
  let average = 0;
  let averageOfficial = 0;
  let averageWould = 0;
  if (ARTISTS.distributionPerMember[member.id]) {
    average = Math.round(
      (ARTISTS.distributionPerMember[member.id] * 100) /
        ARTISTS.distributionTotal
    );
  }
  if (ARTISTS.distributionPerMemberOfficial[member.id]) {
    averageOfficial = Math.round(
      (ARTISTS.distributionPerMemberOfficial[member.id] * 100) /
        ARTISTS.distributionTotalOfficial
    );
  }
  if (ARTISTS.distributionPerMemberWould[member.id]) {
    averageWould = Math.round(
      (ARTISTS.distributionPerMemberWould[member.id] * 100) /
        ARTISTS.distributionTotalWould
    );
  }

  return (
    <section className="pill">
      {member.id}
      <MemberProfile memberId={member.id} />
      <span className="pill-color-bar">
        <span className={`pill-color-main ${member.color.class}`} />
        <span className={`pill-color-alt ${member.altColor.class}`} />
      </span>
      <h3 className="pill-name">{member.name}</h3>
      <p>
        <b>Date of Birth:</b> {parseBirthDate(member.birthdate)}
      </p>
      <p>
        <b>Avg Official Song:</b> {averageOfficial}%
      </p>
      <p>
        <b>Avg Custom Song:</b> {averageWould}%
      </p>
      <p>
        <b>Avg Total:</b> {average}%
      </p>
      <p>
        <b>Positions:</b>
      </p>
      <ul className="pill-positions">
        {member.positions.map(position => (
          <li key={`${member.name}-${position.name}`} className="pill-position">
            <PositionIcons
              positions={[position.id]}
              memberId={member.id}
              iconClass="pill-icon"
            />{' '}
            {position.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

Member.propTypes = {
  props: PropTypes.object.isRequired,
  artists: PropTypes.object,
  member: PropTypes.object.isRequired,
};

export default Member;
