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
          activeUnit={this.props.artists.activeUnit}
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
  artists: PropTypes.object,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  init: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

App.defaultProps = {
  artists: { activeUnit: {} },
};

export default App;
