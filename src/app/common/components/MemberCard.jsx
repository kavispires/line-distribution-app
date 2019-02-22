import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import Member components
import MemberNationaltyFlag from './member/MemberNationalityFlag';
import MemberPicture from './member/MemberPicture';
import MemberPositions from './member/MemberPositions';
// Import utility functions
import utils from '../../../utils';
import { FavoriteIcon } from '..';

const MemberCard = ({
  favoriteState,
  member,
  updateFavoriteMembers,
  averages,
  displayId,
}) => (
  <div className="card">
    {displayId ? <p className="member-id">{}</p> : null}
    <MemberPicture
      colorId={member.colorId}
      gender={member.gender}
      memberId={member.id}
      name={member.name}
    />
    <span className="card__color-bar">
      <span
        className={`card__color-bar--main background-color-${utils.getColorNumber(
          member.colorId
        )}`}
      />
      <span
        className={`card__color-bar--alt background-color-${utils.getColorNumber(
          member.altColorId
        )}`}
      />
    </span>
    <h3 className="card__name">
      {member.name}
      <FavoriteIcon
        action={updateFavoriteMembers}
        id={member.id}
        size="20"
        state={favoriteState}
      />
    </h3>
    <p>
      <b>Date of Birth:</b> {utils.parseBirthDate(member.birthdate)}
    </p>
    <p>
      <b>Nationality:</b>{' '}
      <MemberNationaltyFlag nationality={member.nationality} />
    </p>
    {averages ? (
      <Fragment>
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
      </Fragment>
    ) : null}

    <MemberPositions memberID={member.memberId} positions={member.positions} />
  </div>
);

MemberCard.propTypes = {
  averages: PropTypes.oneOfType(PropTypes.object, null),
  displayId: PropTypes.bool,
  favoriteState: PropTypes.bool,
  member: PropTypes.object.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

MemberCard.defaultProps = {
  averages: null,
  displayId: false,
  favoriteState: false,
};

export default MemberCard;
