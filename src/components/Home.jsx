import React from 'react';
import PropTypes from 'prop-types';

import logo from '../images/logo-alt.svg';

const Home = props => (
  <main className="container container--no-padding">
    <div className="home__container">
      <div className="home__video">
        <iframe
          className="home__iframe"
          title="home__video"
          src="https://www.youtube.com/embed/cudssvDuOpc?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=cudssvDuOpc"
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <div className="home__content">
        <img className="home__logo" src={logo} alt="Line Distribution" />
        <div className="home__buttons">
          {/* {!props.auth.isAuthenticated ? ( */}
          <button className="btn-home">Sign-in</button>
          {/* ) : null} */}
          <button className="btn-home">Learm more</button>
        </div>
      </div>
    </div>
  </main>
);

Home.propTypes = {
  // auth: PropTypes.object.isRequired,
  // login: PropTypes.func.isRequired,
};

export default Home;
