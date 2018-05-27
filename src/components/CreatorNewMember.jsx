import React from 'react';
import ColorPicker from './ColorPicker';

import PositionIcons from './icons/PositionIcons';

import { makeIdNumber } from '../utils';

const CreatorNewMember = ({id, props}) => {
  const COLORS = props.admin.colors;
  const POSITIONS = props.admin.positions;
  const MEMBER = props.creator.newMembers[id];

  const posList = [
    ['pos000001', 'pos000011', 'pos000012', 'pos000013'],
    ['pos000002', 'pos000005', 'pos000008'],
    ['pos000003', 'pos000006', 'pos000010'],
    ['pos000004', 'pos000007', 'pos000009', 'clear'],
  ];

  let selectedColor = 'temp';
  if (MEMBER.colorId) selectedColor = MEMBER.colorId;

  return (
    <div className="form-member">
      <div className={`color-swatch color-${makeIdNumber(selectedColor)}`} />
      <div className="info">
        <button className="btn-close" onClick={e => props.removeNewMember(e, id)}>×</button>
        <label htmlFor="memberName">Name*:</label>
        <input
          type="text"
          name="memberName"
          value={MEMBER.name}
          onChange={e => props.updateNewMember(e, id, 'name')}
        />
        <label htmlFor="memberBirthdate">Birthdate*:</label>
        <input
          type="date"
          name="memberBirthdate"
          value={MEMBER.birthdate}
          onChange={e => props.updateNewMember(e, id, 'birthdate')}
        />
        <label htmlFor="memberColor">Color*:</label>
        <input
          type="text"
          name="memberColor"
          value={MEMBER.colorId ? COLORS[MEMBER.colorId].name : ''}
          disabled
        />
        <ColorPicker props={props} memberId={MEMBER.id} action={props.updateNewMember} />
        <label htmlFor="memberPosition">Add Position(s)*:</label>
        <div className="form-member-position-list">
          {
            posList.map((posGroup, i) => {
              const keyG = `posGroup-${MEMBER.id}-${i}`;
              return (
                <div key={keyG} className="form-member-position-list-group">
                  {
                    posGroup.map((posItem, j) => {
                      const keyI = `posItem-${MEMBER.id}-${i}-${j}`;
                      if (posItem === 'clear') {
                        return (
                          <button key={keyI} className="btn" onClick={e => props.clearPositions(e, id)}>Clear</button>
                        );
                      }
                      const evt = { target: { value: posItem } };
                      return (
                        <PositionIcons
                          key={keyI}
                          memberId={MEMBER.id}
                          positions={[posItem]}
                          iconClass={`icon-positions-picker ${MEMBER.positions[posItem] ? 'selected' : ''}`}
                          action={() => props.updateNewMember(evt, id, 'position')}
                        />
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default CreatorNewMember;
