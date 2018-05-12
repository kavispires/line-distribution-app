import React from 'react';
import PropTypes from 'prop-types';

const LoginRequiredScreen = ({ props, redirect = '/home' }) => {
  const loginClick = () => {
    props.history.push(redirect);
    props.login();
  };

  return (
    <section className="container container-loading">
      <main>
        You must be loggin to access this page.
        <button
          className="btn-home"
          onClick={loginClick}
        >
          Sign-in now
        </button>
      </main>
    </section>
  );
};

LoginRequiredScreen.propTypes = {
  props: PropTypes.object.isRequired, // eslint-disable-line
  history: PropTypes.object.isRequired, // eslint-disable-line
  login: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
};

export default LoginRequiredScreen;
