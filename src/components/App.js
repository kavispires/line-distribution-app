import React, { Component } from 'react';


class App extends Component {
	componentWillMount () {
  	this.props.parseArtists();
  }

  componentDidUpdate (prevProps, prevState) {
  	if (this.props.location.pathname === '/artists'
  		&& this.props.app.currentBand.id !== prevProps.app.currentBand.id) {
  		this.props.history.push('/distribute');
  	}
  }

  render () {
    console.log('APP loaded.');
    return (<div />);
  }
}

export default App;
