import React from 'react';
import PropTypes from 'prop-types';

// Import utility functions
import utils from '../../utils';

const Tabs = ({ tabs, active, action, iconCondition, icon }) => {
  // Check for names and ids
  tabs.forEach((tab, index) => {
    if (tab.id !== undefined && tab.name === undefined) {
      tab.name = utils.capitalizeWord(tab.id);
    }
    if (tab.id === undefined && tab.name !== undefined) {
      tab.id = utils.spinalCaseWord(tab.name);
    }
    tab.key = `${tab.id}-${index}`;
    tab.isActive = active === tab.id ? 'selected' : '';
    tab.showIcon = tab[iconCondition] || false;
  });

  let iconComponent;
  if (iconCondition) {
    iconComponent = icon;
  }

  return (
    <ul className="tabs" onClick={action}>
      {tabs.map(tab => (
        <li
          key={tab.key}
          className={utils.bem('tabs', tab.isActive, 'tab')}
          id={tab.id}
        >
          {tab.name} {tab.showIcon ? iconComponent : null}
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
  icon: PropTypes.object,
};

Tabs.defaultProps = {
  active: 0,
  iconCondition: '',
  icon: null,
};

export default Tabs;
