import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import LoadingBar from './LoadingBar';

class App extends Component {
  componentDidMount() {
    this.props.setIsLoading(true);
    this.props.initDB();
    this.props.checkAuth();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.db.loaded !== this.props.db.loaded) {
      this.props.checkAuth();

      if (this.props.location.pathname === '/artists') {
        this.props.loadArtists();
      }
    }
  }

  render() {
    return (
      <div>
        <Header props={this.props} />
        {this.props.app.isLoading ? <LoadingBar /> : null}
      </div>
    );
  }
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  checkAuth: PropTypes.func.isRequired,
  db: PropTypes.object.isRequired,
  initDB: PropTypes.func.isRequired,
  loadArtists: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default App;
