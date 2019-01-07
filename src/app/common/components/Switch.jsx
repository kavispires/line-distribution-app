import React from 'react';
import PropTypes from 'prop-types';

const SwitchToggle = ({ action, labels, checked }) => {
  if (!labels) {
    labels = { left: '', right: '' };
  } else if (Array.isArray(labels)) {
    labels = { left: labels[0], right: labels[1] };
  } else if (typeof labels !== 'object') {
    labels = { left: 'A', right: 'B' };
  }

  return (
    <span>
      <span className="slide-text-left">{labels.left}</span>
      <label className="switch">
        <input type="checkbox" onChange={action} checked={checked} />
        <span className="slider" />
      </label>
      <span className="slide-text-right">{labels.right}</span>
    </span>
  );
};

SwitchToggle.propTypes = {
  action: PropTypes.func.isRequired,
  labels: PropTypes.object, // eslint-disable-line
  checked: PropTypes.bool,
};

SwitchToggle.defaultProps = {
  checked: false,
};

export default SwitchToggle;
