import React from 'react';
import PropTypes from 'prop-types';

// Import shared components
import { LoadingIcon, Icon } from '../../../common';

const MEANT_FOR_TEXT = {
  FEMALE: 'Girl Groups',
  MALE: 'Boy Groups',
  MIXED: 'Any Group',
  UNKNOWN: 'Unknown',
};

const MEANT_FOR_ICON = {
  FEMALE: 'gender-female',
  MALE: 'gender-male',
  MIXED: 'gender-mixed',
  UNKNOWN: 'question-mark',
};

const MEANT_FOR_COLOR = {
  FEMALE: 'pink',
  MALE: 'blue',
  MIXED: 'orange',
  UNKNOWN: 'grey',
};

const SongsTable = ({
  filteredSongs,
  hasActiveFilters,
  pending,
  rowAction,
  previouslyDistributedSongsDict,
}) => {
  // Message to be display when table has no rows
  const emptyTableMessage = hasActiveFilters
    ? 'No songs available within your search'
    : 'No songs available';

  const rowFallback = () => {
    if (pending) {
      return (
        <tr>
          <td colSpan="9">
            <LoadingIcon />
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan="9">{emptyTableMessage}</td>
      </tr>
    );
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Distributed</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Meant For</th>
          <th>Group Size</th>
          <th>Video</th>
          <th>Title Song</th>
          <th />
        </tr>
      </thead>
      <tbody onClick={rowAction}>
        {filteredSongs.length > 0
          ? filteredSongs.map(entry => {
              const previouslyDistributed = previouslyDistributedSongsDict[
                entry.id
              ]
                ? 'previously-distributed-row'
                : '';

              return (
                <tr
                  key={`all-artists-${entry.id}`}
                  id={`a-${entry.id}`}
                  className={previouslyDistributed}
                >
                  <td>
                    {previouslyDistributed ? (
                      <Icon
                        type="hand-positive"
                        color="green"
                        title="Previously Distributed"
                        inline
                      />
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{entry.title}</td>
                  <td>
                    {entry.originalArtist}{' '}
                    {entry.originalArtistId && (
                      <Icon
                        type="check"
                        color="yellow"
                        title="Artist in LD"
                        inline
                      />
                    )}
                  </td>
                  <td>
                    {entry.album !== 'UNKNOWN' ? (
                      entry.album
                    ) : (
                      <Icon
                        type="question-mark"
                        color="blue"
                        title="Unkown Album Title"
                        inline
                      />
                    )}
                  </td>
                  <td>
                    <Icon
                      type={MEANT_FOR_ICON[entry.gender]}
                      color={MEANT_FOR_COLOR[entry.gender]}
                      title={MEANT_FOR_TEXT[entry.gender]}
                      inline
                    />{' '}
                    {MEANT_FOR_TEXT[entry.gender]}
                  </td>
                  <td>{entry.groupSize}</td>
                  <td>
                    {entry.videoId ? (
                      <Icon
                        type="youtube"
                        color="red"
                        title={entry.videoId}
                        size="18"
                        inline
                      />
                    ) : (
                      'Unavailable'
                    )}
                  </td>
                  <td>
                    {entry.single ? (
                      <Icon
                        type="check"
                        color="green"
                        title="Title Song"
                        inline
                      />
                    ) : (
                      <Icon
                        type="no"
                        color="red"
                        title="Not a Title Song"
                        inline
                      />
                    )}
                  </td>
                  <td>
                    {entry.private ? (
                      <Icon type="private" color="red" title="Private" inline />
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              );
            })
          : rowFallback()}
      </tbody>
    </table>
  );
};

SongsTable.propTypes = {
  filteredSongs: PropTypes.array.isRequired,
  hasActiveFilters: PropTypes.bool,
  pending: PropTypes.bool,
  previouslyDistributedSongsDict: PropTypes.object,
  rowAction: PropTypes.func.isRequired,
};

SongsTable.defaultProps = {
  hasActiveFilters: false,
  pending: false,
  previouslyDistributedSongsDict: {},
};

export default SongsTable;
