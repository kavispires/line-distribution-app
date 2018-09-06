import React from 'react';
import PropTypes from 'prop-types';

// Import shared components
import Icon from './Icon';
// Import utility functions
import { capitalizeWord, spinalCaseWord, bem } from '../../utils';

const Tabs = ({
  tabs,
  active,
  action,
  iconCondition,
  iconType = 'default',
}) => {
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

  let icon;
  if (iconCondition) {
    icon = <Icon type={iconType} />;
  }

  return (
    <ul className="tabs" onClick={action}>
      {tabs.map(tab => (
        <li
          key={tab.key}
          className={bem('tabs', tab.isActive, 'tab')}
          id={tab.id}
        >
          {tab.name} {icon}
        </li>
      ))}
    </ul>
  );
};

Tabs.propTypes = {
  action: PropTypes.func.isRequired,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabs: PropTypes.array.isRequired,
  iconCondition: PropTypes.string,
  iconType: PropTypes.string,
};

Tabs.defaultProps = {
  active: 0,
  iconCondition: null,
  iconType: 'default',
};

export default Tabs;
