import React, { Component } from 'react';

import { KEY_LIST } from '../constants';
import { boxSizeClass } from '../utils';

class Distribute extends Component {
  componentDidMount () {
    window.addEventListener('keydown', this.props.handleKeydown);
    window.addEventListener('keyup', this.props.handleKeyup);
  }

  componentWillMount () {
    if (this.props.app.currentBand.members.length !== this.props.distribute.durations.length) {
      const newArray = new Array(this.props.app.currentBand.members.length).fill(0);
      this.props.setDurations([...newArray]);
      this.props.setPercentages([...newArray]);
      this.props.setHistory([]);
    }
  }

  render () {
    const currentBand = this.props.app.currentBand;
    const boxSize = boxSizeClass(currentBand.members.length);
    const durations = this.props.distribute.durations;
    const percentages = this.props.distribute.percentages;
    const decreaseClass = this.props.distribute.decrease ? 'btn-decrease' : null;

    const who = this.props.distribute.who;
    let whoSentence = "...";
    // Define who sentence
    if (who.length === 1) {
      whoSentence = `${who[0]} is singing.`;
    } else if (who.length > 1) {
      whoSentence = `${who.join(', ')} are singing.`;
    }

    return (
      <section className="container container-fixed">
        <h1 className="tiny-h1">Distribute</h1>
        <h2>{currentBand.bandName}</h2>
        <ul className="controls">
          <li><button className="btn btn-100" onClick={this.props.handleReset}>Reset</button></li>
          <li><button className="btn btn-100" onClick={this.props.handleUndo}>Undo</button></li>
          <li><button className={`btn btn-100 ${decreaseClass}`} onClick={this.props.handleDecrease}>Decrease</button></li>
          <li><button className="btn btn-100" onClick={() => this.props.history.push('/results')}>Finish</button></li>
        </ul>
        <h3 className="current-singer">{ whoSentence }</h3>
        <div className="progress-bar">
        {
          currentBand.colors.map((color, index) => (
            <div key={color} id={`bar-${index}`} className={`bar color-${color} bar-width-${percentages[index]}`} />
          ))
        }
        </div>
        <div className="boxes">
        {
          currentBand ?

            currentBand.members.map((member, index) => (
              <button key={member} id={index} className={`box ${boxSize} color-${currentBand.colors[index]}`} onMouseDown={this.props.boxMouseDown} onMouseUp={this.props.boxMouseUp}>
                <span className="key">{KEY_LIST[index]}</span>
                <span className="member-name">{member.toUpperCase()}</span>
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
              const key = `${item}-${i}`;
              return (
                <div
                  key={key}
                  className={`log-item color-${currentBand.colors[item.memberId]}`}
                  onClick={() => this.props.calculateDuration(item.memberId, item.duration, 0, true, i)}
                  >
                    {currentBand.members[item.memberId]}
                    <span className="details">{Math.round(item.duration / 100) / 10}s | &#215;</span>
                </div>
              );
            })
          }
        </div>
      </section>
      );
  }
}

export default Distribute;
