import React, { Component } from 'react';

class App extends Component {
  componentWillMount () {
    this.props.parseArtists();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.location.pathname === '/artists'
      && this.props.app.currentBand !== prevProps.app.currentBand) {
      this.props.history.push('/distribute');
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.filter('');
    }
  }

  render () {
    console.log('APP loaded.');
    return (<div />);
  }
}

export default App;
