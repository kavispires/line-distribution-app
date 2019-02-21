import React from 'react';
import PropTypes from 'prop-types';

// Import images
import loading from '../../../images/loading.svg';

const Loading = ({ message = '' }) => (
  <main className="container container--flex container--center container--requirement-wrapper">
    <div className="requirement-wrapper__container">
      <img
        className="requirement-wrapper__loading-icon"
        src={loading}
        alt="Loading Icon"
      />
      <p>{message}</p>
    </div>
  </main>
);

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: '',
};

export default Loading;
