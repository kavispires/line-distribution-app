import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../../../images/logo-alt.svg';

import constants from '../../../../utils/constants';

// Import common components
import { Icon } from '../../../common';

const Home = props => {
  // Randomly choose one video in the playlist
  const youtubeUrl =
    constants.YOUTUBE_URLS[
      Math.floor(Math.random() * constants.YOUTUBE_URLS.length)
    ];

  const handleLearnMoreClick = () => {
    props.history.push('/learn-more');
  };

  return (
    <main className="container container--no-padding">
      <div className="home__video">
        <iframe
          className="home__iframe"
          title="home__video"
          src={`https://www.youtube.com/embed/${youtubeUrl}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=${youtubeUrl}`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <div className="home__content">
        <img className="home__logo" src={logo} alt="Line Distribution" />
        <div className="home__buttons">
          {!props.auth.isAuthenticated && (
            <button className="btn-home" onClick={props.login}>
              Sign-in <Icon type="logout" color="white" inline />
            </button>
          )}
          <button className="btn-home" onClick={() => handleLearnMoreClick()}>
            Learm more
          </button>
        </div>
      </div>
    </main>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Home;
