import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import common components
import { ActiveUnit, Loading, RequirementWrapper } from '../../../common';
// Import constants
import constants from '../../../../utils/constants';
// Import utility functions
import utils from '../../../../utils';

class Songs extends Component {
  componentDidMount() {
    this.props.loadSongs();
  }

  render() {
    const {
      app: { pending },
      auth: { isAdmin, user },
      admin: { songs },
    } = this.props;

    if (pending.REQUEST_SONGS) {
      return <Loading message="Fecthing Songs..." />;
    }

    return (
      <RequirementWrapper>
        <main className="container container--songs">
          <h1>Songs</h1>
        </main>
      </RequirementWrapper>
    );
  }
}

Songs.propTypes = {
  admin: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadSongs: PropTypes.func.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

export default Songs;
