import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import shared components
import { FavoriteIcon, LoadingIcon, Icon } from '../../../common';
// Import utils
import enums from '../../../../utils/readable-enums';

const NUMBER_OF_COLUMNS = '7';

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
          <td colSpan={NUMBER_OF_COLUMNS}>
            <LoadingIcon />
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan={NUMBER_OF_COLUMNS}>{emptyTableMessage}</td>
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
          Displaying {filteredArtists.length} artists
          {hasActiveFilters ? ' within search' : ''}
          ...
        </p>
      )}

      <table className="table">
        <thead>
          <tr>
            <th className="artists-table__favorite-col">Favorite</th>
            <th>Name</th>
            <th>Agency</th>
            <th>Genre</th>
            <th>Units</th>
            <th>Members</th>
            <th>Disbanded</th>
          </tr>
        </thead>
        <tbody onClick={rowAction}>
          {filteredArtists.length > 0
            ? filteredArtists.map(entry => {
                const key = `all-artists-${entry.id}`;
                const id = `${entry.id}:::${entry.unitIds[0]}`;
                return (
                  <tr key={key} id={id}>
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
                    <td className="no-break">
                      {entry.name}{' '}
                      {entry.private ? (
                        <Icon
                          type="private"
                          color="red"
                          title="Private"
                          inline
                        />
                      ) : null}
                    </td>
                    <td className="no-break">{entry.agency}</td>
                    <td>{enums.GENRES[entry.genre]}</td>
                    <td>{entry.unitIds.length}</td>
                    <td>
                      {entry.members.map(member => member.name).join(', ')} (
                      {entry.members.length})
                    </td>
                    <td className="center">
                      {entry.disbanded ? (
                        <Icon
                          type="grave"
                          color="purple"
                          title="Disbanded"
                          inline
                        />
                      ) : null}
                    </td>
                  </tr>
                );
              })
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
