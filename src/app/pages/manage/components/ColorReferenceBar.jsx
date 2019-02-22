import React from 'react';
import PropTypes from 'prop-types';

const ColorReferenceBar = ({ colors, colorsInUse }) => (
  <ul className="color-reference-bar">
    {Object.values(colors).map(color => {
      const isInUse = colorsInUse[color.id]
        ? 'color-reference-item--in-use'
        : '';
      return (
        <li
          className={`color-reference-item background-color-${
            color.number
          } ${isInUse}`}
          key={color.id}
        >
          {color.name}
          <br />
          {color.count}
        </li>
      );
    })}
  </ul>
);

ColorReferenceBar.propTypes = {
  colors: PropTypes.object,
  colorsInUse: PropTypes.object,
};

ColorReferenceBar.defaultProps = {
  colors: {},
  colorsInUse: PropTypes.object,
};

export default ColorReferenceBar;
