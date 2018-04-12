import React from 'react';

import loading from '../images/loading.svg';

const LoadingIcon = () => (
  <div className="loading-centered">
    <img
      className="icon icon-pos"
      src={loading}
      alt="Loading Icon"
    />
  </div>
);

export default LoadingIcon;
