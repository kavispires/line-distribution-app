import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components
import SyncStep1VideoId from './SyncStep1VideoId';
import SyncStep2Info from './SyncStep2Info';
import SyncStep3Lyrics from './SyncStep3Lyrics';
import SyncStep4Buttons from './SyncStep4Buttons';
import SyncStep4Distributions from './SyncStep4Distribution';
import SyncStep5Verify from './SyncStep5Verify';
import SyncStep5Save from './SyncStep5Save';
// Import common components
import {
  Collapsible,
  Loading,
  RequirementWrapper,
  Icon,
} from '../../../common';

let loadYT;
let player;
let animationInterval;

class Sync extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      currentTime: 0,
    };

    this.loadYoutubeVideo = this.loadYoutubeVideo.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.setHeight = this.setHeight.bind(this);
  }

  componentDidMount() {
    if (this.props.db.artists.length < 10) {
      this.props.loadArtists();
    }
  }

  componentDidUpdate() {
    // Determine player height
    if (!this.state.height && document.getElementById('video-container')) {
      this.setHeight();
    }
  }

  onPlayerStateChange(e) {
    // If video is playing
    if (e.data === 1 && this.props.sync.step === 5) {
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

  setHeight() {
    const width = document.getElementById('video-container').clientWidth;
    const height = (9 * width) / 16;
    this.setState(() => ({ width, height }));
  }

  loadYoutubeVideo() {
    if (!loadYT && this.props.sync.videoId) {
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
          videoId: this.props.sync.videoId,
          events: {
            onStateChange: e => this.onPlayerStateChange(e),
          },
        });
        this.props.unlockNextStep();
      });
    }
  }

  render() {
    const {
      app: { pending },
      db: { artistsTypeahead },
      sync: {
        activeLine,
        activePill,
        distributionLines,
        info,
        isDistributionComplete,
        linkSequenceMode,
        lyrics,
        pills,
        step,
        steps,
        stats,
        timestamps,
        videoId,
      },
      connectSyncLine,
      connectSyncPill,
      deleteSyncPill,
      handleFormInfo,
      handleLyricsEdit,
      handleSyncBoxMouseDown,
      handleSyncBoxMouseUp,
      handleSyncKeydown,
      handleSyncKeyup,
      handleResetSync,
      handleVideoId,
      linkPillsSequence,
      location,
      lockLyrics,
      prepareLines,
      resetPillLinks,
      saveSync,
      unlockNextStep,
      unlockSpecificStep,
    } = this.props;

    if (pending.REQUEST_ARTISTS) {
      return <Loading message="Preparing Sync..." />;
    }

    // If save is in progress
    if (step === 6) {
      return (
        <main className="container container--sync">
          <h1>Manage</h1>
          <div className="manage-section--manage-success">
            <Icon type="check" color="green" size={96} />
            <p>Song Successfully Created</p>
            <button className="btn" onClick={handleResetSync}>
              Create New Song Distribution
            </button>
          </div>
        </main>
      );
    }

    return (
      <RequirementWrapper>
        <main className="container container--sync">
          <h1>Sync</h1>
          <section className="sync__container">
            <div className="sync__group sync__group--left">
              <section
                className="sync__video"
                id="video-container"
                ref={r => {
                  this.youtubePlayerAnchor = r;
                }}
              >
                <Icon type="youtube" color="white" size="72" />
              </section>
              <Collapsible
                title="4. Distribution Buttons"
                locked={steps[4].locked}
                expanded={steps[4].expanded}
                collapsed={!steps[4].expanded}
                synced
              >
                <SyncStep4Buttons
                  activePill={activePill}
                  connectSyncPill={connectSyncPill}
                  deleteSyncPill={deleteSyncPill}
                  handleSyncBoxMouseDown={handleSyncBoxMouseDown}
                  handleSyncBoxMouseUp={handleSyncBoxMouseUp}
                  handleSyncKeydown={handleSyncKeydown}
                  handleSyncKeyup={handleSyncKeyup}
                  linkPillsSequence={linkPillsSequence}
                  linkSequenceMode={linkSequenceMode}
                  location={location}
                  pills={pills}
                  player={player}
                  resetPillLinks={resetPillLinks}
                  stats={stats}
                />
              </Collapsible>
              <Collapsible
                title="5. Confirm &amp; Save"
                locked={steps[5].locked}
                expanded={steps[5].expanded}
                collapsed={!steps[5].expanded}
                synced
              >
                <SyncStep5Save
                  info={info}
                  pending={pending.SEND_SONG}
                  saveSync={saveSync}
                  unlockSpecificStep={unlockSpecificStep}
                />
              </Collapsible>
            </div>
            <div className="sync__group sync__group--right">
              <Collapsible
                title="1. Video Id"
                locked={steps[1].locked}
                expanded={steps[1].expanded}
                collapsed={!steps[1].expanded}
                synced
              >
                <SyncStep1VideoId
                  handleVideoId={handleVideoId}
                  loadYoutubeVideo={this.loadYoutubeVideo}
                  videoId={videoId}
                />
              </Collapsible>
              <Collapsible
                title="2. Info"
                locked={steps[2].locked}
                expanded={steps[2].expanded}
                collapsed={!steps[2].expanded}
                synced
              >
                <SyncStep2Info
                  artistsTypeahead={artistsTypeahead}
                  handleFormInfo={handleFormInfo}
                />
              </Collapsible>
              <Collapsible
                title="3. Lyrics"
                locked={steps[3].locked}
                expanded={steps[3].expanded}
                collapsed={!steps[3].expanded}
                synced
              >
                <SyncStep3Lyrics
                  handleLyricsEdit={handleLyricsEdit}
                  lockLyrics={lockLyrics}
                  lyrics={lyrics}
                  prepareLines={prepareLines}
                />
              </Collapsible>
              <Collapsible
                title="4. Distribution"
                locked={steps[4].locked}
                expanded={steps[4].expanded}
                collapsed={!steps[4].expanded}
                synced
              >
                <SyncStep4Distributions
                  activeLine={activeLine}
                  connectSyncLine={connectSyncLine}
                  distributionLines={distributionLines}
                  isDistributionComplete={isDistributionComplete}
                  unlockSpecificStep={unlockSpecificStep}
                  unlockNextStep={unlockNextStep}
                />
              </Collapsible>
              <Collapsible
                title="5. Verify"
                locked={steps[5].locked}
                expanded={steps[5].expanded}
                collapsed={!steps[5].expanded}
                synced
              >
                <SyncStep5Verify
                  currentTime={this.state.currentTime}
                  distributionLines={distributionLines}
                  timestamps={timestamps}
                />
              </Collapsible>
            </div>
          </section>
        </main>
      </RequirementWrapper>
    );
  }
}

Sync.propTypes = {
  db: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  connectSyncLine: PropTypes.func.isRequired,
  connectSyncPill: PropTypes.func.isRequired,
  deleteSyncPill: PropTypes.func.isRequired,
  handleFormInfo: PropTypes.func.isRequired,
  handleLyricsEdit: PropTypes.func.isRequired,
  handleSyncBoxMouseDown: PropTypes.func.isRequired,
  handleSyncBoxMouseUp: PropTypes.func.isRequired,
  handleSyncKeydown: PropTypes.func.isRequired,
  handleSyncKeyup: PropTypes.func.isRequired,
  handleResetSync: PropTypes.func.isRequired,
  handleVideoId: PropTypes.func.isRequired,
  linkPillsSequence: PropTypes.func.isRequired,
  loadArtists: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  lockLyrics: PropTypes.func.isRequired,
  prepareLines: PropTypes.func.isRequired,
  resetPillLinks: PropTypes.func.isRequired,
  saveSync: PropTypes.func.isRequired,
  sync: PropTypes.object.isRequired,
  unlockNextStep: PropTypes.func.isRequired,
  unlockSpecificStep: PropTypes.func.isRequired,
};

export default Sync;
