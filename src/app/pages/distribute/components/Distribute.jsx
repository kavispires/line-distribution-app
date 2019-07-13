import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import page components
import DistributeEdit from './DistributeEdit';

// Import common components
import { ModeWidget, RequirementWrapper } from '../../../common';
import DistributeView from './DistributeView';

class Distribute extends Component {
  componentDidMount() {
    this.props.prepareSong();
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.distribute.activeDistribution !==
        this.props.distribute.activeDistribution ||
        prevProps.distribute.activeSong !== this.props.distribute.activeSong) &&
      this.props.distribute.activeSong.id &&
      this.props.distribute.activeDistribution.id
    ) {
      this.props.prepareSong(this.props.distribute.activeSong);
      this.props.mergeActiveDistribution();
    }
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
            <ModeWidget
              labels={['view', 'edit']}
              active={distributeView}
              action={handleDistributeView}
            />
          </div>

          {distributeView === 'view' ? (
            <DistributeView
              activeSong={activeSong}
              activeUnit={activeUnit}
              members={members}
              distributionLines={distributionLines}
              timestampsDict={timestampsDict}
              rates={activeDistribution.rates}
            />
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
          )}
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
