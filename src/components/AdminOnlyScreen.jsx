import React from 'react';

import iconStop from '../images/icon-stop.svg';

const AdminOnlyScreen = () => (
  <section className="container container-center">
    <div className="container-center--inner">
      <img
        className="icon icon-stop"
        src={iconStop}
        alt="Access Denied"
      />
      <h3>You must be an administrator to access this page.</h3>
    </div>
  </section>
);

export default AdminOnlyScreen;
