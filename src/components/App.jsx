import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
  componentWillMount() {
    this.props.initDB();
    this.props.checkAuth();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.db.loaded !== this.props.db.loaded) {
      this.props.checkAuth();
    }

    // If going to Distribute, reset distribute when unit is different
    if (nextProps.location.pathname === '/distribute' && nextProps.app.currentUnit !== this.props.app.currentUnit) {
      this.props.handleReset();
    }

    // Reset if a different unit was selected
    if (nextProps.app.currentUnit !== this.props.app.currentUnit && this.props.app.currentUnit.id) {
      this.props.setCurrentSong({});
      this.props.resetDistribution();
      this.props.resetLyrics();
    }
  }

  render() {
    return (<Header props={this.props} />);
  }
}

export default App;
