import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import shared components
import AdminOnlyScreen from './shared/AdminOnlyScreen';
import Icon from './shared/Icon';
import LoadingScreen from './shared/LoadingScreen';
import LoginRequiredScreen from './shared/LoginRequiredScreen';
import Tabs from './shared/Tabs';
// Import other components
import CreatorArtist from './CreatorArtist';
import CreatorMembers from './CreatorMembers';
import CreatorReview from './CreatorReview';
import CreatorUnit from './CreatorUnit';

class Creator extends Component {
  componentWillMount() {
    if (this.props.db.loaded) {
      this.props.fetchCompleteDatabase();
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.db.loaded !== this.props.db.loaded) {
      this.props.fetchCompleteDatabase();
      this.render();
    }
  }

  render() {
    // LOGIN Check if user is logged in
    if (this.props.auth.isAuthenticated === false) {
      return <LoginRequiredScreen props={this.props} redirect="/artists" />;
    }

    // DB Check if db is ready
    if (this.props.db.loaded === false) {
      return <LoadingScreen />;
    }

    // ADMIN Check if user has access to this page
    if (this.props.auth.isAdmin === false) {
      return <AdminOnlyScreen />;
    }

    const CREATOR = this.props.creator;

    const tabs = [
      { id: 'artist' },
      { id: 'unit' },
      { id: 'members' },
      { id: 'review' },
    ];
    return (
      <main className="container creator-container">
        <div className="creator-header">
          <h1>Creator</h1>
          <Tabs
            tabs={tabs}
            active={CREATOR.tab}
            action={this.props.switchCreatorTab}
          />
        </div>
        <div className="creator-content">
          <p>
            You need to have a complete artist to be able to save, consisting of
            artist, unit and members. <br />
            You may follow your new artist validation in the bottom of the page.
          </p>
          {CREATOR.tab === 'artist' ? (
            <CreatorArtist props={this.props} />
          ) : null}
          {CREATOR.tab === 'unit' ? <CreatorUnit props={this.props} /> : null}
          {CREATOR.tab === 'members' ? (
            <CreatorMembers props={this.props} />
          ) : null}
          {CREATOR.tab === 'review' ? (
            <CreatorReview props={this.props} />
          ) : null}
        </div>
        <div
          className={`creator-message${
            Object.keys(CREATOR.message).length > 0 ? '' : '-close'
          }`}
        >
          {Object.keys(CREATOR.message).map((m, i) => {
            const key = `message${i}`;
            return <p key={key}>{CREATOR.message[m]}</p>;
          })}
        </div>
        <div className="creator-controls">
          <div className="creator-validation">
            <div className="creator-validation-category">
              <Icon type={CREATOR.validation.artist} size="medium" />
              <span>Artist</span>
            </div>
            <div className="creator-validation-category">
              <Icon type={CREATOR.validation.unit} size="medium" />
              <span>Unit</span>
            </div>
            <div className="creator-validation-category">
              <Icon type={CREATOR.validation.members} size="medium" />
              <span>Members</span>
            </div>
          </div>
          <div className="creator-actions">
            <button
              className="btn btn-lg btn-alternative"
              onClick={this.props.reset}
            >
              Clear
            </button>
            <button
              className="btn btn-lg btn-primary"
              disabled={!CREATOR.isValid}
              onClick={this.props.save}
            >
              <Icon type="save" /> Save
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Creator;
