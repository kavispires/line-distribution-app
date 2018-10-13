import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

class App extends Component {
  render() {
    return <Header props={this.props} />;
  }
}

App.propTypes = {};

export default App;
