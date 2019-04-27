import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

// Import shared components
import { ActiveSong, ActiveUnit } from '../../../common';

// Import utility functions
import utils from '../../../../utils';
import DistributeProgressBar from './DistributeProgressBar';

let player = null;
let animationInterval;
// let membersProgress = {};

const INTERVAL = 1000;

class DistributeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      height: 0,
      isPlaying: false,
      isReady: false,
      members: {},
      activeCache: {},
      membersProgress: {},
    };

    this.setDimentions = this.setDimentions.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  componentDidMount() {
    // Determine player height
    if (!this.state.height && document.getElementById('video-container-view')) {
      this.setDimentions();
    }

    this.setMembers();
  }

  onReady(e) {
    player = e.target;
    this.setState({ isReady: true });
  }

  onPlay(e) {
    console.log('PLAY', e);
    this.setState({ isPlaying: true });
  }

  onPause(e) {
    console.log('PAUSE', e);
    this.setState({ isPlaying: false });
  }

  onEnd(e) {
    console.log('END', e);
    this.setState({ isPlaying: false });
  }

  onStateChange(e) {
    console.log('STATE', e);

    // If video is playing
    if (e.data === 1) {
      // Lyric Review Animation Interval
      animationInterval = setInterval(() => {
        const currentTime = Math.round(e.target.getCurrentTime());
        this.setState({ currentTime });
        // this.calculateBars(currentTime);
      }, INTERVAL);
    } else {
      // Kill interval
      clearInterval(animationInterval);
    }
  }

  setDimentions() {
    let width = document.getElementById('video-container-view').clientWidth;
    let height = document.getElementById('video-container-view').clientHeight;
    if (width > height) {
      width = (16 * height) / 9;
    } else {
      height = (9 * width) / 16;
    }

    this.setState(() => ({ width, height }));
  }

  setMembers() {
    const { members } = this.props;

    const membersState = {};
    Object.values(members).forEach(member => {
      membersState[member.id] = {
        id: member.id,
        name: member.name,
        colorNumber: member.color.number || 0,
        percentage: 0,
        duration: 0,
        active: false,
      };
    });

    this.setState({ membersProgress: membersState });
  }

  calculateBars(timestamp) {
    const { timestampsDict, rates } = this.props;
    let activeCache = { ...this.state.activeCache };
    const membersProgress = { ...this.state.membersProgress };

    const distributionTotals = {};

    const currentDPS = timestampsDict[timestamp];

    if (currentDPS) {
      // Encache
      if (currentDPS.start) {
        activeCache = { ...activeCache, ...currentDPS.start };
      }

      // Decache
      if (currentDPS.stop) {
        Object.entries(currentDPS.stop).forEach(([id, total]) => {
          distributionTotals[id] = total;
          delete activeCache[id];
        });
      }

      Object.keys(membersProgress).forEach(memberId => {
        const currentMember = membersProgress[memberId];
        if (activeCache[memberId]) {
          currentMember.active = true;
          currentMember.duration += INTERVAL / 1000;
          currentMember.percentage =
            (100 * membersProgress[memberId].duration) / rates.max;
        } else {
          currentMember.active = false;
          currentMember.duration +=
            distributionTotals[memberId] || currentMember.duration;
          currentMember.percentage = (100 * currentMember.duration) / rates.max;
        }
      });

      this.setState(() => ({
        activeCache,
        distributionTotals,
        membersProgress,
      }));
    }
  }

  togglePlayPause() {
    if (this.state.isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  restartVideo() {
    player.seekTo(0);
    player.playVideo();
  }

  rewindFastforward(direction) {
    if (direction === '+') {
      player.seekTo(player.getCurrentTime() + 10);
    } else {
      player.seekTo(player.getCurrentTime() - 10);
    }
  }

  render() {
    const { activeSong, activeUnit } = this.props;

    // Youtube Player options
    const opts = {
      height: this.state.height,
      width: this.state.width,
    };

    // const getVideoFloatSize = members => {
    //   const size = Object.keys(members).length;
    //   if (size <= 6) return 'small';
    //   if (size > 12) return 'large';
    //   return 'medium';
    // };

    // const videoFloatSize = getVideoFloatSize(members);

    const barsHeight = {
      height: `${this.state.height / 2}px`,
    };
    const barsWidth = {
      width: `${this.state.width}px`,
    };

    return (
      <Fragment>
        <section className="active-widget__group">
          <ActiveUnit activeUnit={activeUnit} showMembers />
          <ActiveSong activeSong={activeSong} />
        </section>
        <section className="distribute-view__video" id="video-container-view">
          <YouTube
            videoId={activeSong.videoId}
            opts={opts}
            onReady={this.onReady}
            onPlay={this.onPlay}
            onPause={this.onPause}
            onEnd={this.onEnd}
            onStateChange={this.onStateChange}
          />
          <div className="distribute-view__video-float" style={barsHeight}>
            <div
              className="distribute-view__video-float__inner"
              style={barsWidth}
            >
              {Object.values(this.state.membersProgress).map(member => {
                if (member.name === 'ALL' || member.name === 'NONE') {
                  return null;
                }
                return (
                  <DistributeProgressBar
                    active={member.active}
                    colorNumber={member.colorNumber}
                    duration={member.duration}
                    name={member.name}
                    percentage={member.percentage}
                  />
                );
              })}
            </div>
          </div>
        </section>
        <section className="distribute-view-controls">
          <button className="btn" onClick={() => this.togglePlayPause()}>
            Play/Pause
          </button>
          <button className="btn" onClick={() => this.restartVideo()}>
            Restart
          </button>
          <button className="btn" onClick={() => this.rewindFastforward('-')}>
            - 10s
          </button>
          <button className="btn" onClick={() => this.rewindFastforward('+')}>
            + 10s
          </button>
          <button className="btn">Results</button>
        </section>
        <h1>View!</h1>
      </Fragment>
    );
  }
}

DistributeView.propTypes = {};

DistributeView.defaultProps = {};

export default DistributeView;
