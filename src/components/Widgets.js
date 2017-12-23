import React from 'react';

export const SwitchToggle = ({action, labels}) => {
	if (Array.isArray(labels)) {
		labels = {left: labels[0], right: labels[1]};
	} else if (typeof labels !== 'object') {
		labels = {left: 'A', right: 'B'};
	}
	action = action || (() => console.warn('No action on Switch Button'));

	return (
		<span>
			<span className="slide-text-left">{ labels.left }</span>
      <label className="switch">
			  <input type="checkbox" onChange={ action } />
			  <span className="slider" />
			</label>
			<span className="slide-text-right">{ labels.right }</span>
		</span>
	);
};
