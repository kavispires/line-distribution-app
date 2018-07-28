import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import shared components
import AdminOnlyScreen from './shared/AdminOnlyScreen';
import LoadingScreen from './shared/LoadingScreen';
import LoginRequiredScreen from './shared/LoginRequiredScreen';

class Romanizer extends Component {
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

    const ADMIN = this.props.admin;

    console.log(ADMIN.hangul.split('\n').join(' '));

    return (
      <div className="container romanizer">
        <h1>Romanizer</h1>
        <ul className="options">
          <li>
            <input
              type="radio"
              id="romanizer-regular"
              name="romanizer-options"
              value="regular"
              onChange={e => this.props.updateRomanizationType(e)}
              checked={ADMIN.romanizationType === 'regular'}
            />
            <label htmlFor="romanizer-regular">Regular</label>
          </li>
          <li>
            <input
              type="radio"
              id="romanizer-portuguese"
              name="romanizer-options"
              value="portuguese"
              onChange={e => this.props.updateRomanizationType(e)}
              checked={ADMIN.romanizationType === 'portuguese'}
            />
            <label htmlFor="romanizer-portuguese">Portuguese</label>
          </li>
        </ul>
        <div className="romanizer-container">
          <textarea
            className="editor"
            placeholder={'placeholderre'}
            onChange={this.props.updateRomanizationResults}
            defaultValue={ADMIN.hangul}
          />
          <textarea
            className="viewer"
            placeholder="Result will show up here."
            onChange={() => {}}
            value={ADMIN.romanizationResult}
            disabled
          />
        </div>
      </div>
    );
  }
}

Romanizer.propTypes = {
  admin: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Romanizer;
