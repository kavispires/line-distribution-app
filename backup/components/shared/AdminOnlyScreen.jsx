import React from 'react';

import Icon from './Icon';

import { bem } from '../../utils';

const AdminOnlyScreen = () => (
  <main className={bem('container', ['flex', 'center'])}>
    <div className="container__inner">
      <Icon type="stop" size="x-large" />
      <h3>You must be an administrator to access this page.</h3>
    </div>
  </main>
);

export default AdminOnlyScreen;
