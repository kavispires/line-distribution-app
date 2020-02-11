import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import logo from '../../../../images/logo-alt.svg';

// Import common components
import { Button, Icon, LoadingIcon } from '../../../common';

const HomeWelcomeNavigation = ({
  isAuthenticated,
  isPending,
  learnMoreAction,
  loginAction,
}) => (
  <div className="home__content">
    <img className="home__logo" src={logo} alt="Line Distribution" />
    <div className="home__buttons">
      {!isAuthenticated && (
        <Button
          label=""
          onClick={loginAction}
          className="btn-home"
          disabled={isPending}
        >
          {isPending ? (
            <LoadingIcon size="tiny" inline />
          ) : (
            <Fragment>
              Sign-in <Icon type="logout" color="white" inline />
            </Fragment>
          )}
        </Button>
      )}
      <Button
        label="Learn more"
        onClick={learnMoreAction}
        className="btn-home"
      />
    </div>
  </div>
);

HomeWelcomeNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  learnMoreAction: PropTypes.func.isRequired,
  loginAction: PropTypes.func.isRequired,
};

export default HomeWelcomeNavigation;
