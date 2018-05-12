import React from 'react';

import { makeIdNumber } from '../utils';

const ColorPicker = ({ props, memberId, action }) => {
  const COLORS = props.admin.colors;
  const reactKey = Date.now();
  const memberColorId = props.creator.newMembers[memberId].colorId;

  return (
    <div className="color-picker">
      {
        Object.keys(COLORS).map((colorId) => {
          const selected = memberColorId === colorId ? ' selected' : '';
          const color = { target: { value: colorId } };
          return (
            <div
              role="button"
              tabIndex={0}
              key={`color-${reactKey}-${colorId}`}
              className={`color-picker-swatch color-${makeIdNumber(colorId)}${selected}`}
              id={colorId}
              onClick={() => props.updateNewMember(color, memberId, 'color')}
            />
          );
        })
      }
    </div>
  );
};

export default ColorPicker;
