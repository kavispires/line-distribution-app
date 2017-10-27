import React from 'react';

import ColorPicker from './ColorPicker';

const Creator = () => {
  return (
    <div className="container">
      <h1>Creator</h1>
      <form className="creator-form">
        <fieldset>
          <legend>Basic Information</legend>
          <label htmlFor="bandName">Band Name*:</label>
          <input type="text" name="bandName" required />
          <label htmlFor="otherNames">Other Names<span className="hint"> (Separated by commas)</span>:</label>
          <input type="text" name="otherNames" />
          <label htmlFor="version">Version<span className="hint"> (e.g.: 'Featuring JYP', 'OT8')</span>:</label>
          <input type="text" name="version" />
          <label htmlFor="genre">Genre:</label>
          <select name="genre" required >
            <option value="k-pop">K-Pop</option>
            <option value="pop">Pop</option>
            <option value="j-pop">J-Pop</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Members</legend>
          <input type="text" name="member" /><ColorPicker /><button className="btn btn-default">Add</button>
          <ul className="member-list">
            <li>Member Name</li>
          </ul>
        </fieldset>
      </form>
      <ul className="controls">
        <li><button className="btn btn-100" onClick={() => console.log('Clear')}>Clear</button></li>
        <li><button className="btn btn-100" onClick={() => console.log('Save and Distribute')}>Save and Distribute</button></li>
      </ul>
      {/*
        Band Name
        Other names
        Genre
        Members
      */}
    </div>
    );
};

export default Creator;
