import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PROFILE_PICTURE_URL } from '../../constants';

class MemberPicture extends Component {
  constructor() {
    super();
    this.state = {};
    this.fallback = () => {
      this.setState({ failed: true });
    };
  }

  render() {
    const pictureUrl = `${process.env.PUBLIC_URL}${PROFILE_PICTURE_URL}${
      this.props.memberId
    }.jpg`;

    const pictureFallback = `${
      process.env.PUBLIC_URL
    }${PROFILE_PICTURE_URL}profile${Math.floor(Math.random() * 5) + 1}.jpg`;

    if (this.state.failed) {
      return (
        <img
          className={this.props.className}
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
  memberId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

MemberPicture.defaultProps = {
  className: 'card__profile-image',
};

export default MemberPicture;
