import React from 'react';
import PropTypes from 'prop-types';

// Import utility functions
import { parseBirthDate } from '../../utils';
import MemberNationaltyFlag from './MemberNationalityFlag';
import MemberPicture from './MemberPicture';

const MemberCard = ({ member }) => {
  console.log(member);
  return (
    <div className="card">
      <MemberPicture memberId={member.id} />
      <span className="card__color-bar">
        <span
          className={`card__color-bar--main background-${member.color.class}`}
        />
        <span
          className={`card__color-bar--alt background-${member.altColor.class}`}
        />
      </span>
      <h3 className="card__name">{member.name}</h3>
      <p>
        <b>Date of Birth:</b> {parseBirthDate(member.birthdate)}
      </p>
      <p>
        <b>Nationality:</b>{' '}
        <MemberNationaltyFlag nationality={member.nationality} />
      </p>
      <p>
        <b>Avg Official Songs:</b> 0%
      </p>
      <p>
        <b>Avg Custom Songs:</b> 0%
      </p>
      <p>
        <b>Avg All Songs:</b> 0%
      </p>
      <p>
        <b>Positions:</b>
      </p>
      POSITIONS_LIST
    </div>
  );
};

MemberCard.propTypes = {};

MemberCard.defaultProps = {};

export default MemberCard;
