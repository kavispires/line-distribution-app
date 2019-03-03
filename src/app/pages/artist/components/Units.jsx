import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components
import BiasPicture from './BiasPicture';
// Import common components
import { Tabs, Icon, LoadingIcon, MemberCard } from '../../../common';

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

    return (
      <section className="artist__section">
        <Tabs
          tabs={selectedArtist.units || []}
          action={switchArtistPageTab}
          active={artistPageTab}
          icon={<Icon type="check" color="blue" />}
          iconCondition="official"
        >
          {selectedUnit.id ? (
            <div className="unit-section">
              <div className="unit-section__info">
                <div className="unit-section__summary">
                  <p>
                    <b>Debut Year:</b> {selectedUnit.debutYear || '?'}
                  </p>
                  <p>
                    <b>Official Distributions:</b>{' '}
                    {selectedUnit.distributions.length || 0}
                  </p>
                  <p>
                    <b>Custom Distributions:</b>{' '}
                    {selectedUnit.distributions.length || 0}
                  </p>
                  {selectedUnit.distributions_legacy &&
                  selectedUnit.distributions_legacy.length ? (
                    <p>
                      <b>Legacy Distributions:</b>{' '}
                      {selectedUnit.distributions_legacy.length || 0}
                    </p>
                  ) : null}

                  {isUnitPending ? (
                    <LoadingIcon size="small" />
                  ) : (
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
                        Play with Lyrics <span className="restriction">*</span>
                      </button>
                      <button className="btn" disabled>
                        Random Song
                      </button>
                      <p>
                        <small>* You won&apos;t be able to save this.</small>
                      </p>
                    </div>
                  )}
                </div>
                <div className="unit-section__bias">
                  {isUnitPending ? (
                    <LoadingIcon size="medium" />
                  ) : (
                    <div className="unit-section__bias-wrapper">
                      <BiasPicture bias={bias} />
                      <select className="select" onChange={updateBias}>
                        <option value="">Select your bias...</option>
                        {Object.values(selectedUnit.members).map(member => (
                          <option
                            key={`bias-option-${member.id}`}
                            value={member.id}
                          >
                            Bias: {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <hr className="unit-section__ruler" />
              <h2>Members:</h2>
              {isUnitPending ? (
                <LoadingIcon />
              ) : (
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
              )}
              <hr />
              <h2>Distributions for the unit go here</h2>
              <hr />
              <h2>Legacy Distributions for the unit go here</h2>
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
