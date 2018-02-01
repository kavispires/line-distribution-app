import React from 'react';

const LyricsEditor = ({ formattedLyrics }) => (
  <div className="viewer">
    {
      formattedLyrics && formattedLyrics.map((lyric, lyricIndex) => {
        const key = `${lyric}-${lyricIndex}`;
        if (lyric.adlibs.length > 0) {
          return (
            <p key={key}>
              {
                lyric.adlibs && lyric.adlibs.map((el, idx) => {
                  const key2 = `${key}-el-${idx}`;
                  const member = lyric.member[idx] ? `[${lyric.member[idx]}] ` : '';
                  const line = lyric.content[idx] ? `${lyric.content[idx]} ` : '';
                  const lineClass = `line color-${lyric.class[idx]}`;

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

export default LyricsEditor;
