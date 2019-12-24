import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import Member components
import MemberNationalityFlag from './MemberNationalityFlag';
import MemberPicture from './member/MemberPicture';
import MemberPositions from './member/MemberPositions';
import MemberTags from './member/MemberTags';
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
  editMember,
}) => (
  <div className="card">
    {showId && (
      <p className="member-id">
        {member.name.toLowerCase()}
        {member.id}
      </p>
    )}
    <div className="position-relative">
      <MemberPicture
        className={`card__profile-image ${
          !showReferenceArtist ? 'card__profile-image--crop' : ''
        }`}
        color={member.color}
        gender={member.gender}
        memberId={member.id}
        name={member.name}
      />
      {Boolean(editMember) && (
        <button
          className="btn-invisible card__edit-member-button"
          onClick={() => editMember(member)}
        >
          <Icon type="edit-box" />
        </button>
      )}
    </div>

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
        <b>From </b> {member.referenceArtists.map(ra => ra.name).join(', ')}
      </p>
    )}

    <p>
      <b>Date of Birth:</b> {utils.parseBirthDate(member.birthdate)} (
      {member.age}yo)
    </p>
    <p>
      <b>Nationality: </b>
      <MemberNationalityFlag
        nationality={member.nationality}
        className="card__flag"
      />
    </p>
    {averages && (
      <Fragment>
        <p className="card__average">
          <b>Avg Official Songs: </b>
          {averages.official}%
        </p>
        <p className="card__average">
          <b>Avg Custom Songs: </b>
          {averages.custom}%
        </p>
        <p className="card__average">
          <b>Avg All Songs: </b>
          {averages.all}%
        </p>
      </Fragment>
    )}
    <p>
      <b>Positions:</b>
    </p>
    <MemberPositions memberId={member.id} positions={member.positions} />
    <MemberTags tags={member.tags} memberId={member.id} color={member.color} />
  </div>
);

MemberCard.propTypes = {
  averages: PropTypes.oneOfType([PropTypes.object]),
  showId: PropTypes.bool,
  showReferenceArtist: PropTypes.bool,
  favoriteState: PropTypes.bool,
  member: PropTypes.object.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
  editMember: PropTypes.func,
};

MemberCard.defaultProps = {
  averages: null,
  showId: false,
  showReferenceArtist: false,
  favoriteState: false,
  editMember: null,
};

export default MemberCard;
