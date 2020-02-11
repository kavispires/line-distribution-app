import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import common components
import { Icon, Loading, PageTitle } from '..';
// Import images
import logo from '../../../images/logo-neg.svg';

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
    if (!this.state.ready || this.props.app.pending.INITIALIZER) {
      return <Loading message="Loading..." />;
    }

    // Verify Database
    if (this.state.database && !this.props.app.isDatabaseReady) {
      return <Loading message="Fecthing database..." />;
    }

    // Verify Auth
    if (this.state.authentication && this.props.app.pending.RUN_LOGIN) {
      return (
        <Loading message="Authenticating... Please continue in the Google Popup window" />
      );
    }

    // Verify Authentication
    if (
      !this.props.app.isLoading &&
      this.state.authentication &&
      !this.props.auth.isAuthenticated
    ) {
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
    if (
      !this.props.app.isLoading &&
      this.state.admin &&
      !this.props.auth.isAdmin
    ) {
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
      !this.props.app.isLoading &&
      this.state.selectedArtist &&
      (!this.props.artists.selectedArtist ||
        !this.props.artists.selectedArtist.id)
    ) {
      if (this.props.app.isLoading) {
        return <Loading message="Fecthing artist..." />;
      }
      return (
        <main className="container container--artist">
          <PageTitle title="Artist Page" isWarning />
          <p>
            No artist has been selected. Go to the{' '}
            <Link to="/artists">Artists Page</Link> and select a group.
          </p>
        </main>
      );
    }

    // Verify Active Artist
    if (
      !this.props.app.isLoading &&
      this.state.activeArtist &&
      this.props.artists.activeArtist &&
      !this.props.artists.activeArtist.id
    ) {
      return (
        <main className="container container--artist">
          <PageTitle title="Artist Required" isWarning />
          <p>
            No artist has been selected. Go to the{' '}
            <Link to="/artists">Artists Page</Link> and select a group and then
            a unit.
          </p>
        </main>
      );
    }

    // Verify Active Active
    if (
      !this.props.app.isLoading &&
      this.state.activeUnit &&
      this.props.distribute.activeUnit &&
      !this.props.distribute.activeUnit.id
    ) {
      return (
        <main className="container container--artist">
          <PageTitle title="Active Unit Required" isWarning />
          <p>
            No unit has been selected. Go to the{' '}
            <Link to="/artists">Artists Page</Link> and select a group and then
            a unit.
          </p>
        </main>
      );
    }

    if (
      !this.props.app.isLoading &&
      this.state.activeSong &&
      this.props.distribute.activeSong &&
      !this.props.distribute.activeSong.id
    ) {
      return (
        <main className="container container--artist">
          <PageTitle title="Active Song Required" isWarning />
          <p>
            No song has been selected. Go to the{' '}
            <Link to="/songs">Songs Page</Link> and select a song.
          </p>
        </main>
      );
    }

    return <Fragment>{this.props.children}</Fragment>;
  }
}

RequirementWrapper.propTypes = {
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  distribute: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  requirements: PropTypes.array,
};

RequirementWrapper.defaultProps = {
  requirements: [],
};

export default RequirementWrapper;
