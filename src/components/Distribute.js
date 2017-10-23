import React, { Component } from 'react';

import { boxSizeClass } from '../utils';

class Distribute extends Component {
	componentWillMount () {
		if (this.props.app.currentBand.members.length !== this.props.distribute.durations.length) {
			const newArray = new Array(this.props.app.currentBand.members.length).fill(0);
			this.props.setDurations([...newArray]);
			this.props.setPercentages([...newArray]);
		}
  }

  render () {
    const currentBand = this.props.app.currentBand;
		const boxSize = boxSizeClass(currentBand.members.length);
		const durations = this.props.distribute.durations;
		const percentages = this.props.distribute.percentages;
		const decreaseClass = this.props.distribute.decrease ? 'btn-decrease' : null;

	  return (
	    <section className="container container-fixed">
	      <h1 className="tiny-h1">Distribute</h1>
	      <h2>{currentBand.bandName}</h2>
	      <ul className="controls">
	      	<li><button className="btn" onClick={this.props.handleReset}>Reset</button></li>
	      	<li><button className="btn" onClick={this.props.handleUndo}>Undo</button></li>
	      	<li><button className={`btn ${decreaseClass}`} onClick={this.props.handleDecrease}>Decrease</button></li>
	      	<li><button className="btn" onClick={this.props.handleFinish}>Finish</button></li>
	      </ul>
	      <h3 className="current-singer">Who is singing</h3>
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
	      				<span className="key">{index + 1}</span>
	      				<span className="member-name">{member.toUpperCase()}</span>
	      				<span className="timestamp">{Math.round(durations[index] / 100) / 10}</span>
	      			</button>
	      		))
		      	:
		      	<p className="text-center">You must select an artist before you can create your vocal line distribution.</p>
	      }
	      </div>
	      <div className="log">log comes here</div>
	    </section>
	    );
  }
}

export default Distribute;
