import _ from 'lodash';

import API from '../api';

import { setLyrics } from './lyrics';

/* ------------------   ACTIONS   ------------------ */

const SET_SONG_LIST = 'SET_SONG_LIST';
const SET_SONG_LIST_BACK_UP = 'SET_SONG_LIST_BACK_UP';

/* --------------   ACTION CREATORS   -------------- */

export const setSongList = payload => dispatch => dispatch({ type: SET_SONG_LIST, payload });
export const setSongListBackUp = payload => dispatch => dispatch({ type: SET_SONG_LIST_BACK_UP, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  songList: [],
  songListBackUp: [],
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_SONG_LIST:
      newState.songList = action.payload;
      break;

    case SET_SONG_LIST_BACK_UP:
      newState.songListBackUp = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const loadSongs = reload => (dispatch, getState) => {
  if (reload) {
    const songList = _.deepClone(getState().songs.songListBackUp);
    dispatch(setSongList(songList));
  } else {
    const songList = API.get('/songs');

    const sortedSongList = _.sortBy(songList, ['title']);
    sortedSongList.forEach((song) => {
      song.computedTitle = `${song.title.toUpperCase()} - ${song.originalArtist.toUpperCase()}`;
    });

    const uniqSongList = _.uniqBy(sortedSongList, 'computedTitle');

    dispatch(setSongList(uniqSongList));
    dispatch(setSongListBackUp(uniqSongList));
  }
};

export const songsfilter = e => (dispatch, getState) => {
  // if (typeof e === 'string') {
  //   return dispatch(setArtistsList([...getState().app.artistListBackUp]));
  // }
  // const value = e.target.value.toLowerCase();
  // if (value.length > 0 && value.length < 3) return;
  // const { artistsSearchIndexation } = getState().app;
  // if (value.length === 0) {
  //   dispatch(setArtistsList([...getState().app.artistListBackUp]));
  // } else {
  //   // Find band names with value and push id to artistList
  //   const filteredArtists = [];
  //   Object.keys(artistsSearchIndexation).forEach((key) => {
  //     const artist = artistsSearchIndexation[key];
  //     if (artist.includes(value)) {
  //       filteredArtists.push(key);
  //     }
  //   });

  //   dispatch(setArtistsList(filteredArtists));
  // }
  console.log(e.target.value);
  dispatch();
};

export const loadSong = song => (dispatch, getState) => {
  const result = song.lyrics.split('');
  // const result = [];

  // Go through every line and remove characters inside [] except ALL
  let deleteMode = false;
  for (let i = 0; i < result.length; i++) {
    if (result[i] === '[') {
      deleteMode = true;
    } else if (result[i] === ']') {
      deleteMode = false;
    } else if (deleteMode) {
      if (result[i] === 'A' && result[i+1] === 'L' && result[i+2] === 'L' && (result[i+3] === ' ' || result[i+3] === '(' || result[i+3] === ']' || result[i+3] === ')')) {
        i += 2;
      } else if (result[i] === ' ' || result[i] === '(' || result[i] === ')') {
        // do nothing
      } else {
        result[i] = '';
      }
    }
  }

  dispatch(setLyrics(result.join('')));
};
