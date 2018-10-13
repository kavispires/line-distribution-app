import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import CreatorNewMember from './CreatorNewMember';
import CreatorExistingMember from './CreatorExistingMember';

const CreatorMembers = ({ props }) => {
  const sortedMembers = _.sortBy(props.admin.members, ['name']);

  const CREATOR = props.creator;

  return (
    <form className="creator-form">
      <h1>Select Members from the Database</h1>
      <div className="form-instance-full form-instance-highlighted">
        <label htmlFor="loadMember">Add Existing Member to Unit:</label>
        <select
          name="loadMember"
          value={props.loadedMember}
          onChange={props.loadMember}
        >
          <option value="0">Select a member to load...</option>
          {sortedMembers.map(member => (
            <option key={`member--${member.id}`} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-member-group">
        {CREATOR.newUnitMembers.map(member => (
          <CreatorExistingMember
            key={`exist-${member.id}`}
            member={member}
            props={props}
          />
        ))}
      </div>
      <h1>Create Brand New Members</h1>
      <button className="btn btn-default" onClick={props.addNewMember}>
        Add New Member
      </button>
      <div className="form-member-group">
        {Object.keys(CREATOR.newMembers).map(id => (
          <CreatorNewMember key={id} id={id} props={props} />
        ))}
      </div>
    </form>
  );
};

CreatorMembers.propTypes = {
  props: PropTypes.object.isRequired, // eslint-disable-line
};

export default CreatorMembers;
