import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import common components
import {
  ActiveSong,
  ActiveUnit,
  Collapsible,
  RequirementWrapper,
} from '../../../common';
import DistributeConnect from './DistributeConnect';

class Distribute extends Component {
  componentDidMount() {
    this.props.prepareSong();
  }

  render() {
    const {
      distribute: {
        activeMemberPill,
        activeSong,
        activeUnit,
        distributionLines,
        rates,
      },
      activateMemberPill,
      handleSaveDistribution,
      linkMemberToPart,
    } = this.props;

    const getMembers = () => {
      const members = { ...activeUnit.members };
      members.ALL = {
        id: 'ALL',
        name: 'ALL',
        colorId: 'col000000',
        color: { number: 0, hex: '#b5b5ba' },
        positions: ['ALL'],
      };
      members.NONE = {
        id: 'NONE',
        name: 'NONE',
        colorId: 'col000031',
        color: { number: 0, hex: '#ebebf2' },
        positions: ['NONE'],
      };
      return members;
    };

    const members = getMembers();

    return (
      <RequirementWrapper requirements={['activeUnit', 'activeSong']}>
        <main className="container container--distribute">
          <h1>Distribute</h1>

          <section className="active-widget__group">
            <ActiveUnit activeUnit={activeUnit} showMembers />
            <ActiveSong activeSong={activeSong} />
          </section>

          <div className="distribute__container">
            <Collapsible title="1. Connect Lines" expanded>
              <DistributeConnect
                distributionLines={distributionLines}
                members={members}
                activateMemberPill={activateMemberPill}
                activeMemberPill={activeMemberPill}
                linkMemberToPart={linkMemberToPart}
                rates={rates}
              />
            </Collapsible>
            <Collapsible title="2. Play" locked>
              Play distribution with youtube video
            </Collapsible>
            <Collapsible title="3. Results" locked>
              Results Visualization
            </Collapsible>
            <Collapsible title="4. Save" expanded>
              Save distriution
              <button className="btn" onClick={handleSaveDistribution}>
                Save
              </button>
            </Collapsible>
          </div>
        </main>
      </RequirementWrapper>
    );
  }
}

Distribute.propTypes = {
  activateMemberPill: PropTypes.func.isRequired,
  distribute: PropTypes.object.isRequired,
  handleSaveDistribution: PropTypes.func.isRequired,
  linkMemberToPart: PropTypes.func.isRequired,
  prepareSong: PropTypes.func.isRequired,
};

Distribute.defaultProps = {};

export default Distribute;
