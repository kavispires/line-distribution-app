import React from 'react';

import {
  FavoriteIcon,
  RequirementWrapper,
  Tabs,
  Icon,
  LoadingIcon,
} from '../../../common';

const Units = ({ props, switchArtistPageTab }) => {
  // console.log(props);
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

  const isUnitPending = app.pending && !Object.keys(selectedUnit).length;

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
            {Object.values(selectedUnit.members).map(member => (
              <span>{member.name}</span>
            ))}
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

  //   {/*
  // {selectedUnits ? (
  //   <section className="artist__section">
  //     <Tabs
  //       tabs={Object.keys(selectedUnits).map(u => selectedUnits[u])}
  //       active={selectedUnit.id}
  //       action={this.props.switchUnitsTab}
  //       iconCondition="official"
  //       icon={<Icon type="check" color="blue" inline />}
  //     />
  //     <div className="tabs__content">
  //       <section className="unit-section__top">
  //         <div className="unit-section__summary">
  //           <p>
  //             <b>Debut Year:</b> {selectedUnit.debutYear}
  //           </p>
  //           <p>
  //             <b>Number of Members:</b> {selectedUnit.members.length}
  //           </p>
  //           <p>
  //             <b>Total Number of Songs:</b> NUMBER
  //           </p>
  //         </div>
  //         <div className="unit-section__actions">
  //           <button className="btn">Load Song</button>
  //           <button className="btn">PLACEHOLDER</button>
  //           <button className="btn">PLACEHOLDER</button>
  //         </div>
  //       </section>

  //       {selectedUnit.members && selectedUnit.members.length > 0 ? (
  //         <section className="unit-section">
  //           <h3>Members</h3>
  //           <div className="unit-section__members">
  //             {selectedUnit.members.map(member => (
  //               <MemberCard
  //                 key={member.id}
  //                 favoriteState={auth.user.favoriteMembers[member.id]}
  //                 member={member}
  //                 updateFavoriteMembers={this.props.updateFavoriteMembers}
  //               />
  //             ))}
  //           </div>
  //         </section>
  //       ) : null}
  //     </div>
  //     <div className="tabs__content">SONGS TABLE</div>
  //   </section>
  // ) : null} */}
};

export default Units;
