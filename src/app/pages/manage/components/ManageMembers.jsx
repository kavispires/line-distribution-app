import React from 'react';

// Import images
import manageLock from '../../../../images/manage-lock.svg';

const LockedMembers = () => (
  <section className="manage-section__members">
    <h3 className="manage-section__button-title">Members</h3>
    <div className="manage-section__button-locked">
      <img
        className="manage-section__button-lock-image"
        src={manageLock}
        alt="Locked Members"
      />
    </div>
  </section>
);

export default LockedMembers;
