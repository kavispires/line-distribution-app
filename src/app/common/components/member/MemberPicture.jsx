import React, { Component } from 'react';
import PropTypes from 'prop-types';
import constants from '../../../../utils/constants';
import utils from '../../../../utils';

class MemberPicture extends Component {
  constructor() {
    super();
    this.state = {};
    this.fallback = () => {
      this.setState({ failed: true });
    };
  }

  render() {
    const { className, colorId, gender, memberId, name } = this.props;

    const pictureUrl = `${process.env.PUBLIC_URL}${
      constants.PROFILE_PICTURE_URL
    }${name.toLowerCase()}${memberId}.jpg`;

    const GENDER_ENUM = gender === 'FEMALE' ? 'f' : 'm';

    const colorNumber = utils.getColorNumber(colorId);
    const profilePlaceholderCode = (colorNumber % 5) + 1;

    const pictureFallback = `${process.env.PUBLIC_URL}${
      constants.PROFILE_PICTURE_URL
    }profile-${GENDER_ENUM}-${profilePlaceholderCode}.png`;

    if (this.state.failed) {
      console.log(`Missing Member Picture: ${name.toLowerCase()}${memberId}`); // eslint-disable-line
      return (
        <img
          className={`${className} background-color-${colorNumber}`}
          src={pictureFallback}
          alt="Member"
        />
      );
    }
    return (
      <img
        className={className}
        src={pictureUrl}
        onError={this.fallback}
        alt="Member"
      />
    );
  }
}

MemberPicture.propTypes = {
  className: PropTypes.string,
  colorId: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  memberId: PropTypes.string.isRequired,
  name: PropTypes.string,
};

MemberPicture.defaultProps = {
  className: 'card__profile-image',
  name: 'Unkown',
};

export default MemberPicture;
