import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import LoadingBar from './LoadingBar';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Header props={this.props} />
        {this.props.app.isLoading ? <LoadingBar /> : null}
      </div>
    );
  }
}

App.propTypes = {};

export default App;
