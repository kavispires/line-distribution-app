import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const UserArtistTable = ({
  title = 'User Table',
  icon = '',
  message = 'No data to display',
  action = () => {},
  unitList = [],
}) => (
  <div className="user-artists-table">
    <h2><Icon type={icon} size="medium-inline" />{ title }</h2>
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

UserArtistTable.propTypes = {
  action: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  unitList: PropTypes.array.isRequired, // eslint-disable-line
};

export default UserArtistTable;
