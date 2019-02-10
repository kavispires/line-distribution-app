import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PROFILE_PICTURE_URL } from '../../../../utils/constants';

// Import images
import biasPlaceholder from '../../../../images/bias-placeholder.svg';

class BiasPicture extends Component {
  constructor() {
    super();
    this.state = {};
    this.fallback = () => {
      this.setState({ failed: true });
    };
  }

  render() {
    // If no bias, display placeholder
    if (!Object.keys(this.props.bias).length) {
      return (
        <img
          className="unit-section__bias-placeholder"
          src={biasPlaceholder}
          alt="Bias"
        />
      );
    }

    const pictureUrl = `${process.env.PUBLIC_URL}${PROFILE_PICTURE_URL}${
      this.props.bias.name
    }${this.props.bias.id}.jpg`;

    // If picture is not found
    if (this.state.failed) {
      return (
        <div className="unit-section__bias-no-picture">
          <span>{this.props.bias.name}</span>
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
