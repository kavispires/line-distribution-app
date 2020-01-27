import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Import components
import Menu from './Menu';
import LoadingBar from './LoadingBar';

class App extends Component {
  componentDidMount() {
    this.props.db.user.init(this);
  }

  render() {
    const { db, distribute, history, location } = this.props;

    const isPending = Object.values(db).some(item => item?.isPending);

    return (
      <Fragment>
        <Menu
          activeUnit={distribute.activeUnit}
          history={history}
          location={location}
          user={db.user}
          login={db.user.login}
          logout={db.user.logout}
        />
        {isPending && <LoadingBar />}
      </Fragment>
    );
  }
}

App.propTypes = {
  db: PropTypes.object.isRequired,
  distribute: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func,
  logout: PropTypes.func,
};

App.defaultProps = {
  distribute: { activeUnit: {} },
  login: () => {},
  logout: () => {},
};

export default App;
