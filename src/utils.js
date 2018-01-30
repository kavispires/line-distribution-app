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

export const saveLocalStorage = () => {
  console.log('saveLocalStorage');
};

export const loadLocalStorage = () => {
  console.log('loadLocalStorage');
  const localStorage = window.localStorage;
  console.log(localStorage);
};

export const copyToClipboard = (element = 'temp-input') => {
  console.log('Copying to clipboard...');
  setTimeout(function() {
    var copyText = document.getElementById(element);
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
      obj = DB.ARTISTS;
      break;
    case 'MEMBERS':
      obj = DB.MEMBERS;
      break;
    default:
      obj = {};
  }

  lastId = Math.max(...Object.keys(obj));
  return lastId + 1;
};

export const getAlternativeColor = (colorId) => {
  const list = [...ALTERNATIVE_COLOR_LIST[colorId]];
  return list[Math.floor(Math.random() * list.length)];
};

export const parseBirthDate = (d) => {
  const date = d + '';
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
