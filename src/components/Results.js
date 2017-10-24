import React, { Component } from 'react';

class Results extends Component {
	componentDidMount () {
		this.props.calculateResults();
	}

  render () {
    return (
	    <section className="container">
	      <h1 className="tiny-h1">Results</h1>
	      <ul className="results">
	      	{
	      		this.props.results.results.map((result, i) => (
	      			<li key={result.name} className={`results-bar`}>

	      				<span className={`results-bar-text`}>
	      					{`${i + 1}. ${result.name} [${Math.round(result.duration / 100) / 10} seconds]`}
	      				</span>
	      				<span className={`results-bar-color color-${result.color} bar-width-${result.relativePercentage}`} />
	      			</li>
	      		))
	      	}
	      </ul>
	      <button className="btn" onClick={() => this.props.history.push('/distribute')}>Done</button>
	    </section>
	    );
  }
}

export default Results;
