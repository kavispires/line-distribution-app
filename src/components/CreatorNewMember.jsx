import React from 'react';
import ColorPicker from './ColorPicker';

const CreatorNewMember = ({id, props}) => {
  const COLORS = props.database.colors;
  const POSITIONS = props.database.positions;
  const MEMBER = props.creator.newMembers[id];

  let selectedColor = 'temp';
  if (MEMBER.colorId) selectedColor = MEMBER.colorId;

  return (
    <div className="form-member">
      <div className={`color-swatch color-${selectedColor}`} />
      <div className="info">
        <button className="btn-close" onClick={e => props.removeNewMember(e, id)}>×</button>
        <label htmlFor="memberName">Name*:</label>
        <input
          type="text"
          name="memberName"
          value={MEMBER.name}
          onChange={e => props.updateNewMember(e, id, 'name')} />
        <label htmlFor="memberBirthdate">Birthdate*:</label>
        <input
          type="date"
          name="memberBirthdate"
          value={MEMBER.birthdate}
          onChange={e => props.updateNewMember(e, id, 'birthdate')} />
        <label htmlFor="memberColor">Color*:</label>
        <select
          name="memberColor"
          value={MEMBER.colorId}
          onChange={e => props.updateNewMember(e, id, 'color')} >
          <option value="">Select a Color</option>
          {
            Object.keys(COLORS).map((index) => {
              const color = COLORS[index].name;
              const colorId = COLORS[index].id;
              return (
                <option key={color} value={colorId}>{color}</option>
              )
            })
          }
        </select>
        <ColorPicker props={props} memberId={MEMBER.id} action={props.updateNewMember} />
        <label htmlFor="memberPosition">Add Position*:</label>
        <select name="memberPosition" required onChange={e => props.updateNewMember(e, id, 'position')} >
          <option value="">Select Positions</option>
          {
            Object.keys(POSITIONS).map((index) => {
              const position = POSITIONS[index].name;
              const positionId = POSITIONS[index].id;
              return (
                <option key={position} value={positionId}>{position}</option>
              )
            })
          }
        </select>
        {
          MEMBER.positions.length > 0 ? (
            <div className="form-member-position-list">
              <p>Positions List:</p>
              <ul>
                {
                  MEMBER.positions.map((posId) => {
                    const position = POSITIONS[posId].name;
                    const positionId = POSITIONS[posId].id;
                    return (
                      <li
                        key={position}
                        className="form-member-position-item"
                      >
                        {position}
                        <button
                          className="btn-close"
                          onClick={e => props.removePosition(e, id, positionId)}>
                          ×
                        </button>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          ) : null
        }
      </div>
    </div>
    );
};

export default CreatorNewMember;
