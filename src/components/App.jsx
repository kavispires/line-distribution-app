import React, { Component } from 'react';
import PropTypes from 'prop-types';

import API from '../api';

import Header from './Header';
import LoadingBar from './LoadingBar';

class App extends Component {
  async componentDidMount() {
    // this.props.initDB();
    // this.props.checkAuth();

    try {
      console.log('==== TRY/CATCH START ====');
      const startDB = await API.init();
      console.log(startDB);
      const get = API.get();
    } catch (error) {
      console.log('ERROR BITCH!!!', error);
    } finally {
      console.log('==== TRY/CATCH DONE ====');
    }
  }

  componentDidUpdate(nextProps) {
    // if (nextProps.db.loaded !== this.props.db.loaded) {
    //   this.props.checkAuth();
    //   const { location } = this.props;
    //   if (location.pathname === '/artists') {
    //     this.props.loadArtists();
    //   }
    //   if (location.pathname.includes('/artists/')) {
    //     this.props.loadArtist(location.pathname.substr(9), location.search);
    //   }
    // }
  }

  render() {
    return (
      <div>
        {/* <Header props={this.props} /> */}
        {/* {this.props.app.isLoading ? <LoadingBar /> : null} */}
      </div>
    );
  }
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  checkAuth: PropTypes.func.isRequired,
  db: PropTypes.object.isRequired,
  initDB: PropTypes.func.isRequired,
  loadArtist: PropTypes.func.isRequired,
  loadArtists: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default App;
