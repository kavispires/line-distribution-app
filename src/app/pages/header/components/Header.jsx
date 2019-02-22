import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Import components
import Menu from './Menu';
import LoadingBar from './LoadingBar';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <Fragment>
        <Menu
          auth={this.props.auth}
          history={this.props.history}
          location={this.props.location}
          login={this.props.login}
          logout={this.props.logout}
        />
        {this.props.app.loading ? <LoadingBar /> : null}
      </Fragment>
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
