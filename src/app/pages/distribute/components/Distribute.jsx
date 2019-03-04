import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import common components
import { ActiveUnit, RequirementWrapper, ActiveSong } from '../../../common';

class Distribute extends Component {
  componentDidMount() {
    //
  }
  render() {
    const {
      distribute: { activeSong, activeUnit },
    } = this.props;

    return (
      <RequirementWrapper>
        <main className="container container--distribute">
          <h1>Distribute</h1>

          <section className="active-widget__group">
            <ActiveUnit activeUnit={activeUnit} showMembers />
            <ActiveSong activeSong={activeSong} />
          </section>

          <section className="distribute__section">
            Distribution happens here
          </section>
        </main>
      </RequirementWrapper>
    );
  }
}

Distribute.propTypes = {
  distribute: PropTypes.object.isRequired,
};

Distribute.defaultProps = {};

export default Distribute;
