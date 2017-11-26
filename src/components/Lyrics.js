import React from 'react';

const Lyrics = (props) => {
  const LYRICS = props.lyrics;
  const placeholder = LYRICS.lyrics ? LYRICS.lyrics : 'Type your lyrics here';
  return (
    <div className="container">
      <h1>Lyrics</h1>
      <p>You must select an artist for the parser to work properly.</p>
      <p>Current Band: {props.app.currentBand.bandName}</p>
      {/*
        Get Text
        Split by line breaks
        Lines:
        Square brackets define the member singing
        If parenthesis = ad-libs
        If more then one name = split
        If 3 or more, just assign all all)
        If none, copy the latest
      */}
      <section>
        <h3>Rules</h3>
        <ul className="lyrics-rules">
          <li>Assign who is singing but typing the member's name in square brackets. e.g.: <i>[BOB] <span className="color-blue">I can sing</span></i></li>
          <li>You may have multiple lines and members on the same line. e.g.: <i>[BOB] <span className="color-blue">I sing</span> [JACK] <span className="color-green">I dance</span></i></li>
          <li>If members share the same line, use / with no spaces. e.g.: <i>[BOB/JACK] <span className="color-blue-green">We can sing</span></i></li>
          <li>If a member sings an ad-lib or a small part of the line, you may put her name in parenthesis.. e.g.: <i>[BOB (MEG)] <span className="color-blue">We can sing</span> <span className="color-red">(Oh yeah)</span></i></li>
          <li>If the next line doesn't have an assigned member, parser will repeat the member from the previous line.</li>
          <li>If previous line is blank, parser will consider the current line an 'All' line</li>

        </ul>
      </section>
      <section className="lyrics-container">
        <textarea className="lyrics-editor" placeholder={ placeholder } onChange={(e) => props.handleParser(e)} defaultValue={ LYRICS.lyrics }/>
        <div className="lyrics-viewer">
          {
            LYRICS.formattedLyrics && LYRICS.formattedLyrics.map((lyric, lyricIndex) => {
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
                          <span key={ key2 } className="line">
                            <span className="who">{ member }</span>
                            <span className={ lineClass }>{ line }</span>
                          </span>
                        );
                      })
                    }
                  </p>
                );
              } else {
                return (<p key={key} className="lyrics-blank-line">&nbsp;</p>);
              }

            })
          }
        </div>
      </section>
    </div>
    );
};

export default Lyrics;
