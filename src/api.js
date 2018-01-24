import DB from './database/index.js';

/* API */

// API/colors
const fetchAllColors = () => {
  // const result = [];
  // for (let key in DB.COLORS) {
  //   if (DB.COLORS.hasOwnProperty(key)) {
  //     result.push(DB.COLORS[key]);
  //   }
  // }
  // return result;
  return Object.assign({}, DB.COLORS);
};

// API/colors/names
// const fetchAllColorsNames = () => {
//   const result = [];
//   for (let key in DB.COLORS) {
//     if (DB.COLORS.hasOwnProperty(key)) {
//       result.push(DB.COLORS[key].name);
//     }
//   }
//   return result;
// };

// API/colors/:id/name
const fetchColorName = (id) => {
  if (DB.COLORS[id] !== undefined) {
    return DB.COLORS[id].name;
  }
  return 'NO-COLOR-AVAILABLE';
}

// API/positions
const fetchAllPositions = () => {
  // const result = [];
  // for (let key in DB.POSITIONS) {
  //   if (DB.POSITIONS.hasOwnProperty(key)) {
  //     result.push(DB.POSITIONS[key]);
  //   }
  // }
  return Object.assign({}, DB.POSITIONS);
};

// API/positions/names
// const fetchAllPositionsNames = () => {
//   const result = [];
//   for (let key in DB.POSITIONS) {
//     if (DB.POSITIONS.hasOwnProperty(key)) {
//       result.push(DB.POSITIONS[key].name);
//     }
//   }
//   return result;
// };

// API/positions/:id/name
const fetchPositionName = (id) => {
  if (DB.POSITIONS[id] !== undefined) {
    return DB.POSITIONS[id].name;
  }
  return 'NO-COLOR-AVAILABLE';
}







const fetchMember = (id) => {
  if (DB.MEMBERS[id] !== undefined) {
    const member = DB.MEMBERS[id];
    member.color = fetchColorName(member.colorId);
    return member;
  }
  return 'NO-MEMBER-AVAILABLE';
}


const fetchAllMembers = () => {
  const result = [];
  for (let key in DB.MEMBERS) {
    if (DB.MEMBERS.hasOwnProperty(key)) {
      const member = DB.MEMBERS[key];

      result.push(DB.MEMBERS[key]);
    }
  }
  return result;
};

const fetchMemberr = () => {
  const result = [];
  for (let key in DB.MEMBERS) {
    if (DB.MEMBERS.hasOwnProperty(key)) {
      const member = DB.MEMBERS[key];

      result.push(DB.MEMBERS[key]);
    }
  }
  return result;
};

const fetchAllBands = () => {
  const result = [];
  for (let key in DB.MEMBERS) {
    if (DB.MEMBERS.hasOwnProperty(key)) {
      result.push(DB.MEMBERS[key]);
    }
  }
  return result;
};

export default {
  fetchAllColors,
  // fetchAllColorsNames,
  fetchColorName,
  fetchAllPositions,
  // fetchAllPositionsNames,
  fetchPositionName,
};
