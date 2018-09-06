/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

const Header = ({ props }) => {
  const handleLogoClick = () => {
    props.history.push('/');
  };

  return (
    <header className="app-header">
      <div className="app-header-nav">
        <img
          className="app-logo"
          src={logo}
          alt="Logo"
          role="button"
          tabIndex={0}
          onClick={handleLogoClick}
        />
        <nav className="app-nav">
          <Link to="/artists">Artists</Link>
          <Link to="/distribute">Distribute</Link>
          <Link to="/songs">Songs</Link>
          {props.auth.isAdmin ? (
            <span role="button" tabIndex={0} onClick={props.toggleAdminTools}>
              Admin Tools
            </span>
          ) : null}
        </nav>
      </div>
      {props.auth.isAuthenticated ? (
        <div className="app-header-user">
          <img
            className="user-photo"
            src={props.auth.user.photoURL}
            alt="user"
          />
          {props.auth.user.displayName}
          <button className="app-header-btn" onClick={props.logout}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="app-header-user">
          <button className="app-header-btn" onClick={props.login}>
            Sign in
          </button>
        </div>
      )}
      {props.admin.adminTools ? (
        <div className="app-header-admin">
          <span className="app-logo-placeholder" />
          <nav className="app-nav">
            <Link to="/admin/colorsheet">Color Sheet</Link>
            <Link to="/admin/iconsheet">Icon Sheet</Link>
            <Link to="/admin/manage">Manage</Link>
            <Link to="/admin/sync">Sync</Link>
            <Link to="/admin/test">Test</Link>

            <Link to="/admin/create">xCreatex</Link>
            <Link to="/admin/romanizer">xRomanizerx</Link>
            <Link to="/admin/database">xDatabasex</Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

Header.propTypes = {
  admin: PropTypes.object,
  auth: PropTypes.object,
  history: PropTypes.object,
  props: PropTypes.any.isRequired,
  login: PropTypes.func,
  logout: PropTypes.func,
  toggleAdminTools: PropTypes.func,
};

Header.defaultProps = {
  admin: {},
  auth: {},
  history: {},
  login: () => {},
  logout: () => {},
  toggleAdminTools: () => {},
};

export default Header;
