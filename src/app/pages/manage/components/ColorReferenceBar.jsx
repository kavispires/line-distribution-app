import React from 'react';
import PropTypes from 'prop-types';

const ColorReferenceBar = ({ colors }) => (
  <ul className="color-reference-bar">
    {Object.values(colors).map(color => (
      <li className={`color-reference-item background-color-${color.number}`}>
        {color.name}
        <br />
        {color.count}
      </li>
    ))}
  </ul>
);

ColorReferenceBar.propTypes = {
  colors: PropTypes.object,
};

ColorReferenceBar.defaultProps = {
  colors: {},
};

export default ColorReferenceBar;
