import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import common components
import { Icon } from '..';
// Import images
import logo from '../../../images/logo-neg.svg';
import loading from '../../../images/loading.svg';
import ErrorPage from '../../pages/error';

class RequirementWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      database: true,
      authentication: true,
      admin: false,
      activeArtist: false,
      ready: false,
    };
  }

  componentDidMount() {
    if (!this.state.ready) {
      this.parseRequirements();
    }
  }

  parseRequirements() {
    this.props.requirements.forEach(requirement => {
      this.setState({ [requirement]: true });
    });
    this.setState({ ready: true });
  }

  render() {
    // If error is active
    if (this.props.app.error) {
      console.log('AN ERROR HAS HAPPENED!');
      // this.props.history.push('error');
      return <ErrorPage />;
    }

    if (!this.state.ready) {
      return <Loading message="Loading..." />;
    }

    // Verify Database
    if (this.state.database && !this.props.app.databaseReady) {
      return <Loading message="Fecthing database..." />;
    }

    // Verify Authentication
    if (this.state.authentication && !this.props.auth.isAuthenticated) {
      return (
        <main className="container container--flex container--center container--requirement-wrapper">
          <div className="requirement-wrapper__container">
            <img className="login-logo" src={logo} alt="Line Distribution" />
            <p>You must be logged in to access this page.</p>
            <button className="btn btn-simple" onClick={this.props.login}>
              Sign-in now <Icon type="login" color="black" inline />
            </button>
          </div>
        </main>
      );
    }

    // Verify Admin
    if (this.state.admin && !this.props.auth.isAdmin) {
      return (
        <main className="container container--flex container--center container--requirement-wrapper">
          <div className="requirement-wrapper__container">
            <div className="requirement-wrapper__big-icon">
              <Icon type="stop" color="red" size={120} />
            </div>
            <p>You must be an administrator to access this page.</p>
          </div>
        </main>
      );
    }

    // Verify Selected Artist
    if (
      this.state.selectedArtist &&
      (!this.props.artists.selectedArtist ||
        !this.props.artists.selectedArtist.id)
    ) {
      if (this.props.app.isLoading) {
        return <Loading message="Fecthing artist..." />;
      }
      return (
        <main className="container container--artist">
          <h1>Artist Page</h1>
          <p>
            No artist has been selected. Go to the{' '}
            <Link to="/artists">Artists Page</Link> and select a group.
          </p>
        </main>
      );
    }

    // Verify Active Artist
    if (
      this.state.activeArtist &&
      this.props.artists.activeArtist &&
      this.props.artists.activeArtist.id
    ) {
      return (
        <main className="container container--artist">
          <h1>Artist Required</h1>
          <p>
            No artist has been selected. Go to the{' '}
            <Link to="/artists">Artists Page</Link> and select a group and then
            a unit.
          </p>
        </main>
      );
    }

    return <div className="wrapper">{this.props.children}</div>;
  }
}

const Loading = ({ message = '' }) => (
  <main className="container container--flex container--center container--requirement-wrapper">
    <div className="requirement-wrapper__container">
      <img
        className="requirement-wrapper__loading-icon"
        src={loading}
        alt="Loading Icon"
      />
      <p>{message}</p>
    </div>
  </main>
);

RequirementWrapper.propTypes = {
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  requirements: PropTypes.array,
};

RequirementWrapper.defaultProps = {
  requirements: [],
};

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: '',
};

export default RequirementWrapper;
