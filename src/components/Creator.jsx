import React from 'react';

import CreatorNewMember from './CreatorNewMember';
import CreatorExistingMember from './CreatorExistingMember';

const Creator = (props) => {
  const APP = props.app;
  const DATABASE = props.database;
  const CREATOR = props.creator;

  const artistDisabled = +CREATOR.loadedArtist !== 0;
  const unitDisabled = +CREATOR.loadedUnit !== 0;

  return (
    <div className="container">
      <h1>Creator</h1>
      <form className="creator-form">
        <fieldset>
          <legend>Artist Information</legend>
          <div className="form-instance-full form-instance-highlighted">
            <label htmlFor="loadArtist">Use Existing Artist:</label>
            <select
              name="loadArtist"
              value={CREATOR.loadedArtist}
              onChange={props.loadArtist}
            >
              <option value="0">Select an artist to load...</option>
              {
                APP.artistListBackUp.map((artistId) => {
                  const artist = DATABASE.artists[artistId];
                  return (
                    <option key={`artist-${artist.id}`} value={artist.id}>{artist.name}</option>
                  );
                })
              }
            </select>
          </div>
          <div className="form-instance">
            <label htmlFor="newArtistName">Artist Name*:</label>
            <input
              type="text"
              name="newArtistName"
              value={CREATOR.newArtistName}
              onChange={props.handleNewArtistName}
              disabled={artistDisabled}
            />
          </div>
          <div className="form-instance">
            <label htmlFor="newArtistOtherNames">Other Names<span className="hint"> (Separated by commas)</span>:</label>
            <input
              type="text"
              name="newArtistOtherNames"
              value={CREATOR.newArtistOtherNames}
              onChange={props.handleNewArtistOtherNames}
              disabled={artistDisabled}
            />
          </div>
          <div className="form-instance">
            <label htmlFor="newArtistGenre">Genre:</label>
            <select
              name="newArtistGenre"
              value={CREATOR.newArtistGenre}
              onChange={props.handleNewArtistGenre}
              disabled={artistDisabled}
            >
              <option value="K-Pop">K-Pop</option>
              <option value="Pop">Pop</option>
              <option value="J-Pop">J-Pop</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Unit Information</legend>
          <div className="form-instance-full form-instance-highlighted">
            <label htmlFor="loadUnit">Use Existing Unit:</label>
            <select
              name="loadUnit"
              value={CREATOR.loadedUnit}
              onChange={props.loadUnit}
            >
              <option value="0">Select an unit to load...</option>
              {
                CREATOR.newArtistUnits.map((unitId) => {
                  const unit = DATABASE.units[unitId];
                  return (
                    <option key={`unit-${unit.id}`} value={unit.id}>{unit.name}</option>
                  );
                })
              }
            </select>
          </div>
          <div className="form-instance">
            <label htmlFor="unitName">Unit/Version Name<span className="hint"> (e.g.: 'OT8', 'Feat. JYP', 'Season 2')</span>:</label>
            <input
              type="text"
              name="unitName"
              value={CREATOR.newUnitName}
              onChange={props.handleNewUnitName}
              disabled={unitDisabled}
            />
          </div>
          <div className="form-instance">
            <label htmlFor="debutYear">Debut Year:</label>
            <input
              type="text"
              name="debutYear"
              value={CREATOR.newUnitDebutYear}
              onChange={props.handleNewUnitDebutYear}
              disabled={unitDisabled}
            />
          </div>
          <div className="form-instance-full">
            <label htmlFor="official">Official:</label>
            <input
              type="checkbox"
              name="official"
              checked={CREATOR.newUnitOfficial}
              onChange={props.handleNewUnitOfficial}
              disabled={unitDisabled}
            />
            <small> (Mark this option only if it's an official assemble, not fanmade, and not special performance or tv show)</small>
          </div>
        </fieldset>

        <fieldset>
          <legend>Existing Members</legend>
          <div className="form-instance-full form-instance-highlighted">
            <label htmlFor="loadMember">Add Existing Member to Unit:</label>
            <select
              name="loadMember"
              value={props.loadedMember}
              onChange={props.loadMember}
            >
              <option value="0">Select an member to load...</option>
              {
                APP.membersList.map((memberId) => {
                  const member = DATABASE.members[memberId];
                  return (
                    <option key={`member--${member.id}`} value={member.id}>{member.name}</option>
                  );
                })
              }
            </select>
          </div>
          <div className="form-member-group">
            {
              CREATOR.newUnitMembers.map(memberId => (
                <CreatorExistingMember key={`exist-${memberId}`} id={memberId} props={props} />
              ))
            }
          </div>
        </fieldset>
        <fieldset>
          <legend>New Members</legend>
          <button className="btn btn-default" onClick={props.addNewMember}>Add New Member</button>
          <div className="form-member-group">
            {
              Object.keys(CREATOR.newMembers).map(id => (
                <CreatorNewMember key={id} id={id} props={props} />
              ))
            }
          </div>
        </fieldset>
      </form>
      <ul className="controls">
        <li><button className="btn-lg btn-100" onClick={props.generateArtistJSON}>Generate Artist JSON</button></li>
        <li><button className="btn-lg btn-100" onClick={props.generateUnitJSON}>Generate Unit JSON</button></li>
        <li><button className="btn-lg btn-100" onClick={props.generateMembersJSON}>Generate Members JSON</button></li>
        <li><button className="btn-lg btn-100" onClick={props.generateFullJSON}>Generate Full JSON</button></li>
      </ul>
      {
        CREATOR.tempInput ? (
          <textarea className="temp-input" id="temp-input" value={CREATOR.tempInput} readOnly />
        ) : null
      }
    </div>
    );
};

export default Creator;
