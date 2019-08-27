import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import constants
import constants from '../../../../utils/constants';
// Import images
import biasChoose from '../../../../images/bias-choose.svg';
import loading from '../../../../images/loading.svg';

class Bias extends Component {
  constructor() {
    super();
    this.state = {
      isHovering: false,
      bias: null,
      fetchPictureFailed: false,
    };
    this.fallback = () => {
      this.setState({ fetchPictureFailed: true });
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  componentDidMount() {
    this.setBiasId();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.userBiases[this.props.artistId] !==
      this.props.userBiases[this.props.artistId]
    ) {
      this.setBiasId();
    }
  }

  setBiasId() {
    const biasId = this.props.userBiases[this.props.artistId];
    if (biasId) {
      const bias = _.find(this.props.members, { id: biasId });

      this.setState({
        bias,
        biasPictureUrl: `${process.env.PUBLIC_URL}${
          constants.PROFILE_PICTURE_URL
        }${bias.name.toLowerCase()}${bias.id}.jpg`,
      });
    }
  }

  handleMouseOver() {
    this.setState({
      isHovering: !this.state.isHovering,
    });
  }

  render() {
    const { artistId, members, isPending, updateBias } = this.props;

    if (isPending) {
      return (
        <div className="artist-page-bias">
          <img
            className="bias-icon-picture__loading-icon"
            src={loading}
            alt="Loading Icon"
          />
        </div>
      );
    }

    const placeholderComponent = (
      <img
        className={`bias-icon-placeholder ${
          this.state.isHovering ? 'bias-icon-placeholder--hover' : ''
        }`}
        src={biasChoose}
        alt="Choose your bias"
      />
    );

    const pictureComponent =
      // If picture is not found
      this.state.fetchPictureFailed ? (
        <div
          className={`bias-icon-picture__no-image background-color-${this.state.bias.color}`}
        >
          <span>{this.state.bias.name}</span>
        </div>
      ) : (
        <img
          className="bias-icon-picture__image"
          src={this.state.biasPictureUrl}
          onError={this.fallback}
          alt="Bias"
        />
      );

    return (
      <div
        className="artist-page-bias"
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOver}
      >
        {this.state.bias ? (
          <div className="bias-icon-picture">{pictureComponent}</div>
        ) : (
          placeholderComponent
        )}

        {/* Select members as bias on hover */
        this.state.isHovering ? (
          <div className="bias-hover">
            Choose your bias for this artist:
            <br />
            <div className="bias-hover-buttons">
              {members.map(member => (
                <button
                  key={`b-h-b-${member.id}`}
                  className={`bias-hover-button background-color-${member.color}`}
                  onClick={() => updateBias(member.id, artistId)}
                >
                  {member.name}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Bias.propTypes = {
  artistId: PropTypes.string,
  isPending: PropTypes.bool,
  members: PropTypes.array,
  updateBias: PropTypes.func.isRequired,
  userBiases: PropTypes.object,
};

Bias.defaultProps = {
  artistId: '',
  isPending: false,
  members: [],
  userBiases: {},
};

export default Bias;
