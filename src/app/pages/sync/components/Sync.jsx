import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Checkbox, Form, Option, Select, Text } from 'informed';

// Import common components
import { Loading, RequirementWrapper } from '../../../common';
// Import constants
import constants from '../../../../utils/constants';
// Import utility functions
import utils from '../../../../utils';

class Sync extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadArtists();
  }

  render() {
    const {
      app: { pending },
      auth: { isAdmin, user },
      admin: { members },
      updateFavoriteMembers,
    } = this.props;

    if (pending.REQUEST_ARTISTS) {
      return <Loading message="Preparing Sync..." />;
    }

    return (
      <RequirementWrapper>
        <main className="container container--sync">
          <h1>Sync</h1>
          <section className="sync__container">
            <div className="sync__group sync__group--left">
              <div className="sync__video">
                <h3>Video Here</h3>
              </div>
              <div className="sync__step sync__step-4b">
                <h3>4. Distribution Controls</h3>
              </div>
            </div>
            <div className="sync__group sync__group--right">
              <div className="sync__step sync__step-1">
                <h3>1. Video</h3>
              </div>
              <div className="sync__step sync__step-2">
                <h3>2. Info</h3>
              </div>
              <div className="sync__step sync__step-3">
                <h3>3. Lyrics</h3>
              </div>
              <div className="sync__step sync__step-4">
                <h3>4. Distribution</h3>
              </div>
              <div className="sync__step sync__step-5">
                <h3>5. Verify and Save</h3>
              </div>
            </div>
          </section>
        </main>
      </RequirementWrapper>
    );
  }
}

Sync.propTypes = {
  admin: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadMembers: PropTypes.func.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

export default Sync;
