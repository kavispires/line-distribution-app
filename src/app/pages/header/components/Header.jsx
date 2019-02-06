import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from './Menu';
import LoadingBar from './LoadingBar';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div>
        <Menu
          auth={this.props.auth}
          history={this.props.history}
          location={this.props.location}
          login={this.props.login}
          logout={this.props.logout}
        />
        {this.props.app.isLoading || this.props.app.pending ? (
          <LoadingBar />
        ) : null}
      </div>
    );
  }
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  init: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default App;
