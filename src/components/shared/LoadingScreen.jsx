import React from 'react';

import loading from '../../images/loading.svg';

import { bem } from '../../utils';

const LoadingScreen = () => (
  <main className={bem('container', ['flex', 'center'])}>
    <img className="icon icon-loading" src={loading} alt="Loading Icon" />
  </main>
);

export default LoadingScreen;
