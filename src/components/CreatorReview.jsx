import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const CreatorReview = ({props}) => {
  console.log(props);

  const sortedArtists = _.sortBy(props.admin.artists, ['name']);

  const CREATOR = props.creator;
  const artistDisabled = +CREATOR.loadedArtist !== 0;

  return (
    <form className="creator-form">
      <h1>Review</h1>
    </form>
  );
};

CreatorReview.propTypes = {
  props: PropTypes.object.isRequired, // eslint-disable-line
};

export default CreatorReview;
