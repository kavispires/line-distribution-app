import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
  componentWillMount() {
    console.log('componentWillMount');
    this.props.init();
  }

  componentWillUpdate(nextProps) {
    console.log('componentWillUpdate');
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.filter('');
    }
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    if (this.props.location.pathname === '/artists'
      && this.props.app.currentBand !== prevProps.app.currentBand) {
      this.props.history.push('/distribute');
    }
  }

  render() {
    console.log('APP loaded.');
    return (<Header />);
  }
}

export default App;
