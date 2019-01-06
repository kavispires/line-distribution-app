import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from './Menu';
import LoadingBar from './LoadingBar';

class App extends Component {
  async componentDidMount() {
    await this.props.init();
    await this.props.checkAuth();
    await this.props.loadColors();
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
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default App;
