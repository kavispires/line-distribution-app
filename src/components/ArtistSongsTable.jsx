import React from 'react';
import _ from 'lodash';

import NoIcon from './icons/NoIcon';
import YesIcon from './icons/YesIcon';

const ArtistSongsTable = ({ songs, members, handleSongClick }) => {

  const sortedSongs = _.sortBy(songs, ['title']);

  const memberColors = {};
  members.forEach((member) => {
    memberColors[member.id] = member.color.class;
  });

  return (
    songs && songs.length > 0 ? (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Lyrics</th>
            <th>Distribution</th>
          </tr>
        </thead>
        <tbody onClick={(e) => handleSongClick(e)}>
          {
            sortedSongs && sortedSongs.map((song) => {
              let type = 'Official';
              if (song.type === 'would') {
                type = `Originally by ${song.originalArtist}`;
              } else if (song.type === 'should') {
                type = "How it should've been";
              }
              // const songDistribution = this.props.parseSong(song);
              return (
                <tr
                  key={song.id}
                  id={song.id}
                >
                  <td>{song.title}</td>
                  <td>{type}</td>
                  <td>
                    {
                      song.lyrics ? <YesIcon /> : <NoIcon />
                    }
                  </td>
                  <td>
                    {
                      song.result ?
                        (
                          <span className="unit-songs-dist">
                            {
                              song.result.map((instance) => {
                                const color = memberColors[instance.memberId];
                                const barWidth = instance.memberTotal;
                                return (
                                  <span
                                    key={`${song.id}-${color}-${instance.memberId}`}
                                    className={`unit-songs-member ${color} bar-width-${barWidth}`}
                                  >
                                    {barWidth}%
                                  </span>
                                );
                              })
                            }
                          </span>
                        )
                        :
                          <NoIcon />
                    }
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    ) : (
      <p>No songs available</p>
    )
  );
};

export default ArtistSongsTable;
