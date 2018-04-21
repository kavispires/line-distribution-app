// Seed functions to be used with firebase

import firebase from './firebase';

const makeSixDigit = (num) => {
  const str = num.toString();
  const pad = '000000';
  return pad.substring(0, pad.length - str.length) + str;
};

const populatePositions = () => {
  console.log('populatePositions');
  const result = {};
  Object.keys(DB.POSITIONS).forEach((key) => {
    const position = DB.POSITIONS[key];
    const newId = `pos${makeSixDigit(position.id)}`;
    result[newId] = {
      id: newId,
      name: position.name,
    };
  });
  // dbRef.positions = result;
  // console.log(result);
  // console.log()
  firebase.database().ref('positions').set(result);
};

const populateColors = () => {
  console.log('populateColors');
  const result = {};
  Object.keys(DB.COLORS).forEach((key) => {
    const entry = DB.COLORS[key];
    const newId = `col${makeSixDigit(entry.id)}`;
    result[newId] = {
      id: newId,
      name: entry.name,
      hex: entry.hex,
    };
  });
  firebase.database().ref('colors').set(result);
};

const populateMembers = () => {
  console.log('populateMembers');
  const result = {};
  Object.keys(DB.MEMBERS).forEach((key) => {
    const entry = DB.MEMBERS[key];
    const newId = `mem${makeSixDigit(entry.id)}`;

    const positions = [];
    entry.positions.forEach((val) => {
      const posId = `pos${makeSixDigit(val)}`;
      // positions[posId] = true;
      positions.push(posId);
    });

    result[newId] = {
      altColorId: `col${makeSixDigit(entry.altColorId)}`,
      birthdate: entry.birthdate,
      colorId: `col${makeSixDigit(entry.colorId)}`,
      id: newId,
      name: entry.name,
      positions,
    };
  });
  firebase.database().ref('members').set(result);
};

const populateUnits = () => {
  console.log('populateUnits');
  const result = {};
  Object.keys(DB.UNITS).forEach((key) => {
    const entry = DB.UNITS[key];
    const newId = `uni${makeSixDigit(entry.id)}`;

    const members = [];
    entry.members.forEach((val) => {
      const posId = `mem${makeSixDigit(val)}`;
      members.push(posId);
    });

    result[newId] = {
      artistId: `art${makeSixDigit(entry.bandId)}`,
      debutYear: entry.debutYear,
      id: newId,
      name: entry.name,
      members,
      official: entry.official,
      songs: {
        son0: true,
      },
    };
  });
  firebase.database().ref('units').set(result);
};

const populateArtists = () => {
  console.log('populateArtists');
  const result = {};
  Object.keys(DB.ARTISTS).forEach((key) => {
    const entry = DB.ARTISTS[key];
    const newId = `art${makeSixDigit(entry.id)}`;

    const units = [];
    entry.units.forEach((val) => {
      const posId = `uni${makeSixDigit(val)}`;
      units.push(posId);
    });

    result[newId] = {
      id: newId,
      name: entry.name,
      genre: entry.genre,
      otherNames: entry.otherNames,
      units,
    };
  });
  firebase.database().ref('artists').set(result);
};

setTimeout(() => {
  // console.log(DB);
  // populatePositions();
  // populateColors();
  // populateMembers();
  // populateUnits();
  // populateArtists();
}, 5000);
