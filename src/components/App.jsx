import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import LoadingBar from './LoadingBar';

class App extends Component {
  async componentDidMount() {
    await this.props.init();
    await this.props.checkAuth();
    await this.props.loadColors();
  }

  // componentDidUpdate(nextProps) {
  //   if (nextProps.db.loaded !== this.props.db.loaded) {
  //     this.props.checkAuth();
  //     const { location } = this.props;
  //     if (location.pathname === '/artists') {
  //       this.props.loadArtists();
  //     }
  //     if (location.pathname.includes('/artists/')) {
  //       this.props.loadArtist(location.pathname.substr(9), location.search);
  //     }
  //   }
  // }

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
  init: PropTypes.func.isRequired,
  loadColors: PropTypes.func.isRequired,
};

export default App;
