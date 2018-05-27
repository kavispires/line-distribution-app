import React from 'react';
import PropTypes from 'prop-types';

const LyricsEditor = ({ formattedLyrics }) => {
  let keyCount = 1;

  return (
    <div className="viewer">
      {
        formattedLyrics && formattedLyrics.map((lyric) => {
          const key = `lyricline-${keyCount}`;
          keyCount += 1;
          if (lyric.adlibs.length > 0) {
            return (
              <p key={key}>
                {
                  lyric.adlibs && lyric.adlibs.map((el, idx) => {
                    const key2 = `lyricline-span-${keyCount}`;
                    keyCount += 1;
                    const member = lyric.members[idx] ? `[${lyric.members[idx]}] ` : '';
                    const line = lyric.content[idx] ? `${lyric.content[idx]}` : '';
                    const lineClass = `line ${lyric.colors[idx]}`;

                    return (
                      <span key={key2} className="lineGroup">
                        <span className="who">{member}</span>
                        <span className={lineClass}>{line}</span>
                      </span>
                    );
                  })
                }
              </p>
            );
          }
          return (<p key={key} className="lyrics-blank-line">&nbsp;</p>);
        })
      }
    </div>
  );
};

LyricsEditor.propTypes = {
  formattedLyrics: PropTypes.object.isRequired, // eslint-disable-line
};

export default LyricsEditor;
