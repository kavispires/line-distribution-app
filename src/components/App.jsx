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
  }

  render() {
    console.log('APP loaded.');
    return (<Header />);
  }
}

export default App;
