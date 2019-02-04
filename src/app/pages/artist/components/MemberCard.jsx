import React from 'react';
import PropTypes from 'prop-types';

// Import Member components
import MemberNationaltyFlag from './MemberNationalityFlag';
import MemberPicture from './MemberPicture';
// Import utility functions
import utils from '../../../../utils';
import { FavoriteIcon } from '../../../../app/common';

const MemberCard = ({ favoriteState, member, updateFavoriteMembers }) => {
  // TO-DO: Avg logic
  console.log(member);
  return (
    <div className="card">
      <MemberPicture
        gender={member.gender}
        memberId={member.id}
        name={member.name}
      />
      {/* <FavoriteIcon
        action={this.props.updateFavoriteArtists}
        id={entry.id}
        size="12"
        state={user.favoriteArtists && user.favoriteArtists[entry.id]}
      /> */}
      <span className="card__color-bar">
        <span
          className={`card__color-bar--main background-color-${
            member.color.number
          }`}
        />
        <span
          className={`card__color-bar--alt background-color-${
            member.altColor.number
          }`}
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

MemberCard.propTypes = {
  favoriteState: PropTypes.bool,
  member: PropTypes.object.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

MemberCard.defaultProps = {
  favoriteState: false,
};

export default MemberCard;
