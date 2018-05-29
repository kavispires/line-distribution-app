import React from 'react';
import PropTypes from 'prop-types';

import CreatorReviewMember from './CreatorReviewMember';

const CreatorReview = ({ props }) => {
  const CREATOR = props.creator;
  const { validation } = CREATOR;

  if (validation.artist !== 'box-checked' || validation.unit !== 'box-checked' || validation.members !== 'box-checked') {
    return (
      <div className="creator-form">
        <h1>Review</h1>
        <h3>You must have all three green validation checkmarks in the bar below to be able to review your new Artist.</h3>
      </div>
    );
  }

  return (
    <div className="creator-form">
      <h1>Review</h1>
      <ul className="creator-review-category">
        <li>Artist Name: <b>{CREATOR.newArtistName}</b></li>
        <li>Artist Other Names: <b>{CREATOR.newArtistOtherNames}</b></li>
        <li>Genre: <b>{CREATOR.newArtistGenre}</b></li>
      </ul>
      <ul className="creator-review-category">
        <li>Unit Name: <b>{CREATOR.newUnitName}</b></li>
        <li>Unit Debut: <b>{CREATOR.newUnitDebutYear}</b></li>
        <li>Is Official? <b>{CREATOR.newUnitOfficial ? 'Yes' : 'No'}</b></li>
      </ul>
      <ul className="creator-review-category-members">
        {
          CREATOR.newUnitMembers.length > 0 && CREATOR.newUnitMembers.map(member => <CreatorReviewMember key={member.id} id={member.id} props={props} />)
        }
        {
          Object.keys(CREATOR.newMembers).length > 0 && Object.keys(CREATOR.newMembers).map(key => <CreatorReviewMember key={key} id={CREATOR.newMembers[key]} props={props} />)
        }
      </ul>
    </div>
  );
};

CreatorReview.propTypes = {
  props: PropTypes.object.isRequired, // eslint-disable-line
};

export default CreatorReview;
