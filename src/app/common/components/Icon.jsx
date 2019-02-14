import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_COLORS } from '../../../utils/constants';
import ICONS from '../../../utils/icons';

const Icon = ({ type, size, color, inline }) => {
  const margin = inline ? '0 3px' : 0;

  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
      margin,
    },
    path: {
      fill: DEFAULT_COLORS[color],
    },
  };

  return (
    <svg
      style={styles.svg}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 100 100"
    >
      <path style={styles.path} d={ICONS[type]} className={`icon-${type}`} />
    </svg>
  );
};

Icon.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  inline: PropTypes.bool,
};

Icon.defaultProps = {
  type: 'default',
  size: 12,
  color: 'default',
  inline: false,
};

export default Icon;
