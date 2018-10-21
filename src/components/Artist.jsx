import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import components
import Icon from './shared/Icon';
import LoginRequired from './LoginRequired';
// Import shared components
import FavoriteIcon from './shared/FavoriteIcon';
import MemberCard from './member/MemberCard';
import Tabs from './shared/Tabs';

class Artist extends Component {
  componentDidMount() {
    const { artistId } = this.props.match.params;
    if (
      this.props.artists.selectedArtist &&
      this.props.artists.selectedArtist.id !== artistId
    ) {
      this.props.loadArtist(artistId, this.props.location.search);
    }
  }

  render() {
    const { app, artists, auth, db } = this.props;
    const { selectedArtist, selectedUnit, selectedUnits } = artists;

    if (db.loaded && (!auth.user || !auth.user.uid)) {
      return <LoginRequired login={this.props.login} />;
    }

    // If artists is not loaded yet
    if (!selectedArtist || selectedArtist.id === undefined) {
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

    return (
      <main className="container container--artist">
        <h1>
          Artist Page: {selectedArtist.name}
          <FavoriteIcon
            action={this.props.updateFavoriteArtists}
            id={selectedArtist.id}
            size="20"
            state={
              selectedArtist &&
              selectedArtist.id &&
              auth.user &&
              auth.user.favoriteArtists[selectedArtist.id]
            }
          />
        </h1>
        <section className="artist__section">
          <p>
            <b>Genre:</b> {selectedArtist.genre}
          </p>
          <p>
            <b>Members:</b>
            {selectedArtist.memberList &&
              selectedArtist.memberList.map(member => {
                const key = `pill-member-${member.id}`;
                return (
                  <span
                    key={key}
                    className={`pill background-${member.color.class}`}
                  >
                    {member.name}
                  </span>
                );
              })}
          </p>
        </section>
        {selectedUnits ? (
          <section className="artist__section">
            <Tabs
              tabs={Object.keys(selectedUnits).map(u => selectedUnits[u])}
              active={selectedUnit.id}
              action={this.props.switchUnitsTab}
              iconCondition="official"
              icon={<Icon type="check" color="blue" inline />}
            />
            <div className="tabs__content">
              <section className="unit-section__top">
                <div className="unit-section__summary">
                  <p>
                    <b>Debut Year:</b> {selectedUnit.debutYear}
                  </p>
                  <p>
                    <b>Number of Members:</b> {selectedUnit.members.length}
                  </p>
                  <p>
                    <b>Total Number of Songs:</b> NUMBER
                  </p>
                </div>
                <div className="unit-section__actions">
                  <button className="btn">Load Song</button>
                  <button className="btn">PLACEHOLDER</button>
                  <button className="btn">PLACEHOLDER</button>
                </div>
              </section>

              {selectedUnit.members && selectedUnit.members.length > 0 ? (
                <section className="unit-section">
                  <h3>Members</h3>
                  <div className="unit-section__members">
                    {selectedUnit.members.map(member => (
                      <MemberCard
                        key={member.id}
                        favoriteState={auth.user.favoriteMembers[member.id]}
                        member={member}
                        updateFavoriteMembers={this.props.updateFavoriteMembers}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
            <div className="tabs__content">SONGS TABLE</div>
          </section>
        ) : null}
      </main>
    );
  }
}

Artist.propTypes = {
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  loadArtist: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  switchUnitsTab: PropTypes.func.isRequired,
  updateFavoriteArtists: PropTypes.func.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

Artist.defaultProps = {};

export default Artist;
