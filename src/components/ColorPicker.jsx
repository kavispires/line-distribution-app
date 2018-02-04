import React from 'react';

const ColorPicker = ({props, memberId, action}) => {
  const COLORS = props.database.colors;
  const reactKey = Date.now();
  const memberColorId = props.creator.newMembers[memberId].colorId;

  return (
    <div className="color-picker">
      {
        Object.keys(COLORS).map((colorId) => {
          const selected = memberColorId === +colorId ? ' selected' : '';
          const color = { target: { value: colorId } };
          return (
            <div
              key={`color-${reactKey}-${colorId}`}
              className={`color-picker-swatch color-${colorId}${selected}`}
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
