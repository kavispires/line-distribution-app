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
          activeUnit={this.props.distribute.activeUnit}
          auth={this.props.auth}
          history={this.props.history}
          location={this.props.location}
          login={this.props.login}
          logout={this.props.logout}
          pending={this.props.app.pending}
        />
        {this.props.app.loading && <LoadingBar />}
      </Fragment>
    );
  }
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  distribute: PropTypes.object,
  history: PropTypes.object.isRequired,
  init: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

App.defaultProps = {
  distribute: { activeUnit: {} },
};

export default App;
