import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import components
import BiasPicture from './BiasPicture';
import DistributedSongsTable from './DistributedSongsTable';
// Import common components
import {
  Tabs,
  Icon,
  LoadingWrapper,
  MemberCard,
  Select,
} from '../../../common';

class Units extends Component {
  componentDidMount() {
    this.props.props.getBias();
    this.goToDistribution = this.goToDistribution.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.props.artists.selectedUnit.id !==
      this.props.props.artists.selectedUnit.id
    ) {
      this.props.props.getBias();
    }
  }

  artistRedirect(page) {
    this.props.props.activateUnit();

    this.props.props.history.push(`/${page}`);
  }

  goToDistribution(distribution) {
    if (distribution && distribution.id && distribution.songId) {
      this.artistRedirect('distribute');
      this.props.props.activateSongDistribution(distribution);
    }
  }

  render() {
    const {
      props: {
        app,
        artists: { artistPageTab, bias, selectedArtist, selectedUnit },
        auth,
        switchArtistPageTab,
        updateBias,
        updateFavoriteMembers,
      },
    } = this.props;

    // If Artist has no unit
    if (!app.loading && !Object.keys(selectedUnit).length) {
      return (
        <section className="artist__section">
          <div className="tabs-container">
            <p className="tabs-content--empty">
              This artist has no units available.
            </p>
          </div>
        </section>
      );
    }

    const isUnitPending = app.pending.REQUEST_UNIT;

    return (
      <section className="artist__section">
        <Tabs
          tabs={selectedArtist.units || []}
          action={switchArtistPageTab}
          active={artistPageTab}
          icons={[
            <Icon type="check" color="blue" inline key="official" />,
            <Icon type="sub-unit" color="orange" key="subUnit" />,
          ]}
          iconConditions={['official', 'subUnit']}
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
                        {selectedUnit.distributions.length || 0}
                      </p>
                      <p>
                        <b>Custom Distributions:</b>{' '}
                        {selectedUnit.distributions.length || 0}
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
                <div className="unit-section__bias">
                  <LoadingWrapper pending={isUnitPending}>
                    <div className="unit-section__bias-wrapper">
                      <BiasPicture bias={bias} />
                      <Select
                        action={updateBias}
                        options={selectedUnit.members}
                        optionValue="id"
                        optionName="name"
                        optionPrefix="Bias: "
                        placeholder="Select your bias..."
                      />
                    </div>
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
                      averages={selectedUnit.averages[member.id]}
                      key={member.id}
                      member={member}
                      favoriteState={
                        auth.user.favoriteMembers &&
                        auth.user.favoriteMembers[member.id]
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
            </div>
          ) : (
            <p>The selected Artist has no units.</p>
          )}
        </Tabs>
      </section>
    );
  }
}

Units.propTypes = {
  props: PropTypes.object.isRequired,
};

export default Units;
