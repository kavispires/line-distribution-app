/* eslint react/require-default-props: 0 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import common components
import { Icon, LoadingIcon } from '../../../common';
// Import images
import logo from '../../../../images/logo.svg';
import userPlaceholder from '../../../../images/user-placeholder.svg';

const Menu = ({ activeUnit, history, location, login, logout, user }) => {
  const { pathname } = location;

  // Hide parts of the menu if user is not authenticaded
  const authHideClass = user.isSuccessful ? '' : 'hidden';

  // Hide parts of the menu if user is not an administrator
  const adminHideClass = user.data?.isAdmin ? '' : 'hidden';

  // Hide parts of the menu if user hasn't selected an active unit
  const activeUnitHideClass = activeUnit.id ? '' : 'hidden';

  return (
    <header className="header">
      <div className="header-nav">
        <img
          className="header-nav__logo"
          src={logo}
          alt="Logo"
          onClick={() => history.push('/')}
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
      {user.isSuccessful ? (
        <div className="header-user">
          <button className="header-user__nav">
            <img
              className="header-user__photo"
              src={user.data?.photoURL || userPlaceholder}
              alt="user"
            />
            {user.data.displayName}
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
            onClick={() => login.login()}
            disabled={user.isPending}
          >
            {user.isPending ? (
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
  history: PropTypes.object,
  location: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

Menu.defaultProps = {
  activeUnit: {},
  history: {},
  location: {},
};

export default Menu;
