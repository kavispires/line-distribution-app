import React from 'react';
import PropTypes from 'prop-types';

import logo from '../images/logo-neg.svg';

import Icon from './Icon';

const LoginRequired = ({ login }) => (
  <main className="container container--flex container--center container--login-required">
    <main className="login-required-content">
      <img className="login-logo" src={logo} alt="Line Distribution" />
      <p>You must be logged in to access this page.</p>
      <button className="btn btn-simple" onClick={login}>
        Sign-in now <Icon type="login" color="black" inline />
      </button>
    </main>
  </main>
);

LoginRequired.propTypes = {
  login: PropTypes.func.isRequired,
};

LoginRequired.defaultProps = {};

export default LoginRequired;
