import React from 'react';

// Import common components
import {
  FavoriteIcon,
  Icon,
  LoadingIcon,
  Switch,
  Tabs,
  Typeahead,
} from '../../../common';

const NOOP = () => {};

const ComponentSheet = () => (
  <main className="container">
    <ul className="component-list">
      <li className="component-list__item">
        <h3 className="component-list__name">Favorite Icon</h3>
        <div className="component-list__example">
          <FavoriteIcon action={NOOP} id="1" />
          <FavoriteIcon action={NOOP} id="2" state />
        </div>
        <div className="component-list__description">
          <p>Heart shaped favorite icon</p>
          <b>Requires:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">
              action: onClick function
            </li>
            <li className="component-list__argument">
              id: value the action function calls
            </li>
          </ul>
          <b>Accepts:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">
              className: additional classes (default: &#39;&#39;)
            </li>
            <li className="component-list__argument">
              size: string or number (default: 12)
            </li>
            <li className="component-list__argument">
              state: boolean that determines if heart is red or gray (default:
              false)
            </li>
          </ul>
        </div>
      </li>
      <li className="component-list__item">
        <h3>Icon</h3>
        <div className="component-list__example">
          <Icon size={36} />
        </div>
        <div className="component-list__description">
          <p>See Icon tab for list of icons</p>
          <b>Accepts:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">
              type: the name of the icon (default: default)
            </li>
            <li className="component-list__argument">
              color: one of the default colors (default: default)
            </li>
            <li className="component-list__argument">
              size: string or number (default: 12)
            </li>
            <li className="component-list__argument">
              inline: boolean that determines if icon will be inline with text
              (default: false)
            </li>
          </ul>
        </div>
      </li>
      <li className="component-list__item">
        <h3>Loading Icon</h3>
        <div className="component-list__example">
          <LoadingIcon />
        </div>
        <div className="component-list__description">
          <p>Colored loading icon</p>
          <b>Accepts:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">
              size: tiny, small, medium (Default), large
            </li>
          </ul>
        </div>
      </li>
      <li className="component-list__item">
        <h3>Switch</h3>
        <div className="component-list__example">
          <Switch action={NOOP} /> <Switch action={NOOP} checked />
        </div>
        <div className="component-list__description">
          <p>Switch button to indicate if a feature is on</p>
          <b>Requires:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">
              action: function to be exectued when switch is triggers
            </li>
          </ul>
          <b>Accepts:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">
              labels: object with left and right values
            </li>
            <li className="component-list__argument">
              checked: boolean that determines if switch is on
            </li>
          </ul>
        </div>
      </li>
      <li className="component-list__item">
        <h3>Tabs</h3>
        <div className="component-list__example">
          <Tabs action={NOOP} tabs={['Tab 1', 'Tab 2']}>
            Content goes here as a component child
          </Tabs>
        </div>

        <div className="component-list__description">
          <p>Wrapper component with selectable tabs</p>
          <b>Requires:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">?</li>
          </ul>
          <b>Accepts:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">
              active: what tab is active (default: the first tab)
            </li>
            <li className="component-list__argument">
              iconCondition: boolean to display the icon
            </li>
            <li className="component-list__argument">
              icon: icon component to be displayed
            </li>
          </ul>
        </div>
      </li>
      <li className="component-list__item">
        <h3>Typeahead</h3>
        <div className="component-list__example">
          <Typeahead
            action={NOOP}
            name="example"
            suggestions={['Avocado', 'Banana', 'Cranberry']}
          />
        </div>
        <div className="component-list__description">
          <p>Input field with autocomplete datalist option</p>
          <b>Requires:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">
              action: function trigged when input is selected
            </li>
            <li className="component-list__argument">
              name: name of the datalist/input
            </li>
          </ul>
          <b>Accepts:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">
              className: additional classes (default: &#39;&#39;)
            </li>
            <li className="component-list__argument">
              placeholder: input field placeholder (default: Searching...)
            </li>
            <li className="component-list__argument">
              suggestions: list of suggestions to autocomplete in the datalist
              (default: [])
            </li>
          </ul>
        </div>
      </li>
      <li className="component-list__item">
        <h3>New Component</h3>
        <div className="component-list__example">
          {/* Component goes here */}
        </div>
        <div className="component-list__description">
          <p>Description</p>
          <b>Requires:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">?</li>
          </ul>
          <b>Accepts:</b>
          <ul className="component-list__arguments">
            <li className="component-list__argument">?</li>
          </ul>
        </div>
      </li>
    </ul>
  </main>
);

export default ComponentSheet;
