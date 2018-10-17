/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import shared components
import Icon from './shared/Icon';
// Import images
import logo from '../images/logo.svg';
import userPlaceholder from '../images/user-placeholder.svg';

const Header = ({ props }) => {
  const handleLogoClick = () => {
    props.history.push('/');
  };

  const { pathname } = props.location;

  return (
    <header className="header">
      <div className="header-nav">
        <img
          className="header-nav__logo"
          src={logo}
          alt="Logo"
          onClick={() => handleLogoClick()}
        />
        <nav className="header-nav__links">
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
          <Link to="/lab" className={pathname === '/lab' ? 'active' : ''}>
            Lab
          </Link>
          {props.auth.isAdmin ? (
            <div className="header-admin">
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
                <Link to="/admin/test">Test</Link>
              </div>
            </div>
          ) : null}
        </nav>
      </div>
      {props.auth.isAuthenticated ? (
        <div className="header-user">
          <button className="header-user__nav">
            <img
              className="header-user__photo"
              src={props.auth.user.photoURL || userPlaceholder}
              alt="user"
            />
            {props.auth.user.displayName}
          </button>
          <div className="header-user__dropdown">
            <Link to="/user/my-artists">My Artists</Link>
            <Link to="/user/my-distributions">My Distributions</Link>
            <hr />
            <a href="#" onClick={props.logout}>
              Sign out <Icon type="logout" inline />
            </a>
          </div>
        </div>
      ) : (
        <div className="header-user">
          <button
            className="btn btn-hollow header-user__btn"
            onClick={props.login}
          >
            Sign-in<Icon type="login" color="white" inline />
          </button>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  props: PropTypes.object.isRequired,
  auth: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
};

Header.defaultProps = {
  auth: {},
  history: {},
  location: {},
  login: () => {},
  logout: () => {},
};

export default Header;
