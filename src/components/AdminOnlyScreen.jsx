import React from 'react';

import Icon from './Icon';

const AdminOnlyScreen = () => (
  <section className="container container-center">
    <div className="container-center--inner">
      <Icon type="stop" size="x-large" />
      <h3>You must be an administrator to access this page.</h3>
    </div>
  </section>
);

export default AdminOnlyScreen;
