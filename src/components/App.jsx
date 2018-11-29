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
      API.setter(true);
      console.log(startDB);
      const test = await API.get(`/users/hbFlRswbZkepQfaONzoyB6EuJSA2`);
      // console.log(test);
      const test2 = await API.get(`/artists/-LDcyPgcJaR4gd8pvVKb/units`);
      const test3 = await API.get(`/units/-LDcyPgbytNzK2BkYaLN`);
      const test4 = await API.get('/colors');
      const test5 = await API.get(`/members/-LDcyPg_LQgDOBQ-wFP3`);
      const test6 = await API.get(`/songs/-LLcdNSHFJj1TqkK0y9f`);
      const test7 = await API.get(`/songs`);
      const test8 = await API.get(`units/-LDcyPgbytNzK2BkYaLM/members`);
      console.log(test8);
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
