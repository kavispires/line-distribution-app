import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import components
import DistributedSongsTable from './DistributedSongsTable';
// Import common components
import { Tabs, Icon, LoadingWrapper, MemberCard } from '../../../common';

class Units extends Component {
  constructor(props) {
    super(props);

    this.redirectToUnit = this.redirectToUnit.bind(this);
  }

  componentDidMount() {
    const { unitId } = this.props.match.params;
    if (unitId && this.props.auth.isAuthenticated) {
      this.props.loadUnit(unitId);
    }
  }

  componentDidUpdate(prevProps) {
    const prevUnitId = prevProps.match.params.unitId;
    const { unitId } = this.props.match.params;
    if (prevUnitId !== unitId && this.props.auth.isAuthenticated) {
      this.props.loadUnit(unitId);
    }
  }

  redirectToUnit(e) {
    const unitId = e.target.id;
    const artistId = this.props.artists.selectedArtist.id;
    if (artistId && unitId && this.props.match.params.unitId !== unitId) {
      this.props.history.push(`/artists/${artistId}/${unitId}`);
    }
  }

  render() {
    const {
      app: { pending },
      artists: { selectedArtist, selectedUnit },
      auth: {
        user: { favoriteMembers },
      },
      match,
      updateFavoriteMembers,
    } = this.props;

    const isUnitPending = pending.REQUEST_UNIT;

    return (
      <section className="artist__section">
        <Tabs
          tabs={selectedArtist.units || []}
          action={this.redirectToUnit}
          active={match.params.unitId}
          icons={{
            official: <Icon type="check" color="blue" inline key="official" />,
            subUnit: <Icon type="sub-unit" color="orange" key="subUnit" />,
          }}
        >
          {selectedUnit.id ? (
            <div className="unit-section">
              <div className="unit-section__info">
                <div className="unit-section__summary">
                  <LoadingWrapper pending={isUnitPending}>
                    <Fragment>
                      <p>
                        <b>
                          {selectedUnit.subUnit ? 'Sub-unit' : ''} Debut Year:
                        </b>{' '}
                        {selectedUnit.debutYear || '?'}
                      </p>
                      <p>
                        <b>Official Distributions:</b>{' '}
                        {selectedUnit.distributions.official.length || 0}
                      </p>
                      <p>
                        <b>Custom Distributions:</b>{' '}
                        {selectedUnit.distributions.custom.length || 0}
                      </p>
                      <p>
                        <b>Rework Distributions:</b>{' '}
                        {selectedUnit.distributions.rework.length || 0}
                      </p>
                      <div className="unit-section__actions">
                        <button
                          className="btn"
                          onClick={() => this.artistRedirect('songs')}
                        >
                          Distribute
                        </button>
                        <button
                          className="btn"
                          onClick={() => this.artistRedirect('lyrics')}
                        >
                          Play with Lyrics{' '}
                          <span className="restriction">*</span>
                        </button>
                        <button className="btn" disabled>
                          Random Song
                        </button>
                        <p>
                          <small>* You won&apos;t be able to save this.</small>
                        </p>
                      </div>
                    </Fragment>
                  </LoadingWrapper>
                </div>
              </div>
              <hr className="unit-section__ruler" />
              <h2>Members:</h2>
              <LoadingWrapper pending={isUnitPending}>
                <div className="unit-section__members">
                  {_.sortBy(
                    Object.values(selectedUnit.members),
                    'birthdate'
                  ).map(member => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      favoriteState={
                        favoriteMembers && favoriteMembers[member.id]
                      }
                      updateFavoriteMembers={updateFavoriteMembers}
                    />
                  ))}
                </div>
              </LoadingWrapper>
              <hr className="unit-section__ruler" />
              <h2>Official Songs Distributions</h2>
              <LoadingWrapper pending={isUnitPending}>
                <DistributedSongsTable
                  distributions={selectedUnit.distributions.official}
                  members={selectedUnit.members}
                  rowAction={this.goToDistribution}
                />
              </LoadingWrapper>
              <h2>Custom Distributions</h2>
              <LoadingWrapper pending={isUnitPending}>
                <DistributedSongsTable
                  distributions={selectedUnit.distributions.custom}
                  members={selectedUnit.members}
                  rowAction={this.goToDistribution}
                />
              </LoadingWrapper>
              <h2>Re-Distributions</h2>
              <LoadingWrapper pending={isUnitPending}>
                <DistributedSongsTable
                  distributions={selectedUnit.distributions.rework}
                  members={selectedUnit.members}
                  rowAction={this.goToDistribution}
                />
              </LoadingWrapper>
            </div>
          ) : (
            <p>
              <Icon type="go-up" color="gray" inline /> Select one of the tabs
              to see the unit information and options.
            </p>
          )}
        </Tabs>
      </section>
    );
  }
}

Units.propTypes = {
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadUnit: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

export default Units;
