import React from 'react';
import PropTypes from 'prop-types';

import { ICONS } from '../constants';

const Icon = ({ type, size, color }) => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: color,
    },
  };

  console.log('Icon props', type, color, size);

  return (
    <svg
      style={styles.svg}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 1024 1024"
    >
      <path style={styles.path} d={ICONS[type]} />
    </svg>
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

Icon.defaultProps = {
  size: 16,
  color: '#ff0000',
};

export default Icon;
