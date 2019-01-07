import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const CreatorArtist = ({ props }) => {
  const sortedArtists = _.sortBy(props.admin.artists, ['name']);
  const CREATOR = props.creator;
  const artistDisabled = +CREATOR.loadedArtist !== 0;

  return (
    <form className="creator-form">
      <div className="form-instance-full form-instance-highlighted">
        <label htmlFor="loadArtist">Use Existing Artist:</label>
        <select
          name="loadArtist"
          value={CREATOR.loadedArtist}
          onChange={props.loadArtist}
        >
          <option value="0">Select an artist to load...</option>
          {sortedArtists.map(artist => (
            <option key={`artist-${artist.id}`} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-instance">
        <label htmlFor="newArtistName">Artist Name*:</label>
        <input
          type="text"
          name="newArtistName"
          value={CREATOR.newArtistName}
          onChange={props.handleNewArtistName}
          disabled={artistDisabled}
        />
      </div>
      <div className="form-instance">
        <label htmlFor="newArtistOtherNames">
          Other Names<span className="hint"> (Separated by commas)</span>:
        </label>
        <input
          type="text"
          name="newArtistOtherNames"
          value={CREATOR.newArtistOtherNames}
          onChange={props.handleNewArtistOtherNames}
          disabled={artistDisabled}
        />
      </div>
      <div className="form-instance">
        <label htmlFor="newArtistGenre">Genre:</label>
        <select
          name="newArtistGenre"
          value={CREATOR.newArtistGenre}
          onChange={props.handleNewArtistGenre}
          disabled={artistDisabled}
        >
          <option value="K-Pop">K-Pop</option>
          <option value="Pop">Pop</option>
          <option value="J-Pop">J-Pop</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </form>
  );
};

CreatorArtist.propTypes = {
  props: PropTypes.object.isRequired, // eslint-disable-line
  admin: PropTypes.object, // eslint-disable-line
  creator: PropTypes.object, // eslint-disable-line
  loadArtist: PropTypes.func,
  handleNewArtistName: PropTypes.func,
  handleNewArtistOtherNames: PropTypes.func,
  handleNewArtistGenre: PropTypes.func,
};

export default CreatorArtist;
