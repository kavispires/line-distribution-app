import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ComponentExample = ({
  name,
  description,
  requiredArguments,
  optionalArguments,
  children,
}) => (
  <li className="component-list__item">
    <h3 className="component-list__name">{name}</h3>
    <div className="component-list__example">
      <Fragment>{children}</Fragment>
    </div>
    <div className="component-list__description">
      <p>{description}</p>
      {Boolean(requiredArguments.length) && (
        <Fragment>
          <b>Requires:</b>
          <ul className="component-list__arguments">
            {requiredArguments.map(requiredArg => (
              <li key={requiredArg} className="component-list__argument">
                {requiredArg}
              </li>
            ))}
          </ul>
        </Fragment>
      )}
      {Boolean(optionalArguments.length) && (
        <Fragment>
          <b>Accepts:</b>
          <ul className="component-list__arguments">
            {optionalArguments.map(additionalArg => (
              <li key={additionalArg} className="component-list__argument">
                {additionalArg}
              </li>
            ))}
          </ul>
        </Fragment>
      )}
    </div>
  </li>
);

ComponentExample.defaultProps = {
  requiredArguments: [],
  optionalArguments: [],
};

ComponentExample.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  requiredArguments: PropTypes.arrayOf(PropTypes.string),
  optionalArguments: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ComponentExample;
