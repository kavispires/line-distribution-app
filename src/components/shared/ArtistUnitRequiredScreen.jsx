import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import utility functions
import { bem } from '../../utils';

const ArtistUnitRequiredScreen = ({ title, description }) => (
  <main className={bem('container', 'flex')}>
    <section className="section--padding">
      <h1>{title}</h1>
      <div>
        <p>
          You must select an Artist and Unit in the{' '}
          <Link to="/artists">Artists Page</Link> before {description}.
        </p>
      </div>
    </section>
  </main>
);

ArtistUnitRequiredScreen.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ArtistUnitRequiredScreen;
