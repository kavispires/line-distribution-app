import React from 'react';
import PropTypes from 'prop-types';

// Import shared components
import SyncVideoId from './SyncVideoId';
import SyncMain from './SyncMain';
import SyncForm from './SyncForm';

const Sync = props => {
  const SYNC = props.sync;

  if (SYNC.step === 1) {
    return (
      <SyncVideoId
        step={SYNC.step}
        videoId={SYNC.videoId}
        updateVideoId={props.updateVideoId}
        updateStep={props.updateStep}
      />
    );
  }

  if (SYNC.step === 2) {
    return (
      <SyncForm
        step={SYNC.step}
        form={SYNC.form}
        updateForm={props.updateForm}
        updateStep={props.updateStep}
      />
    );
  }

  if (SYNC.step === 3 || SYNC.step === 4 || SYNC.step === 5) {
    return <SyncMain props={props} />;
  }

  return <div />;
};

export default Sync;

Sync.propTypes = {
  sync: PropTypes.object.isRequired,
  updateForm: PropTypes.func.isRequired,
  updateStep: PropTypes.func.isRequired,
  updateVideoId: PropTypes.func.isRequired,
};
