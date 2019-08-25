import React from 'react';
import PropTypes from 'prop-types';

// Import utility functions
import utils from '../../../utils';

const Tabs = ({ tabs, active, action, icons, ...props }) => {
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
    tabObj.icons = Object.entries(icons).map(([condition, icon]) =>
      tab[condition] ? icon : null
    );
    return tabObj;
  });

  return (
    <section className="tabs-container">
      <ul className="tabs" onClick={action}>
        {tabs.map(tab => (
          <li
            key={tab.key}
            className={utils.bem('tabs', tab.isActive, 'tab')}
            id={tab.id}
          >
            {tab.name} {tab.icons.map(icon => icon)}
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
  icons: PropTypes.objectOf(PropTypes.element),
  tabs: PropTypes.array.isRequired,
};

Tabs.defaultProps = {
  active: null,
  icons: [],
};

export default Tabs;
