import React from 'react';
import PropTypes from 'prop-types';

// Import common components
import { Icon, LoadingWrapper } from '../../../common';
// Import constants
import constants from '../../../../utils/constants';

const SyncStep5Save = ({ info, pending, saveSync, unlockSpecificStep }) => (
  <div className="sync__step sync__step--5">
    <h3>Info</h3>
    <ul className="sync__verify__info">
      <li className="sync__verify__info-item">Title: {info.title}</li>
      <li className="sync__verify__info-item">Artist: {info.originalArtist}</li>
      <li className="sync__verify__info-item">
        ArtistId: {info.artistId ? info.artistId : 'Unavailable'}
      </li>
      <li className="sync__verify__info-item">
        Album: {info.album ? info.album : 'Unknown'}
      </li>
      <li className="sync__verify__info-item">
        Single: {info.single ? 'Yes' : 'No'}
      </li>
      <li className="sync__verify__info-item">Group Size: {info.groupSize}</li>
      <li className="sync__verify__info-item">
        Group Gender: {constants.ARTISTS_GENDERS[info.gender]}
      </li>
      <li className="sync__verify__info-item">Video Id: {info.videoId}</li>
      <li className="sync__verify__info-item">
        Private: {info.private ? 'Yes' : 'No'}
      </li>
    </ul>
    <button className="btn btn-block" onClick={() => unlockSpecificStep(2)}>
      <Icon type="back-arrow" inline /> Info is wrong. Let me fix it!
    </button>
    <p>
      Play the video and see your distribution in action to see if anything is
      wrong.
    </p>
    <button className="btn btn-block" onClick={() => unlockSpecificStep(3)}>
      <Icon type="back-arrow" inline /> Lyrics or distribution are wrong. Let me
      fix it!
    </button>
    <p>
      After everything is good. You can save by clicking on the button below:
    </p>

    <button className="btn btn-block" onClick={() => saveSync()}>
      <LoadingWrapper pending={pending} size="tiny">
        <Icon type="save" color="red" inline /> Save
      </LoadingWrapper>
    </button>
  </div>
);

SyncStep5Save.propTypes = {
  info: PropTypes.object.isRequired,
  pending: PropTypes.bool,
  saveSync: PropTypes.func.isRequired,
  unlockSpecificStep: PropTypes.func.isRequired,
};

SyncStep5Save.defaultProps = {
  pending: false,
};

export default SyncStep5Save;
