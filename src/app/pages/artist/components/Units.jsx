import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Import components
import BiasPicture from './BiasPicture';
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

    const hasDistributions =
      selectedUnit.distributions && selectedUnit.distributions.length;

    const hasLegacyDistributions =
      selectedUnit.distributions_legacy &&
      selectedUnit.distributions_legacy.length;

    return (
      <section className="artist__section">
        <Tabs
          tabs={selectedArtist.units || []}
          action={switchArtistPageTab}
          active={artistPageTab}
          icons={[
            <Icon type="check" color="blue" inline />,
            <Icon type="sub-unit" color="orange" />,
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
                      {hasLegacyDistributions ? (
                        <p>
                          <b>Legacy Distributions:</b>{' '}
                          {selectedUnit.distributions_legacy.length || 0}
                        </p>
                      ) : null}
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
                  {Object.values(selectedUnit.members).map(member => (
                    <MemberCard
                      averages={{}}
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
              <hr />
              <h2>Distributions</h2>
              {hasDistributions ? (
                <p>List</p>
              ) : (
                <p>This group has no distributions yet.</p>
              )}

              {hasLegacyDistributions ? (
                <Fragment>
                  <hr />
                  <h2>Legacy Distributions</h2>{' '}
                  <p>List of Legacy Distributions</p>
                </Fragment>
              ) : null}
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
  artists: PropTypes.object.isRequired,
};

export default Units;
