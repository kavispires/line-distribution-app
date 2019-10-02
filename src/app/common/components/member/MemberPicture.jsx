import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import contants
import constants from '../../../../utils/constants';

const loggedMissingPictures = {};

class MemberPicture extends Component {
  constructor() {
    super();
    this.state = {};
    this.fallback = () => {
      this.setState({ failed: true });
    };
  }

  render() {
    const { className, color, gender, memberId, name } = this.props;

    const pictureUrl = `${process.env.PUBLIC_URL}${
      constants.PROFILE_PICTURE_URL
    }${name.toLowerCase()}${memberId}.jpg`;

    const genderSuffix = gender === 'FEMALE' ? 'f' : 'm';

    const profilePlaceholderCode = (color % 5) + 1;

    const pictureFallback = `${process.env.PUBLIC_URL}${constants.PROFILE_PICTURE_URL}profile-${genderSuffix}-${profilePlaceholderCode}.png`;

    if (this.state.failed) {
      if (loggedMissingPictures[memberId] === undefined) {
        console.log(`Missing Member Picture: ${name.toLowerCase()}${memberId}`); // eslint-disable-line
        loggedMissingPictures[memberId] = true;
      }

      return (
        <img
          className={`${className} background-color-${color}`}
          src={pictureFallback}
          alt="Member"
        />
      );
    }
    return (
      <LazyLoadImage
        className={className}
        src={pictureUrl}
        onError={this.fallback}
        alt={`Member: ${name}`}
      />
    );
  }
}

MemberPicture.propTypes = {
  className: PropTypes.string,
  color: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  memberId: PropTypes.string.isRequired,
  name: PropTypes.string,
};

MemberPicture.defaultProps = {
  className: 'card__profile-image',
  name: 'Unkown',
};

export default MemberPicture;
