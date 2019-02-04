import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import components
// import MemberCard from './member/MemberCard';
// import LoginRequired from './LoginRequired';
// Import common components
import { FavoriteIcon, RequirementWrapper, Tabs, Icon } from '../../../common';
// import { Icon, FavoriteIcon } from '../app/common';
// import Tabs from './shared/Tabs';

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
    const { artists, auth, db } = this.props;
    const { artistPageTab, selectedArtist, selectedUnit } = artists;

    console.log('artistPageTab', artistPageTab);
    console.log('selectedArtist', selectedArtist);
    console.log('selectedUnit', selectedUnit);

    return <div>Whatever</div>;

    return (
      <RequirementWrapper requirements={['selectedArtist']}>
        <main className="container container--artist">
          <h1>Artist Page</h1>
          <section className="artist__section">
            <h2 className="artist-page__name">
              {selectedArtist.name}
              <FavoriteIcon
                action={this.props.updateFavoriteArtists}
                id={selectedArtist.id || ''}
                className="artist-page__name--fav-icon"
                size="20"
                state={
                  selectedArtist &&
                  selectedArtist.id &&
                  auth.user &&
                  auth.user.favoriteArtists[selectedArtist.id]
                }
              />
            </h2>
            <p className="artist-page__genre">{selectedArtist.genre}</p>
            <ul className="artist-page__members-list">
              {selectedArtist.memberList &&
                selectedArtist.memberList.map(memberName => (
                  <li
                    className="artist-page__member-pill"
                    key={`mp-${memberName}`}
                  >
                    {memberName}
                  </li>
                ))}
            </ul>
          </section>

          <section className="artist__section">
            <Tabs
              tabs={selectedArtist.units || []}
              action={this.props.switchArtistPageTab}
              active={artistPageTab}
              icon={<Icon type="check" color="blue" />}
              iconCondition="official"
            >
              {selectedUnit.id ? (
                <div>
                  <p>
                    <b>Debut Year:</b> {selectedUnit.debutYear || '?'}
                  </p>
                  <p>
                    <b>Official Distributions:</b>{' '}
                    {selectedUnit.distributions.length || 0}
                  </p>
                  <p>
                    <b>Custom Distributions:</b>{' '}
                    {selectedUnit.distributions_legacy.length || 0}
                  </p>
                  <hr />
                  <p>Navigation buttons go here</p>
                  <hr />
                  <h2>Members:</h2>
                  <hr />
                  <h2>Distributions for the unit</h2>
                  <hr />
                  <h2>Legacy Distributions for the unit</h2>
                </div>
              ) : (
                <p>The selected Artist has no units.</p>
              )}
            </Tabs>
          </section>

          {/*
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
        ) : null} */}
        </main>
      </RequirementWrapper>
    );
  }
}

Artist.propTypes = {
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  loadArtist: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  switchArtistPageTab: PropTypes.func.isRequired,
  updateFavoriteArtists: PropTypes.func.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

Artist.defaultProps = {};

export default Artist;
