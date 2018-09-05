import React from 'react';
import PropTypes from 'prop-types';

// Import shared components
import SyncInstructions from './SyncInstructions';

const SyncVideoId = ({ step, videoId, updateVideoId, updateStep }) => (
  <main className="container container-sync">
    <h1>Sync</h1>
    <div className="sync-grid-group">
      <SyncInstructions step={step} />
      <section className="sync-grid-video-link">
        <input
          className="ld-form__input-text--limited"
          type="text"
          name="videoLink"
          onChange={updateVideoId}
          placeholder="Youtube Link or Id"
        />
        <nav className="sync-navigation">
          <button
            className="btn btn-block btn-fx-150"
            onClick={() => updateStep(2)}
            disabled={videoId.length === 0}
          >
            Next
          </button>
        </nav>
      </section>
    </div>
  </main>
);

SyncVideoId.propTypes = {
  step: PropTypes.number.isRequired,
  updateStep: PropTypes.func.isRequired,
  updateVideoId: PropTypes.func.isRequired,
  videoId: PropTypes.string.isRequired,
};

export default SyncVideoId;
