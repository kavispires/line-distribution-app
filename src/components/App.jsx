import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import LoadingBar from './LoadingBar';

class App extends Component {
  componentDidMount() {
    this.props.setIsLoading(true);
    this.props.initDB();
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
  initDB: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default App;
