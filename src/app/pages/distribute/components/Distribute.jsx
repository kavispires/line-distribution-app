import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import page components
import DistributeEdit from './DistributeEdit';
import DistributeView from './DistributeView';
// Import common components
import { ModeWidget, RequirementWrapper } from '../../../common';

class Distribute extends Component {
  componentDidMount() {
    // this.props.prepareSong(); // not necessary, song comes prepared from api
  }

  componentDidUpdate(prevProps) {
    const hasActiveSong = this.props.distribute.activeSong.id;
    const hasActiveDistribution = this.props.distribute.activeDistribution.id;

    const isNewActiveSong =
      prevProps.distribute.activeSong !== this.props.distribute.activeSong;
    const isNewActiveDistribution =
      prevProps.distribute.activeDistribution !==
      this.props.distribute.activeDistribution;
    const isNewActivation = isNewActiveSong || isNewActiveDistribution;

    if (hasActiveSong && hasActiveDistribution && isNewActivation) {
      // this.props.prepareSong(this.props.distribute.activeSong);
      this.props.mergeActiveDistribution();
    }
  }

  getMembers() {
    const members = { ...this.props.distribute.activeUnit.members };
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
  }

  render() {
    const {
      distribute: {
        activeMemberPill,
        activeDistribution,
        activeSong,
        activeUnit,
        distributeView,
        distributionLines,
        rates,
        remainder,
        timestampsDict,
      },
      activateMemberPill,
      handleDistributeView,
      handleDistributionCategory,
      handleSaveDistribution,
      linkMemberToPart,
    } = this.props;

    const members = this.getMembers();
    console.log(members);

    return (
      <RequirementWrapper requirements={['activeUnit', 'activeSong']}>
        <main className="container container--distribute">
          <div className="distribute__header">
            <h1>Distribute</h1>
            <ModeWidget
              labels={['view', 'edit']}
              active={distributeView}
              action={handleDistributeView}
            />
          </div>

          <DistributeView
            activeSong={activeSong}
            activeUnit={activeUnit}
            members={members}
            distributionLines={distributionLines}
            timestampsDict={timestampsDict}
            rates={activeDistribution.rates}
          />
          {/* {distributeView === 'view' ? (
          ) : (
            <DistributeEdit
              activeDistribution={activeDistribution}
              activateMemberPill={activateMemberPill}
              activeMemberPill={activeMemberPill}
              activeSong={activeSong}
              activeUnit={activeUnit}
              distributionLines={distributionLines}
              handleDistributionCategory={handleDistributionCategory}
              handleSaveDistribution={handleSaveDistribution}
              linkMemberToPart={linkMemberToPart}
              members={members}
              rates={rates}
              remainder={remainder}
            />
          )} */}
        </main>
      </RequirementWrapper>
    );
  }
}

Distribute.propTypes = {
  activeDistribution: PropTypes.object,
  activateMemberPill: PropTypes.func.isRequired,
  distribute: PropTypes.object.isRequired,
  handleDistributeView: PropTypes.func.isRequired,
  handleDistributionCategory: PropTypes.func.isRequired,
  handleSaveDistribution: PropTypes.func.isRequired,
  linkMemberToPart: PropTypes.func.isRequired,
  mergeActiveDistribution: PropTypes.func.isRequired,
  prepareSong: PropTypes.func.isRequired,
};

Distribute.defaultProps = {
  activeDistribution: {},
};

export default Distribute;
