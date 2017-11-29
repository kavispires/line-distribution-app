import React from 'react';

import { COLORS_LIST } from '../constants';

const ColorSheet = (props) => {
  return (
    <div className="container">
    	<h1>Color Sheet</h1>
    	<ul className="color-palette">
  		{
    		COLORS_LIST.map(color => (
    			<li key={`${color}`} className={`palette color-${color}`}>
    				{props.app.colorCount[color]}<br />
            {color}
    			</li>
    		))
    	}
    	</ul>
    </div>
  );
};

export default ColorSheet;
