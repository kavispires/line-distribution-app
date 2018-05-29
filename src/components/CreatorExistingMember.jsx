import React from 'react';

import PositionIcons from './icons/PositionIcons';

import { makeIdNumber } from '../utils';
import { POS_LIST } from '../constants';

const CreatorMember = ({member, props}) => {

  const POSITIONS = props.admin.positions;
  const COLOR_NAME = props.admin.colors[member.colorId].name;

  return (
    <div className="form-member">
      <div className={`color-swatch color-${makeIdNumber(member.colorId)}`} />
      <div className="info">
        <button className="btn-close" onClick={e => props.unloadMember(e, member.id)}>×</button>
        <label htmlFor="memberName">Name:</label>
        <input
          type="text"
          name="memberName"
          value={member.name}
          disabled="true"
        />
        <label htmlFor="memberBirthdate">Birthdate:</label>
        <input
          type="number"
          name="memberBirthdate"
          value={member.birthdate}
          disabled="true"
        />
        <label htmlFor="memberColor">Color:</label>
        <input
          type="text"
          name="memberColor"
          value={COLOR_NAME}
          disabled="true"
        />
        <label htmlFor="memberPosition">Select Position(s)*:</label>
        <div className="form-member-position-list">
          {
            POS_LIST.map((posGroup, i) => {
              const keyG = `posGroup-${member.id}-${i}`;
              return (
                <div key={keyG} className="form-member-position-list-group">
                  {
                    posGroup.map((posItem, j) => {
                      const keyI = `posItem-${member.id}-${i}-${j}`;
                      if (posItem === 'clear') {
                        return (
                          <button key={keyI} className="btn" onClick={e => props.clearPositions(e, member.id, true)}>Clear</button>
                        );
                      }
                      const evt = { target: { value: posItem } };
                      return (
                        <PositionIcons
                          key={keyI}
                          memberId={member.id}
                          positions={[posItem]}
                          iconClass={`icon-positions-picker ${member.positions[posItem] ? 'selected' : ''}`}
                          action={() => props.updateExistingMember(evt, member.id)}
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

export default CreatorMember;
