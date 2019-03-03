import React from 'react';
import PropTypes from 'prop-types';

// Import utility functions
import utils from '../../../../utils';

const SyncStep3Lyrics = ({
  handleLyricsEdit,
  lockLyrics,
  lyrics,
  prepareLines,
}) => {
  const insertBrackers = () => {
    const el = document.getElementById('lyrics-editor');
    const newEl = utils.insertAtCursor(el, ' [] ');
    handleLyricsEdit(newEl);
  };

  return (
    <div className="sync__step sync__step--1">
      <div className="sync__lyrics__controls">
        <button className="btn btn-50" onClick={() => prepareLines(true)}>
          Prepare Lines *
        </button>{' '}
        <button className="btn btn-50" onClick={insertBrackers}>
          Add []
        </button>
      </div>
      <textarea
        id="lyrics-editor"
        className="sync__lyrics__textarea"
        onChange={e => handleLyricsEdit(e)}
        placeholder="Add Lyrics here and press Prepare Lines"
        value={lyrics || ''}
      />
      <p>
        <small>
          * Prepare Lines adds square brackets before each line erasing any
          numbered id previously created. If you are editing, this will erase
          any previously linked pill.
        </small>
      </p>
      <button className="btn btn-block" onClick={() => lockLyrics()}>
        Lock Lyrics &amp; Next Step
      </button>
    </div>
  );
};

SyncStep3Lyrics.propTypes = {
  handleLyricsEdit: PropTypes.func.isRequired,
  lockLyrics: PropTypes.func.isRequired,
  lyrics: PropTypes.string.isRequired,
  prepareLines: PropTypes.func.isRequired,
};

export default SyncStep3Lyrics;
