import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

// Import common components
import { Icon } from '../../common';

class ActiveVideoWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };

    this.setDimentions = this.setDimentions.bind(this);
  }

  componentDidUpdate() {
    // Determine player height
    if (!this.state.height && document.getElementById('video-container')) {
      this.setDimentions();
    }
  }

  setDimentions() {
    let width = document.getElementById('video-container').clientWidth;
    let height = document.getElementById('video-container').clientHeight;
    if (width > height) {
      width = (16 * height) / 9;
    } else {
      height = (9 * width) / 16;
    }

    this.setState(() => ({ width, height }));
  }

  render() {
    const opts = {
      height: this.state.height,
      width: this.state.width,
    };

    const hasVideoClass = this.props.videoId
      ? ''
      : 'active-widget__video--placeholder';

    return (
      <section
        className={`active-widget active-widget--quarter active-widget__video ${hasVideoClass}`}
        id="video-container"
      >
        {this.props.videoId ? (
          <YouTube videoId={this.props.videoId} opts={opts} />
        ) : (
          <Icon type="youtube" color="white" size="72" />
        )}
      </section>
    );
  }
}

ActiveVideoWidget.propTypes = {
  videoId: PropTypes.string.isRequired,
};

ActiveVideoWidget.defaultProps = {};

export default ActiveVideoWidget;
