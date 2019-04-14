import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import shared components
import { Icon } from '../../common';

let loadYT;
let player;
let animationInterval;
let videoIdCache;

class ActiveVideoWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      currentTime: 0,
      loaded: false,
    };

    this.loadYoutubeVideo = this.loadYoutubeVideo.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.setDimentions = this.setDimentions.bind(this);
    this.resetYT = this.resetYT.bind(this);
  }

  componentDidMount() {
    if (this.props.videoId !== videoIdCache) {
      this.resetYT();
    }
  }

  componentDidUpdate() {
    // Determine player height
    if (!this.state.height && document.getElementById('video-container')) {
      this.setDimentions();
    }
  }

  onPlayerStateChange(e) {
    // If video is playing
    if (e.data === 1) {
      // Lyric Review Animation Interval
      animationInterval = setInterval(() => {
        const currentTime = Math.round(player.getCurrentTime());
        this.setState(() => ({ currentTime }));
      }, 500);
    } else {
      // Kill interval
      clearInterval(animationInterval);
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

  resetYT() {
    loadYT = null;
    player = null;
    clearInterval(animationInterval);
    this.setState(() => ({ loaded: false }));
  }

  loadYoutubeVideo() {
    videoIdCache = this.props.videoId;
    if (!loadYT && this.props.videoId) {
      loadYT = new Promise(resolve => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });

      loadYT.then(YT => {
        player = new YT.Player(this.youtubePlayerAnchor, {
          height: this.state.height || 390,
          width: this.state.width || 640,
          videoId: this.props.videoId,
          events: {
            onStateChange: e => this.onPlayerStateChange(e),
          },
        });
        this.setState(() => ({ loaded: true }));
      });
    }
  }

  render() {
    return (
      <section
        className="active-widget active-widget--quarter active-widget--video"
        id="video-container"
        ref={r => {
          this.youtubePlayerAnchor = r;
        }}
      >
        <button
          className="btn-invisbible"
          onClick={() => this.loadYoutubeVideo()}
        >
          <Icon type="youtube" color="white" size="72" />
        </button>
      </section>
    );
  }
}

ActiveVideoWidget.propTypes = {
  videoId: PropTypes.string.isRequired,
};

ActiveVideoWidget.defaultProps = {};

export default ActiveVideoWidget;
