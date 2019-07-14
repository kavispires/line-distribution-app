import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import shared components
import { FavoriteIcon, LoadingIcon, Icon } from '../../../common';

const ArtistsTable = ({
  artists,
  favoriteAction,
  pending,
  rowAction,
  searchQuery,
  showFavoriteArtistsOnly,
  user,
}) => {
  // Filter artists
  let filteredArtists = artists;
  if ((searchQuery && filteredArtists[0]) || showFavoriteArtistsOnly) {
    filteredArtists = _.filter(artists, o => {
      let include = false;
      // If displaying only favorite artists
      if (showFavoriteArtistsOnly) {
        include = user.favoriteArtists[o.id] !== undefined;
      }
      // If displaying only matching queries
      if (searchQuery && filteredArtists[0]) {
        include = o.query.includes(searchQuery);
      }

      return include;
    });
  }

  // Message to be display when table has no rows
  const emptyTableMessage =
    searchQuery.length > 0
      ? 'No artists available within your search'
      : 'No artists available';

  // Row Fallback when loading or no results
  const rowFallback = () => {
    if (pending) {
      return (
        <tr>
          <td colSpan="5">
            <LoadingIcon />
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan="5">{emptyTableMessage}</td>
      </tr>
    );
  };

  const hasActiveFilters = searchQuery.length > 0 || showFavoriteArtistsOnly;

  return (
    <Fragment>
      {pending ? (
        <p className="italic">Loading...</p>
      ) : (
        <p className="italic">
          Displaying {filteredArtists.length} artists{hasActiveFilters
            ? ' within search'
            : ''}
          ...
        </p>
      )}

      <table className="table">
        <thead>
          <tr>
            <th className="artists-table__favorite-col">Favorite</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Units</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody onClick={rowAction}>
          {filteredArtists.length > 0
            ? filteredArtists.map(entry => (
                <tr key={`all-artists-${entry.id}`} id={`a-${entry.id}`}>
                  <td
                    className="artists-cell-favorite"
                    onClick={() => favoriteAction(entry.id)}
                  >
                    <FavoriteIcon
                      action={() => {}}
                      id={entry.id}
                      size="12"
                      state={
                        user.favoriteArtists && user.favoriteArtists[entry.id]
                      }
                    />
                  </td>
                  <td>
                    {entry.name}{' '}
                    {entry.private ? (
                      <Icon type="private" color="red" title="Private" inline />
                    ) : null}
                  </td>
                  <td>{entry.genre}</td>
                  <td>{entry.units ? entry.units.length : 0}</td>
                  <td>
                    {entry.memberList.join(', ')} ({entry.memberList.length})
                  </td>
                </tr>
              ))
            : rowFallback()}
        </tbody>
      </table>
    </Fragment>
  );
};

ArtistsTable.propTypes = {
  artists: PropTypes.array.isRequired,
  favoriteAction: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  rowAction: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  showFavoriteArtistsOnly: PropTypes.bool,
  user: PropTypes.object.isRequired,
};

ArtistsTable.defaultProps = {
  pending: false,
  searchQuery: '',
  showFavoriteArtistsOnly: false,
};

export default ArtistsTable;
