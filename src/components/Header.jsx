/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import userPlaceholder from '../images/user-placeholder.svg';
import Icon from './Icon';

const Header = ({ props }) => {
  const handleLogoClick = () => {
    props.history.push('/');
  };

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
          <Link to="/artists" className="active">
            Artists
          </Link>
          <Link to="/distribute">Distribute</Link>
          <Link to="/songs">Songs</Link>
          <Link to="/lab">Lab</Link>
          {/* {props.auth.isAdmin ? ( */}
          <div className="header-admin">
            <button className="header-admin__nav">Admin Tools</button>
            <div className="header-admin__dropdown">
              <Link to="/admin/color-sheet">Color Sheet</Link>
              <Link to="/admin/icon-sheet">Icon Sheet</Link>
              <Link to="/admin/manage">Manage</Link>
              <Link to="/admin/sync">Sync</Link>
              <Link to="/admin/test">Test</Link>
            </div>
          </div>
          {/* ) : null} */}
        </nav>
      </div>
      {/* {props.auth.isAuthenticated ? ( */}
      <div className="header-user">
        <button className="header-user__nav">
          <img
            className="header-user__photo"
            src={userPlaceholder}
            alt="user"
          />
          {/* {props.auth.user.displayName} */}
          Bob the placeholder
        </button>
        <div className="header-user__dropdown">
          <Link to="/user/my-artists">My Artists</Link>
          <Link to="/user/my-distributions">My Distributions</Link>
          <hr />
          <a href="#">
            <Icon type="logout" />Sign out
          </a>
        </div>
      </div>
      {/* ) : ( */}
      {/* <button className="header-user__btn">
        <Icon type="login" />
      </button> */}
      {/* )} */}
      {/* {props.admin.adminTools ? ( */}
      {/* <div className="app-header-admin">
        <span className="app-logo-placeholder" />
        <nav className="app-nav">
          <Link to="/admin/colorsheet">Color Sheet</Link>
          <Link to="/admin/iconsheet">Icon Sheet</Link>
          <Link to="/admin/manage">Manage</Link>
          <Link to="/admin/sync">Sync</Link>
          <Link to="/admin/test">Test</Link>

          <Link to="/admin/create">xCreatex</Link>
        </nav>
      </div>
      ) : null} */}
    </header>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
