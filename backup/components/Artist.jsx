import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import shared components
import Icon from './shared/Icon';
import LoginRequiredScreen from './shared/LoginRequiredScreen';
import LoadingScreen from './shared/LoadingScreen';
import Tabs from './shared/Tabs';
// Import other components
import Member from './Member';
import ArtistSongsTable from './ArtistSongsTable';
// Import Icon components
import FavoriteIcon from './icons/FavoriteIcon';
import LoadingIcon from './icons/LoadingIcon';

class Artist extends Component {
  componentDidMount() {
    if (this.props.db.loaded) {
      this.artistInit();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.db.loaded !== this.props.db.loaded) {
      this.artistInit();
    }
  }

  artistInit() {
    const { artistId } = this.props.match.params;
    if (artistId) {
      this.props.updateSelectedArtist(artistId);
    }
    this.props.loadUserArtists();
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

    const APP = this.props.app;
    const ARTISTS = this.props.artists;

    const { selectedArtist, selectedUnits, selectedUnit } = ARTISTS;

    // SELECTED_ARTIST Check if there is a selected artist
    if (selectedArtist === undefined) {
      return (
        <main className="container">
          <h1>Artist Page</h1>
          <p>
            No artist has been selected. Go to the{' '}
            <Link to="/artists">Artists Page</Link> and select a group.
          </p>
        </main>
      );
    }

    const setArtistUnit = (path, shouldReset = true) => {
      this.props.history.push(`/${path}`);
      this.props.updateShouldReset(shouldReset);
      this.props.updateCurrentUnit(selectedUnit, selectedArtist);
      this.props.updateLatestUnits(selectedUnit.id);
      this.props.toggleIsLoading(false);
      setTimeout(() => {
        if (shouldReset) {
          this.props.resetDistribution();
          this.props.resetSongInfo();
        }
      }, 1000);
    };

    const handleSongClick = e => {
      // Get id of the closest tr element
      const selectedSongId = e.target.closest('tr').id;
      // Set unit, push history and update latest
      setArtistUnit('distribute', false);
      setTimeout(() => {
        this.props.toggleIsLoading(true);
        this.props.updateCurrentSong(selectedSongId);
      }, 1200);
    };

    return (
      <main className="container">
        <section className="section">
          <h1>Artist Page: {selectedArtist.name}</h1>
          <p>
            <b>Genre:</b> {selectedArtist.genre}
          </p>
          <p className="section--flex-wrap">
            <b>Members:</b>
            {selectedArtist.id &&
              selectedArtist.memberList.map(member => {
                const key = `member-${member.name}`;
                return (
                  <span
                    key={key}
                    className={`member-list-item ${member.color.class}`}
                  >
                    {member.name}
                  </span>
                );
              })}
          </p>
        </section>
        <Tabs
          tabs={Object.keys(selectedUnits).map(u => selectedUnits[u])}
          active={ARTISTS.selectedUnit.id}
          action={this.props.switchUnitsTab}
          iconCondition="official"
          iconType="official"
        />

        {selectedUnit && selectedUnit.id ? (
          <section className="unit-content">
            <FavoriteIcon props={this.props} />
            <h3>Debut: {selectedUnit.debutYear}</h3>
            <h3>
              <button
                className="btn btn-inline"
                onClick={() => setArtistUnit('distribute')}
              >
                Distribute
              </button>
              <button
                className="btn btn-inline"
                onClick={() => setArtistUnit('lyrics')}
              >
                Lyrics
              </button>
              <button
                className="btn btn-inline"
                onClick={() => setArtistUnit('songs')}
              >
                Load Song Lyrics
              </button>
            </h3>
            <h3>Members:</h3>
            <div className="unit-members">
              {selectedUnit.members.map(member => (
                <Member key={member.id} member={member} props={this.props} />
              ))}
            </div>
            <h3>Songs:</h3>
            <ul className="icons-legend">
              <li>
                <Icon type="video" size="small-inline" />: has video sync
              </li>
              <li>
                <Icon type="lyrics" size="small-inline" />: has lyrics
              </li>
              <li>
                <Icon type="lyrics-connected" size="small-inline" />: has
                connected lyrics
              </li>
            </ul>
            {
              <ArtistSongsTable
                songs={selectedUnit.songs}
                members={selectedUnit.members}
                handleSongClick={handleSongClick}
              />
            }
          </section>
        ) : (
          <div>
            {APP.isLoading ? (
              <LoadingIcon />
            ) : (
              <p className="tab-padding">Select a unit tab above.</p>
            )}
          </div>
        )}
      </main>
    );
  }
}

Artist.propTypes = {
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  loadUserArtists: PropTypes.func.isRequired,
  resetDistribution: PropTypes.func.isRequired,
  resetSongInfo: PropTypes.func.isRequired,
  switchUnitsTab: PropTypes.func.isRequired,
  toggleIsLoading: PropTypes.func.isRequired,
  updateCurrentSong: PropTypes.func.isRequired,
  updateCurrentUnit: PropTypes.func.isRequired,
  updateLatestUnits: PropTypes.func.isRequired,
  updateSelectedArtist: PropTypes.func.isRequired,
  updateShouldReset: PropTypes.func.isRequired,
};

export default Artist;
