import React from 'react';

const CreatorMember = ({id, props}) => {
  const COLORS_LIST = props.app.colorList;
  const POSITIONS_LIST = props.app.positionList;
  const MEMBER = props.creator.newMembers[id];

  let selectedColor = 'temp';
  if (MEMBER.colorId) selectedColor = COLORS_LIST[MEMBER.colorId].name;

  return (
    <div className="form-member">
      <div className={`color-swatch color-${selectedColor}`} />
      <div className="info">
        <button className="btn-close" onClick={(e) => props.removeNewMember(e, id)}>×</button>
        <label htmlFor="memberName">Name*:</label>
        <input
          type="text"
          name="memberName"
          value={MEMBER.name}
          onChange={(e) => props.updateNewMember(e, id, 'name')} />
        <label htmlFor="memberBirthdate">Birthdate*:</label>
        <input
          type="date"
          name="memberBirthdate"
          value={MEMBER.birthdate}
          onChange={(e) => props.updateNewMember(e, id, 'birthdate')} />
        <label htmlFor="memberColor">Color*:
          </label>
          <select
            name="memberColor"
            value={MEMBER.colorId}
            onChange={(e) => props.updateNewMember(e, id, 'color')} >
            <option value="">Select a Color</option>
            {
              Object.keys(COLORS_LIST).map(index => {
                const color = COLORS_LIST[index].name;
                const colorId = COLORS_LIST[index].id;
                return (
                  <option key={color} value={colorId}>{color}</option>
                )
              })
            }
          </select>
        <label htmlFor="memberPosition">Add Position*:</label>
        <select name="memberPosition" required onChange={(e) => props.updateNewMember(e, id, 'position')} >
          <option value="">Select Positions</option>
          {
            Object.keys(POSITIONS_LIST).map(index => {
              const position = POSITIONS_LIST[index].name;
              const positionId = POSITIONS_LIST[index].id;
              return (
                <option key={position} value={positionId}>{position}</option>
              )
            })
          }
        </select>
        {
          MEMBER.position.length > 0 ? (
            <div className="form-member-position-list">
              <p>Positions List:</p>
              <ul>
                {
                  MEMBER.position.map(posId => {
                    const position = POSITIONS_LIST[posId].name;
                    const positionId = POSITIONS_LIST[posId].id;
                    console.log(posId, position, positionId);
                    return (
                      <li key={position} className="form-member-position-item">{position} <button className="btn-close" onClick={(e) => props.removePosition(e, id, positionId)}>×</button></li>
                    )
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

export default CreatorMember;
