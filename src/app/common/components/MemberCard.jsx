import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import Member components
import MemberNationaltyFlag from './member/MemberNationalityFlag';
import MemberPicture from './member/MemberPicture';
import MemberPositions from './member/MemberPositions';
// Import utility functions
import utils from '../../../utils';
import { FavoriteIcon, Icon } from '..';

const MemberCard = ({
  favoriteState,
  member,
  updateFavoriteMembers,
  averages,
  showId,
  showReferenceArtist,
}) => (
  <div className="card">
    {showId && (
      <p className="member-id">
        {member.name.toLowerCase()}
        {member.id}
      </p>
    )}
    <MemberPicture
      className={
        showReferenceArtist ? 'card__profile-full-image' : 'card__profile-image'
      }
      color={member.color}
      gender={member.gender}
      memberId={member.id}
      name={member.name}
    />
    <span className={`card__color-bar background-color-${member.color}`} />
    <h3 className="card__name">
      {member.name}
      <FavoriteIcon
        action={updateFavoriteMembers}
        id={member.id}
        size="20"
        state={favoriteState}
      />
    </h3>
    {showReferenceArtist && (
      <p>
        {member.private && (
          <Icon type="private" color="red" inline title="private" size="18" />
        )}
        <b>From </b> {member.referenceArtists.join(', ')}
      </p>
    )}

    <p>
      <b>Date of Birth:</b> {utils.parseBirthDate(member.birthdate)} (
      {member.age}yo)
    </p>
    <p>
      <b>Nationality: </b>
      <MemberNationaltyFlag nationality={member.nationality} />
    </p>
    {averages && (
      <Fragment>
        <p>
          <b>Avg Official Songs: </b>
          {averages.official}%
        </p>
        <p>
          <b>Avg Custom Songs: </b>
          {averages.custom}%
        </p>
        <p>
          <b>Avg All Songs: </b>
          {averages.all}%
        </p>
      </Fragment>
    )}
    <p>
      <b>Positions:</b>
    </p>
    <MemberPositions memberId={member.id} positions={member.positions} />
  </div>
);

MemberCard.propTypes = {
  averages: PropTypes.oneOfType([PropTypes.object]),
  showId: PropTypes.bool,
  showReferenceArtist: PropTypes.bool,
  favoriteState: PropTypes.bool,
  member: PropTypes.object.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

MemberCard.defaultProps = {
  averages: null,
  showId: false,
  showReferenceArtist: false,
  favoriteState: false,
};

export default MemberCard;
