import React from 'react';

const UserArtistTable = ({
  title = 'User Table',
  message = 'No data to display',
  action = () => alert('No callback function'),
  unitList = [],
}) => (
  <div className="user-artists-table">
    <h2>{ title }</h2>
    {
      unitList.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {
              unitList.map((unit) => {
                const key = `${title}-${unit.id}`;
                return (
                  <tr key={key} onClick={() => action(unit)}>
                    <td>{unit.artist.name}</td>
                    <td>{unit.artist.genre}</td>
                    <td>{unit.name}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      ) : (
        <p className="user-artists-message">
          {message}
        </p>
      )
    }
  </div>
);

export default UserArtistTable;
