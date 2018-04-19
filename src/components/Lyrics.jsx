import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LyricsEditor from './LyricsEditor';
import LyricsViewer from './LyricsViewer';
import PositionIcons from './icons/PositionIcons';
import CurrentArtistName from './widgets/CurrentArtistName';

class Lyrics extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.app.currentUnit !== this.props.app.currentUnit) {
      const newArray = new Array(this.props.app.currentUnit.members.length).fill(0);
      this.props.setDurations([...newArray]);
      this.props.setPercentages([...newArray]);
      this.props.setHistory([]);
      this.props.handleParser(this.props.lyrics.lyrics);
    }
  }

  render() {
    const APP = this.props.app;
    const LYRICS = this.props.lyrics;
    const placeholder = LYRICS.lyrics ? LYRICS.lyrics : 'Type your lyrics here';
    const CURRENT_UNIT = this.props.app.currentUnit;

    if (CURRENT_UNIT.id === undefined) {
      return (
        <div className="container-flex">
          <section className="container container-distribution">
            <section className="section-distribution container-fixed">
              <h1>Lyrics</h1>
              <p>You must select an Artist and Unit in the <Link to="/artists">Artists Page</Link> before you can use the Lyrics Color Coder.</p>
            </section>
          </section>
        </div>
      );
    }

    return (
      <div className="container">
        <h1>Lyrics<CurrentArtistName currentArtist={APP.currentArtist} /></h1>
        {
          CURRENT_UNIT ?
            <div className="current-band">
              <p>Current Band: <b>{CURRENT_UNIT.artist.name}</b></p>
              <div className="current-band-members">
                <p>Members:</p>
                <ul className="members-list">
                  {
                    CURRENT_UNIT.members.map((member, i) => (
                      <li
                        key={`pill-${member.id}`}
                        className={`member-list-item color-${CURRENT_UNIT.members[i].colorId}`}
                      >
                        {member.name}
                        <PositionIcons memberId={member.id} positions={member.positions} />
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            :
            <p>You must select an artist first for the parser to work properly.</p>
        }
        <section className="container">
          <button
            className="btn"
            onClick={ this.props.toggleRules}
          >
            {LYRICS.showRules ? 'Minimize Instructions' : 'Show Instructions'}
          </button>
          {
            LYRICS.showRules ?
              <ul className="lyrics-rules">
                <li>Assign who is singing but typing the member's name in square brackets. e.g.: <i>[BOB] <span className="color-1"> I can sing </span></i></li>
                <li>You may have multiple lines and members on the same line. e.g.: <i>[BOB] <span className="color-1"> I sing </span> [JACK] <span className="color-25"> I dance </span></i></li>
                <li>If members share the same line, use / with no spaces. e.g.: <i>[BOB/JACK] <span className="color-1-25"> We can sing </span></i></li>
                <li>If a member sings an ad-lib or a small part of the line, you may put her name in parenthesis.. e.g.: <i>[BOB (MEG)] <span className="color-1"> We can sing </span> <span className="color-15"> (Oh yeah) </span></i></li>
                <li>If the next line doesn't have an assigned member, parser will repeat the member from the previous line.</li>
                <li>If previous line is blank, parser will consider the current line an 'All' line</li>
              </ul>
            : null
          }
        </section>
        <section className="lyrics-container">
          <LyricsEditor
            placeholder={placeholder}
            action={this.props.handleParser}
            defaultValue={LYRICS.lyrics}
          />
          <LyricsViewer
            formattedLyrics={LYRICS.formattedLyrics}
          />
        </section>
      </div>
    );
  }
};

export default Lyrics;
