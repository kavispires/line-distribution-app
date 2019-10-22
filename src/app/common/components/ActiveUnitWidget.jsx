import React from 'react';
import PropTypes from 'prop-types';

// Import common components
import { Icon } from '..';
// Import utility functions
import utils from '../../../utils';

const ActiveUnitWidget = ({ activeUnit, showMembers, inline, ...props }) => {
  // Return nothing if currentUnit is not available
  if (!activeUnit.id) {
    return null;
  }

  const inlineClass = inline ? 'inline' : '';

  const goToUnit = () => {
    props.history.push(`/artists/${activeUnit.artistId}`);
  };

  return (
    <section className={`active-widget ${inlineClass}`}>
      <h3>Active Unit:</h3>
      <button
        className="active-widget__go-to-button"
        onClick={() => goToUnit()}
      >
        <Icon type="go-to" />
      </button>
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
            {activeUnit.members.map(member => (
              <li
                key={member.id}
                className={`pill background-color-${member.color}`}
              >
                {member.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="active-widget__members-count">
            {activeUnit.members.length || 0}
          </p>
        )}
      </div>
    </section>
  );
};

ActiveUnitWidget.propTypes = {
  activeUnit: PropTypes.object,
  history: PropTypes.object.isRequired,
  inline: PropTypes.bool,
  showMembers: PropTypes.bool,
};

ActiveUnitWidget.defaultProps = {
  activeUnit: {},
  inline: false,
  showMembers: false,
};

export default ActiveUnitWidget;
