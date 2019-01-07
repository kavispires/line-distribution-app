/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import common components
import { Icon } from '../../../common';
// Import images
import logo from '../../../../images/logo.svg';
import userPlaceholder from '../../../../images/user-placeholder.svg';

const Menu = ({ auth, history, location, login, logout }) => {
  const handleLogoClick = () => {
    history.push('/');
  };

  const { pathname } = location;

  // Hide parts of the menu if user is not authenticaded
  const authHideClass = auth.isAuthenticated ? '' : 'hidden';

  // Hide parts of the menu if user is not an administrator
  const adminHideClass = auth.isAdmin ? '' : 'hidden';

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
            className={pathname === '/distribute' ? 'active' : ''}
          >
            Distribute
          </Link>
          <Link to="/songs" className={pathname === '/songs' ? 'active' : ''}>
            Songs
          </Link>
          <Link
            to="/members"
            className={pathname === '/members' ? 'active' : ''}
          >
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
              <Link to="/admin/color-sheet">Color Sheet</Link>
              <Link to="/admin/icon-sheet">Icon Sheet</Link>
              <Link to="/admin/manage">Manage</Link>
              <Link to="/admin/sync">Sync</Link>
              <Link to="/admin/temp">Test/Temp</Link>
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
            <Link to="/user/my-artists">My Artists</Link>
            <Link to="/user/my-distributions">My Distributions</Link>
            <hr />
            <a href="#" onClick={logout}>
              Sign out <Icon type="logout" inline />
            </a>
          </div>
        </div>
      ) : (
        <div className="header-user">
          <button className="btn btn-hollow header-user__btn" onClick={login}>
            Sign-in<Icon type="login" color="white" inline />
          </button>
        </div>
      )}
    </header>
  );
};

Menu.propTypes = {
  auth: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
};

Menu.defaultProps = {
  auth: {},
  history: {},
  location: {},
  login: () => {},
  logout: () => {},
};

export default Menu;
