import React from 'react';
import PropTypes from 'prop-types';

// Import shared components
import { LoadingIcon } from '../../../common';
import DistributedSongPreview from './DistributedSongPreview';

const DistributedSongsTable = ({
  distributions,
  pending,
  members,
  rowAction,
}) => {
  const rowFallback = () => {
    if (pending) {
      return (
        <tr>
          <td colSpan="7">
            <LoadingIcon />
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan="3">This artist have no distributions yet</td>
      </tr>
    );
  };

  const humanizeCategory = (category, originalArtist) => {
    switch (category) {
      case 'WOULD':
        return `How they would sing ${originalArtist}`;
      case 'SHOULD':
        return 'How they should sing it';
      default:
        return 'Official';
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Distribution Preview</th>
        </tr>
      </thead>
      <tbody>
        {distributions.length > 0
          ? distributions.map(entry => {
              const key = `artist-distribution-${entry.id}`;
              return (
                <tr
                  key={key}
                  id={`a-${entry.id}`}
                  className="artist-distributed-songs-row"
                  onClick={() => rowAction(entry.id)}
                >
                  <td className="artist-distributed-songs-row__title">
                    {entry.songTitle}
                  </td>
                  <td className="artist-distributed-songs-row__original-artist">
                    {humanizeCategory(entry.category, entry.songArtist)}
                  </td>
                  <td className="artist-distributed-songs-row__distribution-preview">
                    <DistributedSongPreview
                      rates={entry.rates}
                      members={members}
                    />
                  </td>
                </tr>
              );
            })
          : rowFallback()}
      </tbody>
    </table>
  );
};

DistributedSongsTable.propTypes = {
  pending: PropTypes.bool,
  rowAction: PropTypes.func,
  distributions: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
};

DistributedSongsTable.defaultProps = {
  pending: false,
  rowAction: () => {},
};

export default DistributedSongsTable;
