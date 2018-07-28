import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../images/logo-neg.svg';

import Icon from './Icon';

const LoginRequiredScreen = ({ props, redirect = '/home' }) => {
  const loginClick = () => {
    props.history.push(redirect);
    props.login();
  };

  return (
    <section className="container container-center">
      <main className="container-center--inner">
        <img className="login-logo" src={logo} alt="Line Distribution" />
        <p>You must be loggin to access this page.</p>
        <button className="btn-home" onClick={loginClick}>
          <Icon type="sign-in" /> Sign-in now
        </button>
      </main>
    </section>
  );
};

LoginRequiredScreen.propTypes = {
  props: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
};

export default LoginRequiredScreen;
