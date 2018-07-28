import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    if (
      nextProps.location.pathname === '/distribute' &&
      nextProps.app.currentUnit !== this.props.app.currentUnit
    ) {
      this.props.handleReset();
    }

    // Reset if a different unit was selected
    if (
      nextProps.app.currentUnit !== this.props.app.currentUnit &&
      this.props.app.currentUnit.id
    ) {
      this.props.setCurrentSong({});
      this.props.resetDistribution();
      this.props.resetLyrics();
    }
  }

  render() {
    return <Header props={this.props} />;
  }
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  checkAuth: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  initDB: PropTypes.func.isRequired,
  resetDistribution: PropTypes.func.isRequired,
  resetLyrics: PropTypes.func.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
};

export default App;
