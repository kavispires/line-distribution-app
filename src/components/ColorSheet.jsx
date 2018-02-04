import React from 'react';

import { ALTERNATIVE_COLOR_LIST } from '../constants';

const ColorSheet = (props) => {
  const { app, database } = props;
  return (
    <div className="container">
      <h1>Color Sheet</h1>

      {
        app.colorSheetTab === 'list' ? (
          <p>The numbers indicate how many times each color appears in the database.</p>
        ) : null
      }
      {
        app.colorSheetTab === 'alternative' ? (
          <p>Each swatch has 3-5 automaticly generated alternative colors.</p>
        ) : null
      }

      <ul className="tabs" onClick={props.toggleColorSheetTab}>
        <li className={`tab ${app.colorSheetTab === 'list' ? 'selected' : ''}`} id="list">List</li>
        <li className={`tab ${app.colorSheetTab === 'alternative' ? 'selected' : ''}`} id="alternative">Alternative List</li>
      </ul>
      {
        app.colorSheetTab === 'list' ? (
          <ul className="color-palette">
            {
            Object.keys(database.colors).map((id) => {
              const color = database.colors[id].name;
              return (
                <li key={color} className={`palette color-${id}`}>
                  #{id}<br />
                  {color}<br />
                  {app.colorCount[id]} uses
                </li>
              );
            })
          }
          </ul>
        ) : null
      }
      {
        app.colorSheetTab === 'alternative' ? (
          <ul className="color-palette">
            {
            Object.keys(database.colors).map((id) => {
              const color = database.colors[id].name;
              return (
                <li key={color} className="palette-alt">
                  <div className={`palette-main color-${id}`}>
                    #{id}<br />
                    {color}
                  </div>
                  <div className="palette-alt-group">
                    {
                      ALTERNATIVE_COLOR_LIST[id].map(altId => (
                        <div key={`${id}-${altId}`} className={`palette-alt-swatch color-${altId}`}>
                          {altId}
                        </div>
                      ))
                    }
                  </div>
                </li>
              );
            })
          }
          </ul>
        ) : null
      }
    </div>
  );
};

export default ColorSheet;
