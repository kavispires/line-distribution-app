import React from 'react';
import PropTypes from 'prop-types';

// Import utility functions
import utils from '../../../../utils';

const ColorSheet = ({ colors }) => {
  colors = Object.values(colors);
  return (
    <main className="container">
      <ul className="color-palette">
        {colors &&
          colors.map(colorObj => (
            <li
              key={colorObj.id}
              className={`palette background-color-${colorObj.id}`}
            >
              {colorObj.id}
              <br />
              {utils.humanize(colorObj.name, 'Capital')}
              <br />
              {colorObj.count} uses
            </li>
          ))}
      </ul>
    </main>
  );
};

ColorSheet.propTypes = {
  colors: PropTypes.object,
};

ColorSheet.defaultProps = {
  colors: {},
};

export default ColorSheet;
