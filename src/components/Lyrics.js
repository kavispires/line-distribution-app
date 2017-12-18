import React from 'react';

import LyricsEditor from './LyricsEditor';
import LyricsViewer from './LyricsViewer';

const Lyrics = (props) => {
  const LYRICS = props.lyrics;
  const placeholder = LYRICS.lyrics ? LYRICS.lyrics : 'Type your lyrics here';
  const currentBand = props.app.currentBand;

  return (
    <div className="container">
      <h1>Lyrics</h1>
      {
        currentBand ?
          <div className="current-band">
            <p>Current Band: {props.app.currentBand.bandName}</p>
            <div className="current-band-members">
              <p>Members:</p>
              <ul className="members-list">
                {
                  currentBand.members.map((member, i) => (
                    <li key={member} className={`member-list-item color-${currentBand.colors[i]}`}>{member}</li>
                  ))
                }
              </ul>
            </div>
          </div>
          :
          <p>You must select an artist first for the parser to work properly.</p>
      }
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
      <section className="container">
        <button className="btn" onClick={ props.toggleRules }>{ LYRICS.showRules ? 'Minimize Instructions' : 'Show Instructions'}</button>
        {
          LYRICS.showRules ?
            <ul className="lyrics-rules">
              <li>Assign who is singing but typing the member's name in square brackets. e.g.: <i>[BOB] <span className="color-blue">I can sing</span></i></li>
              <li>You may have multiple lines and members on the same line. e.g.: <i>[BOB] <span className="color-blue">I sing</span> [JACK] <span className="color-green">I dance</span></i></li>
              <li>If members share the same line, use / with no spaces. e.g.: <i>[BOB/JACK] <span className="color-blue-green">We can sing</span></i></li>
              <li>If a member sings an ad-lib or a small part of the line, you may put her name in parenthesis.. e.g.: <i>[BOB (MEG)] <span className="color-blue">We can sing</span> <span className="color-red">(Oh yeah)</span></i></li>
              <li>If the next line doesn't have an assigned member, parser will repeat the member from the previous line.</li>
              <li>If previous line is blank, parser will consider the current line an 'All' line</li>
            </ul>
          : null
        }
      </section>
      <section className="lyrics-container">
        <LyricsEditor placeholder={ placeholder } action={props.handleParser} defaultValue={ LYRICS.lyrics } />
        <LyricsViewer formattedLyrics={ LYRICS.formattedLyrics } />
      </section>
    </div>
    );
};

export default Lyrics;
