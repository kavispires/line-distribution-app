import React from 'react';

import loading from '../images/loading.svg';

const LoadingScreen = () => (
  <section className="container container-loading">
    <img
      className="icon icon-loading"
      src={loading}
      alt="Loading Icon"
    />
  </section>
);

export default LoadingScreen;
