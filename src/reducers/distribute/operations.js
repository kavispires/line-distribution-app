import _ from 'lodash';

import actions from './actions';

const activateSong = id => (dispatch, getState) => {
  // Reset everything but Unit
  dispatch(actions.resetDistributeSong({}));

  const activeSong = _.find(getState().db.songs, { id });

  // Determine if it's a view or edit
  const { songsDict } = getState().distribute.activeUnit || {};
  const distributeView = songsDict[activeSong.id] ? 'view' : 'edit';
  dispatch(actions.setDistributeView(distributeView));

  dispatch(actions.setActiveSong(activeSong));
};

const activateUnit = () => (dispatch, getState) => {
  // Reset everything
  dispatch(actions.resetDistribute({}));

  const selectedArtist = { ...getState().artists.selectedArtist };
  const activeUnit = { ...getState().artists.selectedUnit };

  activeUnit.artistName = selectedArtist.name;
  activeUnit.genre = selectedArtist.genre;

  dispatch(actions.setActiveUnit(activeUnit));
};

const prepareSong = () => (dispatch, getState) => {
  const { activeSong } = getState().distribute;
  if (activeSong.id) {
    const distributionString = activeSong.distribution;

    const buildPartData = data => {
      const [id, startTime, duration] = data.split(':');
      return {
        id,
        startTime: +startTime,
        duration: +duration,
        endTime: +startTime + +duration,
      };
    };

    // Iterate through lines
    const distributionLines = distributionString.split('\n').map(line => {
      if (line.length < 2) {
        return [];
      }
      const parsedLine = [];
      let insideBracket = false;
      let id = '';
      let content = '';

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '[' && i > 0) {
          content = content[0] === ' ' ? content.substring(1) : content;
          parsedLine.push({ ...buildPartData(id), content, memberId: [] });
        }

        if (char === '[') {
          insideBracket = true;
          id = '';
          content = content.trim();
        } else if (char === ']') {
          insideBracket = false;
          content = '';
        } else if (insideBracket) {
          id += char;
        } else {
          content += char;
        }
      }
      content = content[0] === ' ' ? content.substring(1) : content;
      parsedLine.push({ ...buildPartData(id), content, memberId: [] });

      return parsedLine;
    });

    dispatch(actions.setDistributionLines(distributionLines));
  }
};

const activateMemberPill = id => (dispatch, getState) => {
  const { activeMemberPill } = getState().distribute;

  if (id === activeMemberPill) {
    dispatch(actions.setActiveMemberPill(''));
  } else {
    dispatch(actions.setActiveMemberPill(id));
  }
};

const linkMemberToPart = id => (dispatch, getState) => {
  const { activeMemberPill } = getState().distribute;

  if (!activeMemberPill) return;

  const distributionLines = [...getState().distribute.distributionLines];

  for (let l = 0; l < distributionLines.length; l++) {
    const line = distributionLines[l];
    let found = false;
    for (let p = 0; p < line.length; p++) {
      const part = line[p];

      if (part.id === id) {
        // If it already has the member, remove it
        if (part.memberId.includes(activeMemberPill)) {
          part.memberId = part.memberId.filter(m => m !== activeMemberPill);
        }
        // If the active pill is NONE, replace it by NONE
        else if (activeMemberPill === 'NONE') {
          part.memberId = ['NONE'];
        }
        // If there was already a none, only add the new member
        else if (part.memberId[0] === 'NONE') {
          part.memberId = [activeMemberPill];
        }
        // Any other case, just push the member
        else {
          part.memberId.push(activeMemberPill);
        }

        found = true;
        break;
      }
    }
    if (found) break;
  }
  dispatch(actions.setDistributionLines(distributionLines));
  dispatch(calculateRates(distributionLines));
};

const calculateRates = distributionLines => dispatch => {
  const rates = {
    total: 0,
    remaining: 0,
    max: 0,
  };

  for (let l = 0; l < distributionLines.length; l++) {
    const line = distributionLines[l];
    for (let p = 0; p < line.length; p++) {
      const part = line[p];
      if (part.memberId.length) {
        for (let m = 0; m < part.memberId.length; m++) {
          rates.total += part.duration;
          const mId = part.memberId[m];
          if (rates[mId] === undefined) {
            // [duration, absolute percentage, relative percentage]
            rates[mId] = [0, 0, 0];
          }
          rates[mId][0] += part.duration;
          // Replace max if greater than previous max
          if (rates[mId][0] > rates.max) [rates.max] = rates[mId];
        }
      } else {
        rates.remaining += part.duration;
      }
    }
  }

  // Calculate percentages
  Object.keys(rates).forEach(key => {
    if (key === 'max' || key === 'remaining' || key === 'total') return;
    const rate = rates[key];
    // Add absolute percentage
    rate[1] = Number(((100 * rate[0]) / rates.total).toFixed(1));
    // Add relative percentage (bar width)
    rate[2] = Math.round((100 * rate[0]) / rates.max);
  });

  dispatch(actions.setRates(rates));
  dispatch(calculateRemainder(rates));
};

const calculateRemainder = rates => dispatch => {
  let remainder = 0;

  if (rates.remaining === 0 && rates.total === 0) {
    remainder = 100;
  } else if (rates.remaining > 0 && rates.total > 0) {
    remainder = Math.round(
      (100 * rates.remaining) / (rates.total + rates.remaining)
    );
  } else if (rates.remaining === 0 && rates.total > 0) {
    remainder = 0;
  }
  dispatch(actions.setDistributionRemainder(remainder));
};

const handleDistributionCategory = event => async dispatch => {
  const { value } = event.target;
  dispatch(actions.setDistributionCategory(value));
};

const handleSaveDistribution = () => async (dispatch, getState) => {
  const { rates } = getState().distribute;
  const ratesToSave = {};
  Object.entries(rates).forEach(entry => {
    if (Array.isArray(entry[1])) {
      ratesToSave[entry[0]] = entry[1][0]; // eslint-disable-line
    } else {
      ratesToSave[entry[0]] = entry[1]; // eslint-disable-line
    }
  });

  const body = {
    category: getState().distribute.category,
    songId: getState().distribute.activeSong.id,
    rates: ratesToSave,
    relationships: '',
    features: [],
    unitId: getState().distribute.activeUnit.id,
  };

  // Build relationships
  const relationships = {};
  getState().distribute.distributionLines.forEach(line =>
    line.forEach(part => {
      relationships[part.id] = part.memberId;
    })
  );

  body.relationships = JSON.stringify(relationships);

  // TO-DO: add featuring artists

  await dispatch({ type: 'SEND_DISTRIBUTION', body });
};

const handleDistributeView = label => (dispatch, getState) => {
  if (label !== getState().distribute.distributeView) {
    dispatch(actions.setDistributeView(label));
  }
};

export default {
  activateMemberPill,
  activateSong,
  activateUnit,
  handleDistributeView,
  handleDistributionCategory,
  handleSaveDistribution,
  linkMemberToPart,
  prepareSong,
};
