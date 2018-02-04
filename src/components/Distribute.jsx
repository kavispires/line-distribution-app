import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LyricsEditor from './LyricsEditor';
import LyricsViewer from './LyricsViewer';

import { SwitchToggle } from './Widgets';

import { KEY_LIST } from '../constants';
import { boxSizeClass } from '../utils';

class Distribute extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.handleKeydown);
    window.addEventListener('keyup', this.props.handleKeyup);

    // const unitLength = Object.keys(this.props.app.currentUnit).length;
    // if (unitLength > 0
    //   && this.props.distribute.durations.length !== unitLength) {
    //     console.log('UNIT LENGTH', unitLength)
    //     console.log('componentDidMount RESET')
    //   this.reset();
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.app.currentUnit !== this.props.app.currentUnit) {
      this.reset();
      this.props.handleParser(this.props.lyrics.lyrics);
    }
  }

  reset() {
    const newArray = new Array(this.props.app.currentUnit.members.length).fill(0);
    this.props.setDurations([...newArray]);
    this.props.setPercentages([...newArray]);
    this.props.setHistory([]);
  }

  render() {
    const APP = this.props.app;
    const DISTRIBUTE = this.props.distribute;
    const LYRICS = this.props.lyrics;
    const CURRENT_UNIT = APP.currentUnit;

    // IF NO CURRENT_UNIT
    if (CURRENT_UNIT && !CURRENT_UNIT.members) {
      return (
        <div className="container-flex">
          <section className="container container-distribution">
            <section className="section-distribution container-fixed">
              <h1>Distribute</h1>
              <p>You must select an Artist and Unit in the <Link to="/artists">Artists Page</Link> before you can create your line distribution.</p>
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

    const sectionLyricsClasses = showLyrics ? 'section-lyrics-on' : 'section-lyrics-off';

    const placeholder = LYRICS.lyrics ? LYRICS.lyrics : 'Type your lyrics here';

    return (
      <div className="container-flex">
        <section className="container container-distribution">
          <section className="section-distribution container-fixed">
            <h1 className="tiny-h1">Distribute</h1>
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
                    key={member.colorId}
                    id={`bar-${index}`}
                    className={`bar color-${member.colorId} bar-width-${percentages[index]}`}
                  />
                ))
              }
            </div>
            <div className="boxes">
              {
                CURRENT_UNIT ?
                  CURRENT_UNIT.members.map((member, index) => (
                    <button key={member.name} id={index} className={`box ${boxSize} color-${member.colorId}`} onMouseDown={this.props.boxMouseDown} onMouseUp={this.props.boxMouseUp}>
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
                      className={`log-item color-${CURRENT_UNIT.members[item.memberId].colorId}`}
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
                <p className="alert">Line Distribution is paused while you edit the lyrics. When you're done, press the 'Editing...' button to resume line distribution.</p>
              ) : null
            }
            {
              this.props.distribute.editLyrics ? (
                <LyricsEditor placeholder={ placeholder } action={this.props.handleParser} defaultValue={ LYRICS.lyrics } />
              ) : null
            }
            <LyricsViewer formattedLyrics={ LYRICS.formattedLyrics } />
          </section>
        </section>
      </div>
      );
  }
}

export default Distribute;
