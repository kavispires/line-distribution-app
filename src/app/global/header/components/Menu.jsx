/* eslint react/require-default-props: 0 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import common components
import { Icon, LoadingIcon } from '../../../common';
// Import images
import logo from '../../../../images/logo.svg';
import userPlaceholder from '../../../../images/user-placeholder.svg';

const Menu = ({
  activeUnit,
  auth,
  history,
  location,
  login,
  logout,
  pending,
}) => {
  const handleLogoClick = () => {
    history.push('/');
  };

  const { pathname } = location;

  // Hide parts of the menu if user is not authenticaded
  const authHideClass = auth.isAuthenticated ? '' : 'hidden';

  // Hide parts of the menu if user is not an administrator
  const adminHideClass = auth.isAdmin ? '' : 'hidden';

  // Hide parts of the menu if user hasn't selected an active unit
  const activeUnitHideClass = activeUnit.id ? '' : 'hidden';

  // Sign-in pending
  const isPending = pending.RUN_LOGIN;

  return (
    <header className="header">
      <div className="header-nav">
        <img
          className="header-nav__logo"
          src={logo}
          alt="Logo"
          onClick={() => handleLogoClick()}
        />
        <nav className={`header-nav__links ${authHideClass}`}>
          <Link
            to="/artists"
            className={pathname === '/artists' ? 'active' : ''}
          >
            Artists
          </Link>
          <Link
            to="/distribute"
            className={`${activeUnitHideClass} ${
              pathname === '/distribute' ? 'active' : ''
            }`}
          >
            Distribute
          </Link>
          <Link
            to="/lyrics"
            className={`${activeUnitHideClass} ${
              pathname === '/lyrics' ? 'active' : ''
            }`}
          >
            Lyrics
          </Link>
          <Link
            to="/songs"
            className={`${activeUnitHideClass} ${
              pathname === '/songs' ? 'active' : ''
            }`}
          >
            Songs
          </Link>
          <Link to="/idols" className={pathname === '/idols' ? 'active' : ''}>
            Idols
          </Link>
          <Link to="/lab" className={pathname === '/lab' ? 'active' : ''}>
            Lab
          </Link>
          <div className={`header-admin ${adminHideClass}`}>
            <button
              className={
                pathname.includes('/admin')
                  ? 'header-admin__nav active'
                  : 'header-admin__nav'
              }
            >
              Admin Tools
            </button>
            <div className="header-admin__dropdown">
              <Link to="/admin/actions">Actions</Link>
              <Link to="/admin/manage">Manage</Link>
              <Link to="/admin/sync">Sync</Link>
              <Link to="/admin/temp">Test/Temp</Link>
              <Link to="/admin/ui-reference">UI Reference</Link>
            </div>
          </div>
        </nav>
      </div>
      {auth.isAuthenticated ? (
        <div className="header-user">
          <button className="header-user__nav">
            <img
              className="header-user__photo"
              src={auth.user.photoURL || userPlaceholder}
              alt="user"
            />
            {auth.user.displayName}
          </button>
          <div className="header-user__dropdown">
            <Link to="/user?tab=1">My Artists</Link>
            <Link to="/user?tab=2">My Distributions</Link>
            <hr />
            <a href="/" onClick={logout}>
              Sign out <Icon type="logout" inline />
            </a>
          </div>
        </div>
      ) : (
        <div className="header-user">
          <button
            className="btn btn-hollow header-user__btn"
            onClick={login}
            disabled={isPending}
          >
            {isPending ? (
              <LoadingIcon size="tiny" inline />
            ) : (
              <Fragment>
                Sign-in <Icon type="logout" color="white" inline />
              </Fragment>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

Menu.propTypes = {
  activeUnit: PropTypes.object,
  auth: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
  pending: PropTypes.object.isRequired,
};

Menu.defaultProps = {
  activeUnit: {},
  auth: {},
  history: {},
  location: {},
  login: () => {},
  logout: () => {},
};

export default Menu;
