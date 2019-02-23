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
    const pictureUrl = `${process.env.PUBLIC_URL}${
      constants.PROFILE_PICTURE_URL
    }${this.props.name}${this.props.memberId}.jpg`;

    const gender = this.props.gender === 'FEMALE' ? 'f' : 'm';

    const colorNumber = utils.getColorNumber(this.props.colorId);
    const profilePlaceholderCode = (colorNumber % 5) + 1;

    const pictureFallback = `${process.env.PUBLIC_URL}${
      constants.PROFILE_PICTURE_URL
    }profile-${gender}-${profilePlaceholderCode}.png`;

    if (this.state.failed) {
      return (
        <img
          className={`${this.props.className} background-color-${colorNumber}`}
          src={pictureFallback}
          alt="Member"
        />
      );
    }
    return (
      <img
        className={this.props.className}
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
