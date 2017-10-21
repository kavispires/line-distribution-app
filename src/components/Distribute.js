import React from 'react';


const Distribute = (props) => {
  return (
    <div className="container">
      <h1>Distribute</h1>
      <p>Current Band: {props.app.currentBand.bandName}</p>
    </div>
    );
};

export default Distribute;
