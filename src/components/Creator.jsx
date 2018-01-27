import React from 'react';

import CreatorMember from './CreatorMember';
// import ColorPicker from './ColorPicker';

const Creator = (props) => {
  // console.log(props)
  return (
    <div className="container">
      <h1>Creator</h1>
      <form className="creator-form">
        <fieldset>
          <legend>Basic Information</legend>
          <label htmlFor="bandName">Band Name*:</label>
          <input
            type="text"
            name="bandName"
            value={props.creator.bandName}
            onChange={props.handleBandName}
            />
          <label htmlFor="otherNames">Other Names<span className="hint"> (Separated by commas)</span>:</label>
          <input
            type="text"
            name="otherNames"
            value={props.creator.otherNames}
            onChange={props.handleOtherNames}
            />
          <label htmlFor="version">Version<span className="hint"> (e.g.: 'Featuring JYP', 'OT8')</span>:</label>
          <input
            type="text"
            name="version"
            value={props.creator.version}
            onChange={props.handleVersion}
            />
          <div className="form-group">
            <div className="form-element">
              <label htmlFor="genre">Genre:</label>
              <select
                name="genre"
                value={props.creator.genre}
                onChange={props.handleGenre}
                >
                <option value="K-Pop">K-Pop</option>
                <option value="Pop">Pop</option>
                <option value="J-Pop">J-Pop</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-element">
              <label htmlFor="official">Official:</label>
              <input type="checkbox" name="official" checked={props.creator.official} onChange={props.handleOfficial} />
              <small> (Mark this option only if it's an official assemble, not fanmade, and not special performance or tv show)</small>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Members</legend>
          <button className="btn btn-default" onClick={props.addBlankMember}>Add New Member</button>
          <div className="form-member-group">
            {
              Object.keys(props.creator.newMembers).map(id => {

                return (
                  <CreatorMember key={id} id={id} props={props} />
                )
              })
            }
          </div>
        </fieldset>
      </form>
      {/* <ul className="controls">
        <li><button className="btn btn-100" onClick={() => console.log('Clear')}>Clear</button></li>
        <li><button className="btn btn-100" onClick={() => console.log('Save and Distribute')}>Save and Distribute</button></li>
      </ul> */}
      <ul className="controls">
        <li><button className="btn btn-100" onClick={props.generateBandJSON}>Generate Band JSON</button></li>
        <li><button className="btn btn-100" onClick={props.generateMembersJSON}>Generate Members JSON</button></li>
        <li><button className="btn btn-100" onClick={props.generateFullJSON}>Generate Full JSON</button></li>
      </ul>
      {/*
        Band Name
        Other names
        Genre
        Members
      */}
      {
        props.creator.tempInput ? (
          <textarea className="temp-input" id="temp-input" value={props.creator.tempInput} readOnly />
        ) : null
      }
    </div>
    );
};

export default Creator;
