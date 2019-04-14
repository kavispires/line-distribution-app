import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import page components
import DistributeConnect from './DistributeConnect';
// Import shared components
import { ActiveSong, ActiveUnit } from '../../../common';

const DistributeEdit = ({
  activateMemberPill,
  activeMemberPill,
  activeSong,
  activeUnit,
  distributionLines,
  handleDistributionCategory,
  handleSaveDistribution,
  linkMemberToPart,
  members,
  rates,
  remainder,
}) => (
  <Fragment>
    <section className="active-widget__group">
      <ActiveUnit activeUnit={activeUnit} showMembers />
      <ActiveSong activeSong={activeSong} />
    </section>

    <div className="distribute__content-container">
      <DistributeConnect
        activateMemberPill={activateMemberPill}
        activeMemberPill={activeMemberPill}
        distributionLines={distributionLines}
        linkMemberToPart={linkMemberToPart}
        members={members}
        rates={rates}
        remainder={remainder}
      />
      <div className="distribute__save-section">
        <p>
          <label className="distribute__distribution-category">
            Category*
            <select onChange={handleDistributionCategory}>
              <option value="" disabled>
                Select a type...
              </option>
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
      </div>
    </div>
  </Fragment>
);

DistributeEdit.propTypes = {
  activateMemberPill: PropTypes.func.isRequired,
  activeMemberPill: PropTypes.string,
  activeSong: PropTypes.object,
  activeUnit: PropTypes.object,
  distributionLines: PropTypes.array.isRequired,
  handleDistributionCategory: PropTypes.func.isRequired,
  handleSaveDistribution: PropTypes.func.isRequired,
  linkMemberToPart: PropTypes.func.isRequired,
  members: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  remainder: PropTypes.number,
};

DistributeEdit.defaultProps = {
  activeMemberPill: '',
  activeSong: {},
  activeUnit: {},
  remainder: 0,
};

export default DistributeEdit;
