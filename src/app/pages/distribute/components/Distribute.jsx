import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import common components
import {
  ActiveSong,
  ActiveUnit,
  Collapsible,
  ModeWidget,
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
        remainder,
      },
      activateMemberPill,
      handleDistributionCategory,
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
          <div className="distribute__header">
            <h1>Distribute</h1>
            <ModeWidget />
          </div>

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
                remainder={remainder}
              />
            </Collapsible>
            <Collapsible title="2. Play" locked>
              Play distribution with youtube video
            </Collapsible>
            <Collapsible title="3. Results" locked>
              Results Visualization
            </Collapsible>
            <Collapsible title="4. Save" expanded>
              <p>
                <label className="distribute__distribution-category">
                  Category*
                  <select onChange={handleDistributionCategory}>
                    <option value="OFFICIAL">Official</option>
                    <option value="WOULD">How they would sing</option>
                    <option value="SHOULD">How they should sing</option>
                  </select>
                </label>
              </p>
              <p>
                <button
                  className="btn"
                  onClick={handleSaveDistribution}
                  disabled={remainder}
                >
                  Save
                </button>
              </p>
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
  handleDistributionCategory: PropTypes.func.isRequired,
  handleSaveDistribution: PropTypes.func.isRequired,
  linkMemberToPart: PropTypes.func.isRequired,
  prepareSong: PropTypes.func.isRequired,
};

Distribute.defaultProps = {};

export default Distribute;
