import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import logo from '../../../../images/logo-alt.svg';

// Import common components
import { Icon, LoadingIcon } from '../../../common';

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
        <button className="btn-home" onClick={loginAction} disabled={isPending}>
          {isPending ? (
            <LoadingIcon size="tiny" inline />
          ) : (
            <Fragment>
              Sign-in <Icon type="logout" color="white" inline />
            </Fragment>
          )}
        </button>
      )}
      <button className="btn-home" onClick={() => learnMoreAction()}>
        Learm more
      </button>
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
