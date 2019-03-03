import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components
import SongsTable from './SongsTable';
// Import common components
import { ActiveUnit, RequirementWrapper } from '../../../common';

class Songs extends Component {
  componentDidMount() {
    this.props.loadSongs();
    this.props.resetSongSearchQuery();
  }

  render() {
    const {
      app: { pending },
      admin: { songs, songSearchQuery },
      distribute: { activeUnit },
    } = this.props;

    // Row click should send user to the selected artist page
    const handleTableClick = e => {
      const { id } = e.target.parentNode;
      if (id) {
        const songId = id.substring(2);
        this.props.activateSong(songId);
        this.props.history.push(`/distribution`);
      }
    };

    return (
      <RequirementWrapper requirements={['activeUnit']}>
        <main className="container container--songs">
          <h1>Songs</h1>
          <ActiveUnit activeUnit={activeUnit} showMembers />
          <h2>All Songs</h2>
          <p>To start a distribution, select a song by clicking on its row.</p>
          <input
            className="artists__search-bar"
            type="text"
            placeholder="Filter songs..."
            onChange={e => this.props.updateSongSearchQuery(e.target.value)}
          />
          <SongsTable
            songs={songs}
            songSearchQuery={songSearchQuery}
            pending={pending.REQUEST_SONGS}
            rowAction={handleTableClick}
          />
        </main>
      </RequirementWrapper>
    );
  }
}

Songs.propTypes = {
  activateSong: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  distribute: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadSongs: PropTypes.func.isRequired,
  resetSongSearchQuery: PropTypes.func.isRequired,
  updateSongSearchQuery: PropTypes.func.isRequired,
};

export default Songs;
