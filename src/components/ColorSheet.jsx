import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColorSheet extends Component {
  componentDidMount() {
    // nothing
  }
  render() {
    const colors = Object.values(this.props.db.colors);
    return (
      <main className="container">
        <h1>Color Sheet</h1>
        <ul className="color-palette">
          {colors &&
            colors.map(colorObj => (
              <li
                key={colorObj.id}
                className={`palette background-color-${colorObj.number}`}
              >
                {colorObj.id}
                <br />
                {colorObj.name}
                <br />
                {colorObj.count} uses
              </li>
            ))}
        </ul>
      </main>
    );
  }
}

ColorSheet.propTypes = {
  db: PropTypes.object,
};

ColorSheet.defaultProps = {
  db: {},
};

export default ColorSheet;
