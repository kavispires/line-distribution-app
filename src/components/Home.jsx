import React from 'react';
import PropTypes from 'prop-types';

import logo from '../images/logo-alt.svg';

const Home = props => (
  <main className="container-no-padding">
    <iframe
      className="home-video"
      title="home-video"
      src="https://www.youtube.com/embed/cudssvDuOpc?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=cudssvDuOpc"
      frameBorder="0"
      allowFullScreen
    />
    <div className="home-content">
      <img className="home-logo" src={logo} alt="Line Distribution" />
      <div className="home-buttons">
        {!props.user.isAuthenticated ? (
          <button className="btn-home" onClick={props.login}>
            Sign-in
          </button>
        ) : null}
        <button className="btn-home">Learm more</button>
      </div>
    </div>
  </main>
);

Home.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

export default Home;
