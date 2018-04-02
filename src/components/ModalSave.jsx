import React from 'react';

const SaveModal = ({props}) => {
  const { results, distribute, lyrics } = props;

  return (
    <section className="modal">
      <div className="modal-save">
        <h1>Save Song</h1>
        <p>Songs are saved to localStorage and to clipboard.</p>
        <div className="modal-group">
          <label htmlFor="songTitle">Song Title*:</label>
          <input
            type="text"
            name="songTitle"
            value={results.songTitle}
            onChange={props.handleSongTitle}
          />
        </div>
        <div className="modal-group">
          <label htmlFor="songType">Type*:</label>
          <select
            name="songType"
            value={results.songType}
            onChange={props.handleSongType}
          >
            <option value="">Select type...</option>
            <option value="official">Official</option>
            <option value="would">How They Would Sing...</option>
            <option value="should">How They Should Sing...</option>
          </select>
        </div>
        {
          results.songType === 'would' ? (
            <div className="modal-group">
              <label htmlFor="originalArtist">Original Artist*:</label>
              <input
                type="text"
                name="originalArtist"
                value={results.originalArtist}
                onChange={props.handleOriginalArtist}
              />
            </div>
          ) : null
        }
        <p>Contains Distribution:
          {
            distribute.history.length > 0 ? (
              <span className="label-green">YES</span>
            ) : (
              <span className="label-red">NO</span>
            )
          }
        </p>
        <p>Contains Lyrics:
          {
            lyrics.formattedLyrics.length > 0 ? (
              <span className="label-green">YES</span>
            ) : (
              <span className="label-red">NO</span>
            )
          }
        </p>
        <ul className="controls">
          <li><button className="btn-lg btn-100" onClick={props.openSaveModal}>Cancel</button></li>
          <li><button className="btn-lg btn-100" onClick={() => props.saveSong(false)}>Copy to clipboard...</button></li>
          <li><button className="btn-lg btn-100" onClick={props.saveSong}>Save As...</button></li>
        </ul>
        <small>At the moment, Save As saves a new instance of the distribution/song each time.</small>
      </div>
      {
        results.tempInput ? (
          <textarea className="temp-input-save" id="temp-input" value={results.tempInput} readOnly />
        ) : null
      }
    </section>
  );
};

export default SaveModal;
