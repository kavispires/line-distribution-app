import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

// Import shared components
import { ActiveSong, ActiveUnit, Icon, LoadingIcon } from '../../../common';
// Import utility functions
import constants from '../../../../utils/constants';
import DistributeProgressBar from './DistributeProgressBar';
// Import images
import optionBasic from './../../../../images/distribute-basic.svg';
import optionVertical from './../../../../images/distribute-vertical.svg';
import optionDiscs from './../../../../images/distribute-discs.svg';
import optionReport from './../../../../images/distribute-report.svg';
import optionRank from './../../../../images/distribute-rank.svg';

let player = null;
let animationInterval;
// let membersProgress = {};

const INTERVAL = 100;

class DistributeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        height: 0,
        width: 0,
      },
      isVideoAreaReady: false,
      lyrics: '',
      currentTime: 0,
      isPlaying: false,
      isReady: false,
      membersProgress: {},
      membersGroups: [],
    };

    this.setDimentions = this.setDimentions.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.restartVideo = this.restartVideo.bind(this);
    this.calculateBars = this.calculateBars.bind(this);
  }

  componentDidMount() {
    player = null;
    // Determine player height
    if (
      !this.state.dimensions.height &&
      document.getElementById('video-container-view')
    ) {
      this.setDimentions();
    }

    this.setMembers();
  }

  onReady(e) {
    player = e.target;
    this.setState({ isReady: true });
  }

  onPlay() {
    this.setState({ isPlaying: true });
  }

  onPause() {
    this.setState({ isPlaying: false });
  }

  onEnd() {
    this.setState({ isPlaying: false });
  }

  onStateChange(e) {
    // If video is playing
    if (e.data === 1) {
      // Lyric Review Animation Interval
      animationInterval = setInterval(() => {
        const currentTime = Math.floor(e.target.getCurrentTime() * 10);
        // this.setState({ currentTime });
        this.calculateBars(currentTime);
      }, INTERVAL);
    } else {
      // Kill interval
      clearInterval(animationInterval);
    }
  }

  setDimentions() {
    let width =
      document.getElementById('video-container-view').clientWidth || 16;
    let height =
      document.getElementById('video-container-view').clientHeight || 9;
    if (width > height) {
      width = (16 * height) / 9;
    } else {
      height = (9 * width) / 16;
    }

    this.setState(
      () => ({
        dimensions: {
          height,
          width,
        },
      }),
      () => {
        this.setState(() => ({ isVideoAreaReady: true }));
      }
    );
  }

  setMembers() {
    const { members, rates } = this.props;

    const membersProgress = Object.values(members).reduce((acc, member) => {
      acc[member.id] = {
        id: member.id,
        name: member.name,
        color: member.color || 0,
        percentage: 0,
        duration: 0,
        active: false,
        picUrl: `${process.env.PUBLIC_URL}${
          constants.PROFILE_PICTURE_URL
        }${member.name.toLowerCase()}${member.id}.jpg`,
      };

      return acc;
    }, {});

    const membersLength = Object.values(members).length - 2;
    const numberOfColumns = Math.ceil(membersLength / 10);
    const membersPerColumn = Math.ceil(membersLength / numberOfColumns);
    const membersGroups = Object.values(members).reduce(
      (acc, member) => {
        if (member.id === 'ALL' || member.id === 'NONE') return acc;

        const lastGroup = acc[acc.length - 1];
        if (lastGroup.length < membersPerColumn) {
          lastGroup.push(member.id);
        } else {
          acc.push([member.id]);
        }
        return acc;
      },
      [[]]
    );

    const arrayOfTotals = Object.entries(rates).reduce((acc, [key, val]) => {
      if (!['ALL', 'max', 'total'].includes(key)) acc.push(val);
      return acc;
    }, []);
    const max = Math.max(...arrayOfTotals);

    this.setState({
      membersProgress,
      membersGroups,
      max,
    });
  }

  calculateBars(timestamp) {
    const currentTimestamp = this.props.timestampsDict[timestamp];
    const { max } = this.state;

    const newState = {};

    const membersProgress = { ...this.state.membersProgress };

    if (currentTimestamp) {
      // Determine lyrics
      const lyrics = currentTimestamp.content.join('\n');

      // Deactive inactive members
      Object.keys(currentTimestamp.inactive).forEach(memberId => {
        const { duration } = membersProgress[memberId];
        membersProgress[memberId].active = false;
        membersProgress[memberId].duration = duration;
        membersProgress[memberId].percentage = (100 * duration) / max;
      });

      // Active active members
      Object.keys(currentTimestamp.active).forEach(memberId => {
        membersProgress[memberId].active = true;
      });

      newState.lyrics = lyrics;
    }

    // Add second to every active member
    Object.values(membersProgress).forEach(member => {
      if (member.active) {
        member.duration += 0.1;
        member.percentage = (100 * member.duration) / max;
      }
    });

    newState.membersProgress = membersProgress;

    this.setState({
      ...newState,
    });
  }

  togglePlayPause() {
    if (this.state.isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  restartVideo() {
    this.setMembers();

    player.seekTo(0);
    player.playVideo();
  }

  rewindFastforward(direction) {
    // TO-DO: Update UI bars accordingly

    if (direction === '+') {
      player.seekTo(player.getCurrentTime() + 10);
    } else {
      player.seekTo(player.getCurrentTime() - 10);
    }
  }

  render() {
    const { activeSong, activeUnit } = this.props;

    return (
      <Fragment>
        <section className="active-widget__group">
          <ActiveUnit activeUnit={activeUnit} showMembers />
          <ActiveSong activeSong={activeSong} />
        </section>
        <section className="distribute-viewer-grid">
          <ul className="distribute-viewer-grid__aside">
            <li className="distribute-viewer-modes-title">Style</li>
            <li className="distribute-viewer-mode">
              <img src={optionBasic} alt="Basic" />
            </li>
            <li className="distribute-viewer-mode">
              <img src={optionVertical} alt="Vertical" />
            </li>
            <li className="distribute-viewer-mode">
              <img src={optionDiscs} alt="Discs" />
            </li>
          </ul>
          <div className="distribute-viewer-video" id="video-container-view">
            {this.state.isVideoAreaReady ? (
              <Fragment>
                <div className="distribute-viewer-video__youtube">
                  <YouTube
                    videoId={activeSong.videoId}
                    opts={this.state.dimensions}
                    onReady={this.onReady}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onEnd={this.onEnd}
                    onStateChange={this.onStateChange}
                  />
                  <div className="distribute-viewer-overlay">
                    <div className="distribute-viewer-overlay__active-members">
                      {Object.values(this.state.membersProgress).map(member => {
                        if (
                          member.active === false ||
                          member.name === 'ALL' ||
                          member.name === 'NONE'
                        ) {
                          return null;
                        }

                        return (
                          <img
                            key={`pic-${member.id}`}
                            className={`distribute-viewer-overlay__active-member border-color-${member.color}`}
                            src={member.picUrl}
                            alt={member.name}
                          />
                        );
                      })}
                    </div>
                    <div className="distribute-viewer-overlay__lyrics">
                      {this.state.lyrics}
                    </div>
                    <div className="distribute-viewer-overlay__bars">
                      {this.state.membersGroups.map((group, index) => {
                        const key = `group-${index}`;
                        return (
                          <div
                            key={key}
                            className={`distribute-viewer-overlay__bars-group distribute-viewer-overlay__bars-group--${this.state.membersGroups.length}`}
                          >
                            {group.map(memberId => {
                              const member = this.state.membersProgress[
                                memberId
                              ];

                              return (
                                <DistributeProgressBar
                                  key={`bar-${member.id}`}
                                  active={member.active}
                                  color={member.color}
                                  duration={member.duration}
                                  name={member.name}
                                  percentage={member.percentage}
                                />
                              );
                            })}
                          </div>
                        );
                      })}

                      {/* {Object.values(this.state.membersProgress).map(member => {
                        if (member.name === 'ALL' || member.name === 'NONE') {
                          return null;
                        }
                        return (
                          <DistributeProgressBar
                            key={`bar-${member.id}`}
                            active={member.active}
                            color={member.color}
                            duration={member.duration}
                            name={member.name}
                            percentage={member.percentage}
                          />
                        );
                      })} */}
                    </div>
                  </div>
                </div>
                <div className="distribute-viewer-controls">
                  <button
                    className="distribute-viewer-controls__button"
                    onClick={() => this.togglePlayPause()}
                  >
                    {this.state.isPlaying ? (
                      <Icon type="pause" />
                    ) : (
                      <Icon type="play" />
                    )}
                  </button>
                  <button
                    className="distribute-viewer-controls__button"
                    onClick={() => this.restartVideo()}
                  >
                    <Icon type="restart" />
                  </button>
                  <button
                    className="distribute-viewer-controls__button"
                    onClick={() => this.rewindFastforward('-')}
                  >
                    <Icon type="rewind" />
                  </button>
                  <button
                    className="distribute-viewer-controls__button"
                    onClick={() => this.rewindFastforward('+')}
                  >
                    <Icon type="fast-forward" />
                  </button>
                </div>
              </Fragment>
            ) : (
              <LoadingIcon size="small" />
            )}
          </div>
          <ul className="distribute-viewer-grid__aside">
            <li className="distribute-viewer-modes-title">Options</li>
            <li className="distribute-viewer-mode">
              <img src={optionRank} alt="Rank/Results" />
            </li>
            <li className="distribute-viewer-mode">
              <img src={optionReport} alt="Report Broken Distribution" />
            </li>
          </ul>
        </section>
      </Fragment>
    );
  }
}

DistributeView.propTypes = {
  members: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  timestampsDict: PropTypes.object.isRequired,
  activeSong: PropTypes.object.isRequired,
  activeUnit: PropTypes.object.isRequired,
};

DistributeView.defaultProps = {};

export default DistributeView;
