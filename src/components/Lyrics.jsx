import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginRequiredScreen from './LoginRequiredScreen';
import LoadingScreen from './LoadingScreen';
import Icon from './Icon';

import LyricsEditor from './LyricsEditor';
import LyricsViewer from './LyricsViewer';
import PositionIcons from './icons/PositionIcons';
import CurrentArtistName from './widgets/CurrentArtistName';

import { insertAtCursor } from '../utils';

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
    // LOGIN Check if user is logged in
    if (this.props.user.isAuthenticated === false) {
      return <LoginRequiredScreen props={this.props} redirect="/lyrics" />;
    }

    // DB Check if db is ready
    if (this.props.db.loaded === false) {
      return <LoadingScreen />;
    }

    const APP = this.props.app;
    const LYRICS = this.props.lyrics;
    const placeholder = LYRICS.lyrics ? LYRICS.lyrics : 'Type your lyrics here';
    const CURRENT_UNIT = this.props.app.currentUnit;

    const insertMember = (member) => {
      const el = document.getElementById('lyrics-editor');
      const str = `[${member.toUpperCase()}] `;
      insertAtCursor(el, str);
      this.props.handleParser(el.value);
    };

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
      <div className="container container-lyrics">
        <div className="container container-lyrics-menu">
          <h1>Lyrics<CurrentArtistName currentArtist={APP.currentArtist} /></h1>
          {
            CURRENT_UNIT ?
              <div className="current-artist">
                <p>Current Band: <b>{CURRENT_UNIT.artist.name}</b></p>
                <div className="current-artist-members">
                  <p>Members:</p>
                  <ul className="members-list">
                    {
                      CURRENT_UNIT.members.map((member, i) => (
                        <li
                          key={`pill-${member.id}`}
                          className={`member-list-item ${CURRENT_UNIT.members[i].color.class}`}
                          onClick={() => insertMember(member.name)}
                        >
                          {member.name}
                          <PositionIcons
                            memberId={member.id}
                            positions={member.positions.map(pos => pos.id)}
                          />
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
              onClick={this.props.toggleRules}
            >
              {
                LYRICS.showRules ?
                  <span><Icon type="hide" /> Hide Instructions</span>
                  :
                  <span><Icon type="view" /> Show Instructions</span>
              }
            </button>
            {
              LYRICS.showRules ?
                <ul className="lyrics-rules">
                  <li>Assign who is singing but typing the member&apos;s name in square brackets. e.g.: <i>[BOB] <span className="color-1"> I can sing </span></i></li>
                  <li>You may have multiple lines and members on the same line. e.g.: <i>[BOB] <span className="color-1"> I sing </span> [JACK] <span className="color-25"> I dance </span></i></li>
                  <li>If members share the same line, use / with no spaces. e.g.: <i>[BOB/JACK] <span className="color-1-25"> We can sing </span></i></li>
                  <li>If a member sings an ad-lib or a small part of the line, you may put her name in parenthesis.. e.g.: <i>[BOB (MEG)] <span className="color-1"> We can sing </span> <span className="color-15"> (Oh yeah) </span></i></li>
                  <li>If the next line doesn&apos;t have an assigned member, parser will repeat the member from the previous line.</li>
                  <li>If previous line is blank, parser will consider the current line an &quot;All&quot; line</li>
                  <li>HINT: You may click  on the member list at the top of the page to insert a bracketed member [NAME] at the cursor into the lyrics!</li>
                </ul>
              : null
            }
          </section>
        </div>
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
}

Lyrics.propTypes = {
  app: PropTypes.object.isRequired, // eslint-disable-line
  db: PropTypes.object.isRequired, // eslint-disable-line
  lyrics: PropTypes.object.isRequired, // eslint-disable-line
  user: PropTypes.object.isRequired, // eslint-disable-line
  handleParser: PropTypes.func.isRequired,
  setDurations: PropTypes.func.isRequired,
  setHistory: PropTypes.func.isRequired,
  setPercentages: PropTypes.func.isRequired,
  toggleRules: PropTypes.func.isRequired,
};


export default Lyrics;
