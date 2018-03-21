import React from 'react';

const Converter = (props) => {
  const { converter } = props;

  return (
    <div className="container">
      <h1>Conveter</h1>
      <label htmlFor="action">Action:</label>
      <select
        name="action"
        onChange={props.selectAction}
      >
        <option value="">Select an action to perform...</option>
        <option value="reassign-songs-member-ids">Reassign Songs Member Ids</option>
      </select>
      <textarea className="converter-output" id="converter-output" value={converter.output} readOnly />
    </div>
  );
};

export default Converter;
