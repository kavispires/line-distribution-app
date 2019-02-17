import React from 'react';

// Import images
import manageLock from '../../../../images/manage-lock.svg';

const LockedUnit = () => (
  <section className="manage-section__unit">
    <h3 className="manage-section__button-title">Unit</h3>
    <div className="manage-section__button-locked">
      <img
        className="manage-section__button-lock-image"
        src={manageLock}
        alt="Lock Artist"
      />
    </div>
  </section>
);

export default LockedUnit;
