import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LyricsEditor from './LyricsEditor';
import LyricsViewer from './LyricsViewer';
import LoadingIcon from './icons/LoadingIcon';
import SwitchToggle from './widgets/SwitchToggle';
import CurrentArtistName from './widgets/CurrentArtistName';

import { KEY_LIST } from '../constants';
import { boxSizeClass } from '../utils';

class Distribute extends Component {
  componentDidMount() {
    if (this.props.location.pathname === '/distribute') {
      window.addEventListener('keydown', this.props.handleKeydown);
      window.addEventListener('keyup', this.props.handleKeyup);
      // Run Lyric parser once.
      this.props.handleParser(this.props.lyrics.lyrics);
    }

    // const unitLength = Object.keys(this.props.app.currentUnit).length;
    // if (unitLength > 0
    //   && this.props.distribute.durations.length !== unitLength) {
    //     console.log('UNIT LENGTH', unitLength)
    //     console.log('componentDidMount RESET')
    //   this.props.resetDistribution();
    // }
  }

  componentWillReceiveProps(nextProps) {
    const nextPropsCurrentUnit = nextProps.app.currentUnit;
    if (nextPropsCurrentUnit !== this.props.app.currentUnit && this.props.app.shouldReset) {
      this.props.resetDistribution(nextPropsCurrentUnit);
    }
    const prevSongId = this.props.app.currentSong.id;
    const songId = nextProps.app.currentSong.id;
    if (songId !== prevSongId) {
      this.props.toggleIsLoading(false);
      this.props.loadSong();
    }
  }

  render() {
    const APP = this.props.app;
    const DISTRIBUTE = this.props.distribute;
    const LYRICS = this.props.lyrics;
    const CURRENT_UNIT = APP.currentUnit;

    // IF LOADING
    if (APP.isLoading) {
      return (
        <div className="container-flex">
          <section className="container container-distribution">
            <section className="section-distribution container-fixed">
              <h1>Distribute</h1>
              <div>
                {
                  APP.isLoading ? (
                    <LoadingIcon />
                  ) : null
                }
              </div>
            </section>
          </section>
        </div>
      );
    }

    // IF NO CURRENT_UNIT
    if (CURRENT_UNIT && !CURRENT_UNIT.members) {
      return (
        <div className="container-flex">
          <section className="container container-distribution">
            <section className="section-distribution container-fixed">
              <h1>Distribute</h1>
              <div>
                <p>You must select an Artist and Unit in the <Link to="/artists">Artists Page</Link> before you can create your line distribution.</p>
              </div>
            </section>
          </section>
        </div>
      );
    }

    const boxSize = CURRENT_UNIT ? boxSizeClass(CURRENT_UNIT.members.length) : 'small';
    const {
      durations,
      percentages,
      decrease,
      who,
      showLyrics,
    } = DISTRIBUTE;
    const decreaseClass = decrease ? 'btn-decrease' : null;

    // Define who sentence
    let whoSentence = '...';
    if (who.length === 1) {
      whoSentence = `${who[0]} is singing.`;
    } else if (who.length > 1) {
      whoSentence = `${who.join(', ')} are singing.`;
    }

    // Define Switch Button labels
    const switchLabels = { left: '', right: '' };
    // Define toggling classes for lyrics panel
    const sectionLyricsClasses = showLyrics ? 'section-lyrics-on' : 'section-lyrics-off';
    // Define placeholder for lyrics input text
    const placeholder = LYRICS.lyrics ? LYRICS.lyrics : 'Type your lyrics here';

    return (
      <div className="container-flex">
        <section className="container container-distribution">
          <section className="section-distribution container-fixed">
            <h1 className="tiny-h1">Distribute
              <CurrentArtistName currentArtist={APP.currentArtist} />
              {
                APP.currentSong && APP.currentSong.id ? (
                  <span className="widget-h1-title">
                     - {APP.currentSong.title}
                  </span>
                ) : null
              }
            </h1>
            <div className="toggle-lyrics"> Lyrics <SwitchToggle action={this.props.toggleLyrics} labels={switchLabels} /></div>
            <h2>{CURRENT_UNIT.bandName}</h2>
            <ul className="controls">
              <li><button className="btn-lg btn-100" onClick={this.props.handleReset}>Reset</button></li>
              <li><button className="btn-lg btn-100" onClick={this.props.handleUndo}>Undo</button></li>
              <li><button className={`btn-lg btn-100 ${decreaseClass}`} onClick={this.props.handleDecrease}>Decrease</button></li>
              <li><button className="btn-lg btn-100" onClick={() => this.props.history.push('/results')}>Finish</button></li>
            </ul>
            <h3 className="current-singer">{ whoSentence }</h3>
            <div className="progress-bar">
              {
                CURRENT_UNIT.members.map((member, index) => (
                  <div
                    key={member.color.id}
                    id={`bar-${index}`}
                    className={`bar ${member.color.class} bar-width-${percentages[index]}`}
                  />
                ))
              }
            </div>
            <div className="boxes">
              {
                CURRENT_UNIT ?
                  CURRENT_UNIT.members.map((member, index) => (
                    <button
                      key={member.name}
                      id={index}
                      className={`box ${boxSize} ${member.color.class}`}
                      onMouseDown={this.props.boxMouseDown}
                      onMouseUp={this.props.boxMouseUp}
                    >
                      <span className="key">{KEY_LIST[index]}</span>
                      <span className="member-name">{member.name}</span>
                      <span className="timestamp">{Math.round(durations[index] / 100) / 10}</span>
                    </button>
                  ))
                  :
                  <p className="text-center">You must select an artist before you can create your vocal line distribution.</p>
              }
            </div>
            <div className="log">
              {
                this.props.distribute.history.map((item, i) => {
                  const key = `${item.memberId}-${i}-${item.duration}`;
                  return (
                    <button
                      key={key}
                      className={`log-item ${CURRENT_UNIT.members[item.memberId].color.class}`}
                      onClick={() => this.props.calculateDuration(item.memberId, item.duration, 0, true, i)}
                    >
                      {CURRENT_UNIT.members[item.memberId].name}
                      <span className="details">{Math.round(item.duration / 100) / 10}s | &#215;</span>
                    </button>
                  );
                })
              }
            </div>
          </section>

          <section className={`section-lyrics ${sectionLyricsClasses} container-fixed`}>
            <h1 className="tiny-h1">Lyrics</h1>
            <button className="btn btn-25" onClick={this.props.toggleEditLyrics}>{ this.props.distribute.editLyrics ? 'Close Editor' : 'Edit Lyrics'}</button>
            {
              this.props.distribute.editLyrics ? (
                <p className="alert">Line Distribution is paused while you edit the lyrics. When you&apos;re done, press the &quot;Close Editor&quot; button to resume your line distribution.</p>
              ) : null
            }
            {
              this.props.distribute.editLyrics ? (
                <LyricsEditor
                  placeholder={placeholder}
                  action={this.props.handleParser}
                  defaultValue={LYRICS.lyrics}
                />
              ) : null
            }
            <LyricsViewer formattedLyrics={LYRICS.formattedLyrics} />
          </section>
        </section>
      </div>
    );
  }
}

Distribute.propTypes = {
  app: PropTypes.object.isRequired, // eslint-disable-line
  distribute: PropTypes.object.isRequired, // eslint-disable-line
  lyrics: PropTypes.object.isRequired, // eslint-disable-line
  history: PropTypes.object.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
  boxMouseDown: PropTypes.func.isRequired,
  boxMouseUp: PropTypes.func.isRequired,
  calculateDuration: PropTypes.func.isRequired,
  handleDecrease: PropTypes.func.isRequired,
  handleKeydown: PropTypes.func.isRequired,
  handleKeyup: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
  handleParser: PropTypes.func.isRequired,
  loadSong: PropTypes.func.isRequired,
  resetDistribution: PropTypes.func.isRequired,
  toggleEditLyrics: PropTypes.func.isRequired,
  toggleIsLoading: PropTypes.func.isRequired,
  toggleLyrics: PropTypes.func.isRequired,
};

export default Distribute;
