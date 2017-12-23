import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

const Header = () => {
  return (
    <header className="ld-header">
      <img className="ld-logo" src={logo} alt="Logo" />
      <nav className="ld-nav">
        <Link to="/artists">Artists</Link>
        <Link to="/distribute">Distribute</Link>
        <Link to="/create">Create</Link>
        <Link to="/lyrics">Lyrics</Link>
        <Link to="/colorsheet">Color Sheet</Link>
      </nav>
    </header>
  );
};

export default Header;
