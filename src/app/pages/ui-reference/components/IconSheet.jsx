import React from 'react';

// Import common components
import { Icon } from '../../../common';
// Inport utility functions
import ICONS from '../../../../utils/icons';

const IconSheet = () => (
  <main className="container">
    <ul className="icon-list">
      {Object.keys(ICONS).map(name => (
        <li key={name} className="icon-list__item">
          <span className="icon-list__name">{name.toLowerCase()}</span>
          <Icon type={name} size="36" />
        </li>
      ))}
    </ul>
  </main>
);

export default IconSheet;
