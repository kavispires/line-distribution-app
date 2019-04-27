import React from 'react';
import PropTypes from 'prop-types';

const ModeWidget = ({ labels, action, disabled, active }) => (
  <div className="mode-widget">
    {labels.map(label => {
      const activeClass = label === active ? 'mode-widget__label--active' : '';
      const isDisabled = disabled.includes(label)
        ? 'mode-widget__label--disabled'
        : '';
      return (
        <button
          key={label}
          className={`mode-widget__label ${activeClass} ${isDisabled}`}
          onClick={() => action(label)}
          disabled={isDisabled}
        >
          {label}
        </button>
      );
    })}
  </div>
);

ModeWidget.propTypes = {
  action: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  disabled: PropTypes.array,
  labels: PropTypes.array.isRequired,
};

ModeWidget.defaultProps = {
  disabled: [],
};

export default ModeWidget;
