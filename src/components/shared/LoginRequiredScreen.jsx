import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../images/logo-neg.svg';

import Icon from './Icon';

import { bem } from '../../utils';

const LoginRequiredScreen = ({ props, redirect = '/home' }) => {
  const loginClick = () => {
    props.history.push(redirect);
    props.login();
  };

  return (
    <main className={bem('container', ['flex', 'center'])}>
      <main className="container__inner">
        <img className="login-logo" src={logo} alt="Line Distribution" />
        <p>You must be logged in to access this page.</p>
        <button className="btn-home" onClick={loginClick}>
          <Icon type="sign-in" /> Sign-in now
        </button>
      </main>
    </main>
  );
};

LoginRequiredScreen.propTypes = {
  props: PropTypes.object.isRequired,
  history: PropTypes.object,
  login: PropTypes.func,
  redirect: PropTypes.string.isRequired,
};

LoginRequiredScreen.defaultProps = {
  history: null,
  login: null,
};

export default LoginRequiredScreen;
