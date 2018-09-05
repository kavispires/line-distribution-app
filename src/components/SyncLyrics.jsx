import React from 'react';

// Import utility functions
import { insertAtCursor } from '../utils';

class SyncLyrics extends React.Component {
  componentDidMount() {
    const { props } = this.props;
    const SYNC = props.sync;

    if (SYNC.finalLyrics === '') {
      props.finalizeLyrics();
    }
  }

  render() {
    const { props } = this.props;
    const SYNC = props.sync;

    const insertBrackers = () => {
      const el = document.getElementById('lyrics-editor');
      const newEl = insertAtCursor(el, ' [] ');
      props.handleLyricsEdit(newEl);
    };

    return (
      <div className="sync-grid-section">
        <section className="sync-grid-lyrics">
          <div className="sync-grid-lyrics__controls">
            <button className="btn btn-25" onClick={props.prepareLines}>
              Prepare Lines
            </button>
            <button className="btn btn-25" onClick={insertBrackers}>
              Add []
            </button>
            <button className="btn btn-25" onClick={() => props.lockLyrics()}>
              Lock Lyrics
            </button>
          </div>
          <textarea
            id="lyrics-editor"
            className="sync-grid-lyrics__textarea"
            onChange={e => props.handleLyricsEdit(e)}
            placeholder="Add Lyrics here and press Prepare Lines"
            value={SYNC.lyrics || ''}
          />
        </section>
        <section className="sync-grid-navigation">
          <button
            className="btn btn-inline btn-fx-150"
            onClick={() => props.updateStep('-1')}
          >
            Back
          </button>
          <button
            className="btn btn-inline btn-fx-150"
            onClick={() => props.updateStep('+1')}
            disabled={!SYNC.isLyricsLocked}
          >
            Next
          </button>
        </section>
      </div>
    );
  }
}

export default SyncLyrics;
