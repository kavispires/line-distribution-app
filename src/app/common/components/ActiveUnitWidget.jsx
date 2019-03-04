import React from 'react';
import PropTypes from 'prop-types';

// Import utility functions
import utils from '../../../utils';

const ActiveUnitWidget = ({ activeUnit, showMembers, inline }) => {
  // Return nothing if currentUnit is not available
  if (!activeUnit.id) {
    return null;
  }

  const inlineClass = inline ? 'inline' : '';

  return (
    <section className={`active-widget ${inlineClass}`}>
      <h3>Active Unit:</h3>
      <div className="active-widget__content">
        <h1>
          {activeUnit.artistName.toUpperCase()}{' '}
          <span className="active-widget__unit">({activeUnit.name})</span>
          <span className="active-widget__genre">
            {activeUnit.genre} - {Object.values(activeUnit.members).length}{' '}
            members
          </span>
        </h1>
        {showMembers ? (
          <ul className="active-widget__members">
            {Object.values(activeUnit.members).map(member => (
              <li
                key={member.id}
                className={`pill background-color-${utils.getColorNumber(
                  member.colorId
                )}`}
              >
                {member.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="active-widget__members-count">3</p>
        )}
      </div>
    </section>
  );
};

ActiveUnitWidget.propTypes = {
  activeUnit: PropTypes.object,
  inline: PropTypes.bool,
  showMembers: PropTypes.bool,
};

ActiveUnitWidget.defaultProps = {
  activeUnit: {},
  inline: false,
  showMembers: false,
};

export default ActiveUnitWidget;
