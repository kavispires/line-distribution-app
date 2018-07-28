import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminOnlyScreen from './AdminOnlyScreen';
import LoadingScreen from './LoadingScreen';
import LoginRequiredScreen from './LoginRequiredScreen';

import Icon, { ICONS_LIST } from './Icon';

class IconSheet extends Component {
  componentWillUpdate(nextProps) {
    if (nextProps.db.loaded !== this.props.db.loaded) {
      this.render();
    }
  }

  render() {
    // LOGIN Check if user is logged in
    if (this.props.user.isAuthenticated === false) {
      return <LoginRequiredScreen props={this.props} redirect="/artists" />;
    }

    // DB Check if db is ready
    if (this.props.db.loaded === false) {
      return <LoadingScreen />;
    }

    // ADMIN Check if user has access to this page
    if (this.props.user.isAdmin === false) {
      return <AdminOnlyScreen />;
    }

    return (
      <div className="container">
        <h1>Icons Sheet</h1>
        <div className="icon-sheet-list-container">
          {ICONS_LIST.map(item => (
            <div className="icon-sheet-list-item">
              <Icon type={item} size="x-large" />
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

IconSheet.propTypes = {
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default IconSheet;
