import React from 'react';
import PropTypes from 'prop-types';

// Import shared components
import SyncInstructions from './SyncInstructions';
import SyncLyrics from './SyncLyrics';
import SyncDistribution from './SyncDistribution';
import SyncVerify from './SyncVerify';

let loadYT;
let player;
let animationInterval;

class SyncMain extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 0,
      currentTime: 0,
    };
  }

  componentDidMount() {
    const { props } = this.props;

    // Unlock Lyrics when component is mounted
    props.setIsLyricsLocked(false);

    const width = document.getElementById('video-container').clientWidth;
    const height = (9 * width) / 16;

    this.setHeight(height);

    if (!loadYT) {
      loadYT = new Promise(resolve => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    }
    loadYT.then(YT => {
      player = new YT.Player(this.youtubePlayerAnchor, {
        height: height || 390,
        width: width || 640,
        videoId: props.sync.videoId,
        events: {
          onStateChange: e => this.onPlayerStateChange(e, props),
        },
      });
    });

    if (props.location.pathname === '/admin/sync') {
      window.addEventListener('keydown', e => props.handleKeydown(e, player));
      window.addEventListener('keyup', e => props.handleKeyup(e, player));
    }
  }

  onPlayerStateChange(e) {
    // If video is playing
    if (e.data === 1 && this.props.props.sync.step === 5) {
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

  setHeight(height) {
    this.setState(() => ({ height }));
  }

  render() {
    const { props } = this.props;
    const SYNC = props.sync;

    return (
      <main className="container container-sync" id="container-sync">
        <h1>Sync</h1>
        <div className="sync-grid-group-main">
          <SyncInstructions step={SYNC.step} />
          <section
            className="sync-grid-video"
            id="video-container"
            ref={r => {
              this.youtubePlayerAnchor = r;
            }}
          />
          {SYNC.step === 3 ? (
            <SyncLyrics player={player} props={props} />
          ) : null}
          {SYNC.step === 4 ? (
            <SyncDistribution
              player={player}
              props={props}
              playerHeight={this.state.height}
            />
          ) : null}
          {SYNC.step === 5 ? (
            <SyncVerify
              player={player}
              props={props}
              playerHeight={this.state.height}
              currentTime={this.state.currentTime}
            />
          ) : null}
        </div>
      </main>
    );
  }
}

SyncMain.propTypes = {
  props: PropTypes.object.isRequired,
  sync: PropTypes.object.isRequired,
  step: PropTypes.number.isRequired,
};

export default SyncMain;
