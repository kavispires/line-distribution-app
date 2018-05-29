import _ from 'lodash';

import store from './store';
import DB from './database/index.js';
import { ALTERNATIVE_COLOR_LIST } from './constants';

// From number of members, determine the box-size class for boxes in distribution
export const boxSizeClass = (num) => {
  let className;

  if (num === 2 || num === 4) {
    className = 'box-2';
  } else if ((num >= 3 && num <= 6) || num === 9) {
    className = 'box-3';
  } else if (num === 7 || num === 8 || (num >= 10 && num <= 12) || num === 16) {
    className = 'box-4';
  } else {
    className = 'box-5';
  }

  return className;
};

export const getClosestIndex = (collection, target, key) => {
  let closestIndex = 0;
  let smallesDiff = 100;

  collection.forEach((el, i) => {
    if (key !== undefined) {
      el = el[key];
    }
    const diff = Math.abs(target - el);
    if (diff < smallesDiff) {
      smallesDiff = diff;
      closestIndex = i;
    }
  });

  return closestIndex;
};

export const getCurrentBand = (bandId, artists) => {
  bandId = bandId || store.getState().app.currentBand;
  artists = artists || store.getState().app.artists;
  if (artists[bandId] === undefined) console.warn('Couldn\'t find seleced artist id');
  return artists[bandId];
};

export const loadLocalStorage = () => {
  console.log('Fetching from localStorage...');
  const { localStorage } = window;
  const data = localStorage.getItem('linedistribution') || '{}';
  return JSON.parse(data);
};

export const saveLocalStorage = (obj, type) => {
  console.log('Saving to localStorage...');
  window.localStorage.setItem('linedistribution', JSON.stringify(obj));
};

export const copyToClipboard = (element = 'temp-input') => {
  console.log('Copying to clipboard...');
  setTimeout(() => {
    const copyText = document.getElementById(element);
    copyText.select();
    document.execCommand("Copy");
    console.log(`Copied to clipboard`);
    alert(`Text copied to clipboard!`);
  }, 1000);
};

export const getLatestId = (t) => {
  const type = t.toUpperCase();

  let lastId = -1;
  let obj;

  switch (type) {
    case 'ARTISTS':
      obj = DB.ARTISTS;
      break;
    case 'UNITS':
      obj = DB.UNITS;
      break;
    case 'MEMBERS':
      obj = DB.MEMBERS;
      break;
    case 'SONGS':
      obj = DB.SONGS;
      break;
    default:
      obj = {};
  }

  lastId = Math.max(...Object.keys(obj).filter(a => a < 1000));
  return lastId + 1;
};

export const getAlternativeColor = (colorId) => {
  const list = [...ALTERNATIVE_COLOR_LIST[makeIdNumber(colorId)]];
  return makeSixDigit(list[Math.floor(Math.random() * list.length)]);
};

export const parseBirthDate = (d) => {
  const date = `${d}`;
  if (date.length < 5) {
    return date;
  }
  if (date.length === 8) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6);
    return `${month} / ${day} / ${year}`;
  }
  return '?';
};

export const getLyricsSnippet = (str) => {
  // Get first 5 lines, remove blanks, narrow down to 3
  const lyrics = str.split('\n').slice(0, 7).filter(line => line !== '\n');

  let result = [];
  // Remove assignments []
  lyrics.forEach((lyricLine) => {
    const line = lyricLine.split('');
    let toDelete = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '[') {
        toDelete = true;
      }

      if (line[i] === ']') {
        toDelete = false;
        line[i] = '';
      }

      if (toDelete) {
        line[i] = '';
      }
    }

    result.push(line.join(''));
  });

  result = result.join(' / ');

  if (result.length > 100) result = `${result.substring(0, 97).trim()}...`;

  return result;
};

export const makeSixDigit = (num) => {
  const str = num.toString();
  const pad = '000000';
  return pad.substring(0, pad.length - str.length) + str;
};

export const makeIdNumber = (id) => {
  const num = id.substring(3);
  return Number(num);
};

export const capitalizeWord = (str, separator = ' ') => (
  str.toString().split(separator).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
);

export const spinalCaseWord = str => str.toLowerCase().split(' ').join('-');

export const getTrueKeys = (obj) => {
  const keys = [];

  Object.keys(obj).forEach((key) => {
    if (obj[key]) keys.push(key);
  });

  return keys;
};

export const ensureColorUniqueness = (m) => {
  const membersList = _.cloneDeep(m);
  const dict = {};
  const refactoredMembers = [];
  // Loop through members and make color dict
  membersList.forEach((member) => {
    const colorId = member.color.id;
    if (dict[colorId] === undefined) {
      dict[colorId] = 1;
    } else {
      dict[colorId] += 1;
    }
  });

  // Loop again and check for uniqueness, unique stays
  membersList.forEach((member) => {
    const colorId = member.color.id;
    const altColorId = member.altColor.id;
    if (dict[colorId] > 1) {
      if (dict[altColorId] === undefined) {
        const oldColor = member.color;
        member.color = member.altColor;
        member.altColor = oldColor;
      } else {
        console.warn(`Duplicated color for member ${member.id}`);
      }
    }
    refactoredMembers.push(member);
  });
  return refactoredMembers;
};

export const generatePushID = (function () {
  // Modeled after base64 web-safe chars, but ordered by ASCII.
  const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
  let lastPushTime = 0;

  // We generate 72-bits of randomness which get turned into 12 characters and appended to the
  // timestamp to prevent collisions with other clients.  We store the last characters we
  // generated because in the event of a collision, we'll use those same characters except
  // "incremented" by one.
  const lastRandChars = [];

  return function() {
    var now = new Date().getTime();
    var duplicateTime = (now === lastPushTime);
    lastPushTime = now;

    var timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
      now = Math.floor(now / 64);
    }
    if (now !== 0) throw new Error('We should have converted the entire timestamp.');

    var id = timeStampChars.join('');

    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    if(id.length != 20) throw new Error('Length should be 20.');

    return id;
  };
})();
