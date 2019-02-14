import React from 'react';
import PropTypes from 'prop-types';

// Import utility functions
import utils from '../../../utils';

const Tabs = ({ tabs, active, action, iconCondition, icon, ...props }) => {
  // Check for names and ids
  tabs = tabs.map((tab, index) => {
    const tabObj = {
      name: tab.name || tab,
      id: tab.id || tab,
    };
    if (tab.id !== undefined && tab.name === undefined) {
      tabObj.name = utils.capitalizeWord(tab.id);
    }
    if (tab.id === undefined && tab.name !== undefined) {
      tabObj.id = utils.spinalCaseWord(tab.name);
    }

    tabObj.key = `${tab.id}-${index}`;
    tabObj.isActive = active === tab.id || active === tab ? 'selected' : '';
    tabObj.showIcon = tab[iconCondition] || false;
    return tabObj;
  });

  // Build icon component
  let iconComponent;
  if (iconCondition) {
    iconComponent = icon;
  }

  // Activate first tab if action paramenter is not available
  if (!active) {
    tabs[0].isActive = 'selected';
  }

  return (
    <section className="tabs-container">
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
      <div className="tabs-content">{props.children}</div>
    </section>
  );
};

Tabs.propTypes = {
  action: PropTypes.func.isRequired,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.any.isRequired,
  iconCondition: PropTypes.string,
  icon: PropTypes.object,
  tabs: PropTypes.array.isRequired,
};

Tabs.defaultProps = {
  active: 0,
  iconCondition: '',
  icon: null,
};

export default Tabs;
