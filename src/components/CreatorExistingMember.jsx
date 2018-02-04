import React from 'react';

const CreatorMember = ({id, props}) => {
  const MEMBER = props.database.members[id];
  const POSITIONS = props.database.positions;
  const COLOR_NAME = props.database.colors[MEMBER.colorId].name;

  return (
    <div className="form-member">
      <div className={`color-swatch color-${MEMBER.colorId}`} />
      <div className="info">
        <button className="btn-close" onClick={(e) => props.unloadMember(e, id)}>×</button>
        <label htmlFor="memberName">Name:</label>
        <input
          type="text"
          name="memberName"
          value={MEMBER.name}
          disabled="true"
        />
        <label htmlFor="memberBirthdate">Birthdate:</label>
        <input
          type="number"
          name="memberBirthdate"
          value={MEMBER.birthdate}
          disabled="true"
         />
        <label htmlFor="memberColor">Color:</label>
        <input
          type="text"
          name="memberColor"
          value={COLOR_NAME}
          disabled="true"
        />
        <label htmlFor="memberPosition">Position:</label>
        <ul className="pill-positions">
          {
            MEMBER.positions.map(posId => (
              <li key={`${MEMBER.name}-${posId}`} className="pill-position">
                {POSITIONS[posId].name}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default CreatorMember;
