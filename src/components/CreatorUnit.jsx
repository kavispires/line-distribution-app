import React from 'react';
import PropTypes from 'prop-types';

const CreatorUnit = ({ props }) => {
  const ADMIN = props.admin;
  const CREATOR = props.creator;
  const unitDisabled = +CREATOR.loadedUnit !== 0;

  return (
    <form className="creator-form">
      <div className="form-instance-full form-instance-highlighted">
        <label htmlFor="loadUnit">Use Existing Unit:</label>
        <select
          name="loadUnit"
          value={CREATOR.loadedUnit}
          onChange={props.loadUnit}
        >
          <option value="0">Select an unit to load...</option>
          {CREATOR.newArtistUnits.map(unitId => {
            const unit = ADMIN.units[unitId];
            return (
              <option key={`unit-${unit.id}`} value={unit.id}>
                {unit.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-instance">
        <label htmlFor="unitName">
          Unit/Version Name<span className="hint">
            {' '}
            (e.g.: 'OT8', 'Feat. JYP', 'Season 2')
          </span>:
        </label>
        <input
          type="text"
          name="unitName"
          value={CREATOR.newUnitName}
          onChange={props.handleNewUnitName}
          disabled={unitDisabled}
        />
      </div>
      <div className="form-instance">
        <label htmlFor="debutYear">Debut Year:</label>
        <input
          type="text"
          name="debutYear"
          value={CREATOR.newUnitDebutYear}
          onChange={props.handleNewUnitDebutYear}
          disabled={unitDisabled}
        />
      </div>
      <div className="form-instance-full">
        <label htmlFor="official">Official:</label>
        <input
          type="checkbox"
          name="official"
          checked={CREATOR.newUnitOfficial}
          onChange={props.handleNewUnitOfficial}
          disabled={unitDisabled}
        />
        <small>
          {' '}
          (Mark this option only if it's an official assemble, not fanmade, and
          not special performance or tv show)
        </small>
      </div>
    </form>
  );
};

CreatorUnit.propTypes = {
  props: PropTypes.object.isRequired, // eslint-disable-line
};

export default CreatorUnit;
