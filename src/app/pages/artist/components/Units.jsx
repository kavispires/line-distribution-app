import React from 'react';
import PropTypes from 'prop-types';

// Import components
import MemberCard from './MemberCard';
// Import common components
import { Tabs, Icon, LoadingIcon } from '../../../common';

const Units = ({ props }) => {
  const { app, artists, auth } = props;
  const { artistPageTab, selectedArtist, selectedUnit } = artists;

  // If Artist has no unit
  if (!app.pending && !Object.keys(selectedUnit).length) {
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

  const isUnitPending = app.pending && app.pendingInline;

  return (
    <section className="artist__section">
      <Tabs
        tabs={selectedArtist.units || []}
        action={props.switchArtistPageTab}
        active={artistPageTab}
        icon={<Icon type="check" color="blue" />}
        iconCondition="official"
      >
        {selectedUnit.id ? (
          <div className="unit-section">
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
            {isUnitPending ? (
              <LoadingIcon size="small" />
            ) : (
              <div className="unit-section__actions">
                <button className="btn" disabled>
                  Distribute
                </button>
                <button className="btn" disabled>
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
            <hr />
            <h2>Members:</h2>
            {isUnitPending ? (
              <LoadingIcon />
            ) : (
              <div className="unit-section__members">
                {Object.values(selectedUnit.members).map(member => (
                  <MemberCard
                    member={member}
                    key={member.id}
                    favoriteState={
                      auth.user.favoriteMembers &&
                      auth.user.favoriteMembers[member.id]
                    }
                    updateFavoriteMembers={props.updateFavoriteMembers}
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
};

Units.propTypes = {
  props: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  switchArtistPageTab: PropTypes.func.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

export default Units;
