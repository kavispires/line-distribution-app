import React from 'react';
import logo from '../images/logo-alt.svg';

const Home = () => (
  <div className="container-no-padding">
    <iframe
      className="home-video"
      title="home-video"
      src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ"
      frameBorder="0"
      allowFullScreen
    />
    <img className="home-logo" src={logo} alt="Line Distribution" />
  </div>
);

export default Home;
