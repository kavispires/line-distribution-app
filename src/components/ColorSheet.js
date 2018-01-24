import React from 'react';

const ColorSheet = (props) => {
  return (
    <div className="container">
      <h1>Color Sheet</h1>
      <small>The numbers indicate how many times each color appears in the database.</small>
      <ul className="color-palette">
      {
        Object.keys(props.app.colorList).map(id => {
          const color = props.app.colorList[id].name;
          return (
            <li key={color} className={`palette color-${color}`}>
            {props.app.colorCount[color]}<br />
            {color}
            </li>
          )
        })
      }
      </ul>
    </div>
    );
};

export default ColorSheet;
