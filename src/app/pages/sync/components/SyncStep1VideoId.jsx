import React from 'react';
import PropTypes from 'prop-types';

const SyncStep1VideoId = ({ handleVideoId, loadYoutubeVideo, videoId }) => (
  <div className="sync__step sync__step--1">
    <p>Add a youtube link/video id here</p>
    <input type="text" onChange={handleVideoId} />
    <p>OR choose a metronome placeholder</p>
    <select onChange={handleVideoId} disabled>
      <option value="">Select a btm placeholder</option>
      <option value="90bpm">90 bpm</option>
      <option value="100bpm">100 bpm</option>
      <option value="110bpm">110 bpm</option>
      <option value="120bpm">120 bpm</option>
      <option value="130bpm">130 bpm</option>
    </select>

    <button
      className="btn btn-block"
      disabled={!videoId}
      onClick={() => loadYoutubeVideo()}
    >
      Load Video for {videoId}
    </button>
  </div>
);

SyncStep1VideoId.propTypes = {
  handleVideoId: PropTypes.func.isRequired,
  loadYoutubeVideo: PropTypes.func.isRequired,
  videoId: PropTypes.string,
};

SyncStep1VideoId.defaultProps = {
  videoId: '',
};

export default SyncStep1VideoId;
