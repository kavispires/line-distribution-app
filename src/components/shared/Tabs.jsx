import React from 'react';
import PropTypes from 'prop-types';

import { capitalizeWord, spinalCaseWord } from '../../utils';

const Tabs = ({ tabs, active, action }) => {
  // Check for names and ids
  tabs.forEach((tab, index) => {
    if (tab.id !== undefined && tab.name === undefined) {
      tab.name = capitalizeWord(tab.id);
    }
    if (tab.id === undefined && tab.name !== undefined) {
      tab.id = spinalCaseWord(tab.name);
    }
    tab.key = `${tab.id}-${index}`;
    tab.isActive = active === tab.id ? 'selected' : '';
  });

  return (
    <ul className="tabs" onClick={action}>
      {tabs.map(tab => (
        <li key={tab.key} className={`tab ${tab.isActive}`} id={tab.id}>
          {tab.name}
        </li>
      ))}
    </ul>
  );
};

Tabs.propTypes = {
  action: PropTypes.func.isRequired,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  tabs: PropTypes.array.isRequired,
};

export default Tabs;
