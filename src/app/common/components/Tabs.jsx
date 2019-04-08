import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import utility functions
import utils from '../../../utils';

const Tabs = ({ tabs, active, action, icons, iconConditions, ...props }) => {
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
    tabObj.showIcons = iconConditions.map(condition => tab[condition] || false);
    return tabObj;
  });

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
            {tab.name}{' '}
            <Fragment>
              {tab.showIcons.map((show, index) => {
                if (show) {
                  return icons[index];
                }
                return null;
              })}
            </Fragment>
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
  iconConditions: PropTypes.array,
  icons: PropTypes.array,
  tabs: PropTypes.array.isRequired,
};

Tabs.defaultProps = {
  active: 0,
  iconConditions: [],
  icons: [],
};

export default Tabs;
