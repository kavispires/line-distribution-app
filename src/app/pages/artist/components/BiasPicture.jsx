import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import constants
import constants from '../../../../utils/constants';
// Import images
import biasPlaceholder from '../../../../images/bias-placeholder.svg';
// Import utility functions
import utils from '../../../../utils';

class BiasPicture extends Component {
  constructor() {
    super();
    this.state = {};
    this.fallback = () => {
      this.setState({ failed: true });
    };
  }

  render() {
    const { bias } = this.props;
    // If no bias, display placeholder
    if (!Object.keys(bias).length) {
      return (
        <img
          className="unit-section__bias-placeholder"
          src={biasPlaceholder}
          alt="Bias"
        />
      );
    }

    const pictureUrl = `${process.env.PUBLIC_URL}${
      constants.PROFILE_PICTURE_URL
    }${bias.name}${bias.id}.jpg`;

    // If picture is not found
    if (this.state.failed) {
      return (
        <div
          className={`unit-section__bias-no-picture background-color-${utils.getColorNumber(
            bias.colorId
          )}`}
        >
          <span>{bias.name}</span>
        </div>
      );
    }

    return (
      <img
        className="unit-section__bias-picture"
        src={pictureUrl}
        onError={this.fallback}
        alt="Bias"
      />
    );
  }
}

BiasPicture.propTypes = {
  bias: PropTypes.object.isRequired,
};

BiasPicture.defaultProps = {};

export default BiasPicture;
