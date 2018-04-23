import React, { Component } from 'react';

import { ALTERNATIVE_COLOR_LIST } from '../constants';
import { makeSixDigit, makeIdNumber } from '../utils';

class ColorSheet extends Component {
  componentWillMount() {
    if (this.props.db.loaded) {
      this.props.initColorSheet();
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.db.loaded !== this.props.db.loaded) {
      this.props.initColorSheet();
      this.render();
    }
  }

  render() {
    const ADMIN = this.props.admin;
    const APP = this.props.app;

    return (
      <div className="container">
        <h1>Color Sheet</h1>

        {
          ADMIN.colorSheetTab === 'list' ? (
            <p>The numbers indicate how many times each color appears in the database.</p>
          ) : null
        }
        {
          ADMIN.colorSheetTab === 'alternative' ? (
            <p>Each swatch has 3-5 automatically generated alternative colors.</p>
          ) : null
        }

        <ul className="tabs" onClick={this.props.toggleColorSheetTab}>
          <li className={`tab ${ADMIN.colorSheetTab === 'list' ? 'selected' : ''}`} id="list">List</li>
          <li className={`tab ${ADMIN.colorSheetTab === 'alternative' ? 'selected' : ''}`} id="alternative">Alternative List</li>
        </ul>

        {
          ADMIN.colorSheetTab === 'list' ? (
            <ul className="color-palette">
              {
                Object.keys(ADMIN.colors).map((key) => {
                  const color = ADMIN.colors[key];
                  return (
                    <li key={color.id} className={`palette ${color.class}`}>
                      {key}<br />
                      {color.name}<br />
                      {ADMIN.colorCount[key]} uses
                    </li>
                  );
                })
              }
            </ul>
          ) : null
        }
        {
          ADMIN.colorSheetTab === 'alternative' ? (
            <ul className="color-palette">
              {
              Object.keys(ADMIN.colors).map((key) => {
                const color = ADMIN.colors[key];
                return (
                  <li key={color.id} className="palette-alt">
                    <div className={`palette-main ${color.class}`}>
                      #{key}<br />
                      {color.name}
                    </div>
                    <div className="palette-alt-group">
                      {
                        ALTERNATIVE_COLOR_LIST[makeIdNumber(key)].map((num) => {
                          const altId = `col${makeSixDigit(num)}`;
                          return (
                            <div key={`${key}-${altId}`} className={`palette-alt-swatch color-${num}`}>
                              {makeIdNumber(altId)}
                            </div>
                          )
                        }

                        )
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
  }

}

export default ColorSheet;
