import React from 'react';
import PropTypes from 'prop-types';

// Import components
import HomeBackgroundVideo from './HomeBackgroundVideo';
import HomeWelcomeNavigation from './HomeWelcomeNavigation';

const Home = props => {
  const handleLearnMoreClick = () => {
    props.history.push('/learn-more');
  };

  const isPending =
    props.app.pending.INITIALIZER ||
    props.app.pending.RUN_LOGIN ||
    props.app.pending.RUN_AUTH ||
    false;

  return (
    <main className="container container--no-padding">
      <HomeBackgroundVideo />
      <HomeWelcomeNavigation
        isAuthenticated={props.auth.isAuthenticated}
        isPending={isPending}
        learnMoreAction={handleLearnMoreClick}
        loginAction={props.login}
      />
    </main>
  );
};

Home.propTypes = {
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Home;
