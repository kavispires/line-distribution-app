import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
  componentWillMount() {
    this.props.init();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.artistsfilter('');
    }
    // If going to Distribute, reset distribute when unit is different
    if (nextProps.location.pathname === '/distribute' && nextProps.app.currentUnit !== this.props.app.currentUnit) {
      this.props.handleReset();
    }
  }

  render() {
    return (<Header />);
  }
}

export default App;
