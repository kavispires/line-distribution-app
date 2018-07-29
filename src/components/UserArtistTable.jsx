import React from 'react';
import PropTypes from 'prop-types';

const UserArtistTable = ({ action, list, prefix }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Genre</th>
        <th>Unit</th>
      </tr>
    </thead>
    <tbody>
      {list.map(unit => {
        const key = `${prefix}-${unit.id}`;
        return (
          <tr key={key} onClick={() => action(unit)}>
            <td>{unit.artist.name}</td>
            <td>{unit.artist.genre}</td>
            <td>{unit.name}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

UserArtistTable.propTypes = {
  action: PropTypes.func,
  list: PropTypes.array,
  prefix: PropTypes.string.isRequired,
};

UserArtistTable.defaultProps = {
  action: () => {},
  list: [],
};

export default UserArtistTable;
