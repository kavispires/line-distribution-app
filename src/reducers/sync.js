import _ from 'lodash';
import { SYNC_KEY_LIST } from '../constants';
import { API } from './db';

/* ------------------   ACTIONS   ------------------ */

const RESET = 'RESET';
const SET_ACTIVE_LINE = 'SET_ACTIVE_LINE';
const SET_ACTIVE_PILL = 'SET_ACTIVE_PILL';
const SET_DISTRIBUTION_LINES = 'SET_DISTRIBUTION_LINES';
const SET_FINAL_LYRICS = 'SET_FINAL_LYRICS';
const SET_FORM = 'SET_FORM';
const SET_IS_DISTRIBUTION_COMPLETE = 'SET_IS_DISTRIBUTION_COMPLETE';
const SET_IS_LYRICS_LOCKED = 'SET_IS_LYRICS_LOCKED';
const SET_LAST_ID_NUM = 'SET_LAST_ID_NUM';
const SET_LINK_SEQUENCE_MODE = 'SET_LINK_SEQUENCE_MODE';
const SET_LYRICS = 'SET_LYRICS';
const SET_LYRICS_EDITOR = 'SET_LYRICS_EDITOR';
const SET_PILLS = 'SET_PILLS';
const SET_QUEUE = 'SET_QUEUE';
const SET_STEP = 'SET_STEP';
const SET_TIMESTAMPS = 'SET_TIMESTAMPS';
const SET_VIDEO_ID = 'SET_VIDEO_ID';

/* --------------   ACTION CREATORS   -------------- */

export const reset = payload => dispatch => dispatch({ type: RESET, payload });
export const setActiveLine = payload => dispatch =>
  dispatch({ type: SET_ACTIVE_LINE, payload });
export const setActivePill = payload => dispatch =>
  dispatch({ type: SET_ACTIVE_PILL, payload });
export const setDistributionLines = payload => dispatch =>
  dispatch({ type: SET_DISTRIBUTION_LINES, payload });
export const setFinalLyrics = payload => dispatch =>
  dispatch({ type: SET_FINAL_LYRICS, payload });
export const setForm = payload => dispatch =>
  dispatch({ type: SET_FORM, payload });
export const setIsDistributionComplete = payload => dispatch =>
  dispatch({ type: SET_IS_DISTRIBUTION_COMPLETE, payload });
export const setIsLyricsLocked = payload => dispatch =>
  dispatch({ type: SET_IS_LYRICS_LOCKED, payload });
export const setLastIdNum = payload => dispatch =>
  dispatch({ type: SET_LAST_ID_NUM, payload });
export const setLinkSequenceMode = payload => dispatch =>
  dispatch({ type: SET_LINK_SEQUENCE_MODE, payload });
export const setLyrics = payload => dispatch =>
  dispatch({ type: SET_LYRICS, payload });
export const setLyricsEditor = payload => dispatch =>
  dispatch({ type: SET_LYRICS_EDITOR, payload });
export const setPills = payload => dispatch =>
  dispatch({ type: SET_PILLS, payload });
export const setQueue = payload => dispatch =>
  dispatch({ type: SET_QUEUE, payload });
export const setStep = payload => dispatch =>
  dispatch({ type: SET_STEP, payload });
export const setTimestamps = payload => dispatch =>
  dispatch({ type: SET_TIMESTAMPS, payload });
export const setVideoId = payload => dispatch =>
  dispatch({ type: SET_VIDEO_ID, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  activeLine: null,
  activePill: null,
  distributionLines: [],
  finalLyrics: '',
  form: {
    title: '',
    album: '',
    single: false,
    originalArtist: '',
    videoLink: '',
    groupSize: 1,
  },
  isDistributionComplete: false,
  isLyricsLocked: false,
  lastIdNum: 0,
  linkSequenceMode: false,
  lyrics: '',
  lyricsEditor: true,
  pills: {},
  queue: {},
  step: 1,
  timestamps: {},
  videoId: '',
};

export default function reducer(prevState = initialState, action) {
  let newState = Object.assign({}, prevState);

  switch (action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
      break;

    case SET_ACTIVE_LINE:
      newState.activeLine = action.payload;
      break;

    case SET_ACTIVE_PILL:
      newState.activePill = action.payload;
      break;

    case SET_DISTRIBUTION_LINES:
      newState.distributionLines = action.payload;
      break;

    case SET_FINAL_LYRICS:
      newState.finalLyrics = action.payload;
      break;

    case SET_FORM:
      newState.form = action.payload;
      break;

    case SET_IS_DISTRIBUTION_COMPLETE:
      newState.isDistributionComplete = action.payload;
      break;

    case SET_IS_LYRICS_LOCKED:
      newState.isLyricsLocked = action.payload;
      break;

    case SET_LAST_ID_NUM:
      newState.lastIdNum = action.payload;
      break;

    case SET_LINK_SEQUENCE_MODE:
      newState.linkSequenceMode = action.payload;
      break;

    case SET_LYRICS:
      newState.lyrics = action.payload;
      break;

    case SET_LYRICS_EDITOR:
      newState.lyricsEditor = action.payload;
      break;

    case SET_PILLS:
      newState.pills = action.payload;
      break;

    case SET_QUEUE:
      newState.queue = action.payload;
      break;

    case SET_STEP:
      newState.step = action.payload;
      break;

    case SET_TIMESTAMPS:
      newState.timestamps = action.payload;
      break;

    case SET_VIDEO_ID:
      newState.videoId = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

// Update step
export const updateStep = step => (dispatch, getState) => {
  const currentStep = getState().sync.step;
  let newStep = 1;
  if (typeof step === 'number') {
    newStep = step;
  } else {
    newStep = eval(`${currentStep}${step}`);
  }
  // Trigger lineLinks diff
  if (newStep === 4) {
    dispatch(connectLyricsWithBackUp());
  }

  dispatch(setStep(newStep));
};

// Updates form
export const updateForm = e => (dispatch, getState) => {
  const form = Object.assign({}, getState().sync.form);
  const { name, value } = e.target;
  if (name === 'single') {
    const { checked } = e.target;
    form[name] = checked;
  } else {
    form[name] = value;
  }
  dispatch(setForm(form));
};

export const updateVideoId = e => (dispatch, getState) => {
  const { value } = e.target;
  const { videoLink } = getState().sync.form;
  let id = value;
  if (videoLink !== value && value.includes('youtube')) {
    id = value.split('?v=')[1];
  }
  dispatch(setVideoId(id));
};

// Adds []s in the beginning of every line and remove diplicated spaces
export const prepareLines = () => (dispatch, getState) => {
  const { lyrics } = getState().sync;

  const preparedLyrics = lyrics
    .split('\n')
    .map(line => {
      if (line.length > 0 && !line.startsWith('[')) {
        return `[] ${line}`;
      }
      return line;
    })
    .join('\n')
    .replace(/ +(?= )/g, '');

  dispatch(setLyrics(preparedLyrics));
};

// Verify lyrics and add ids to all []s
export const prepareLyrics = () => (dispatch, getState) => {
  // Add spaces between ending and opening braces
  // Remove spaces between opening and ending braces
  let lyrics = getState().sync.lyrics.replace(/\]\(|\)\[|\[ \]|\( \)/g, s => {
    if (s === '](') return '] (';
    if (s === ')[') return ') [';
    if (s === '( )') return '()';
    if (s === '[ ]') return '[]';
    return s;
  });
  // Add spaces between characters and opening braces
  // Add spaces between ending braces and characters
  lyrics = lyrics.replace(
    /[A-Za-z0-9][(]|[A-Za-z0-9][[]|[)][A-Za-z0-9]|[\]][A-Za-z0-9]/g,
    s => `${s[0]} ${s[1]}`
  );
  // Add brackets before any parentheses
  lyrics = lyrics.replace(
    /[A-Za-z0-9?!][ ][(]|[)][ ][(]|[)][ ][A-Za-z0-9]/g,
    s => `${s[0]}${s[1]}[] ${s[2]}`
  );
  // Add a unique idNum inside each []
  let idNum = getState().sync.lastIdNum;
  lyrics = lyrics.replace(/\[\]/g, () => {
    idNum++;
    return `[${idNum}]`;
  });
  dispatch(setLastIdNum(idNum));
  dispatch(setLyrics(lyrics));
  dispatch(setIsLyricsLocked(true));
};

export const lockLyrics = (locked = true) => (dispatch, getState) => {
  dispatch(prepareLines());
  dispatch(prepareLyrics());
  dispatch(setIsLyricsLocked(locked));
  const { lyrics } = getState().sync;
  dispatch(parseLyricsToObject(lyrics));
};

export const handleLyricsEdit = e => dispatch => {
  let text = '';
  if (typeof e === 'string') {
    text = e;
  } else {
    text = e.target.value || '';
  }
  dispatch(setLyrics(text.replace(/ +(?= )/g, '')));
  dispatch(setIsLyricsLocked(false));
};

export const parseLyricsToObject = lyrics => dispatch => {
  const lines = lyrics.split('\n').map(line => {
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
        parsedLine.push({ id, content, link: null });
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
    parsedLine.push({ id, content, link: null });

    return parsedLine;
  });
  dispatch(setDistributionLines(lines));
};

export const handleKeydown = (e, player) => dispatch => {
  // Only trigger if it is an allowed key and the video is playing
  const { key } = e;
  if (SYNC_KEY_LIST[key] && player && player.getPlayerState() === 1) {
    const timestamp = player.getCurrentTime();
    dispatch(enqueueCapture(key, timestamp));
  }
};

export const handleKeyup = (e, player) => dispatch => {
  const { key } = e;
  if (SYNC_KEY_LIST[key]) {
    const timestamp = player.getCurrentTime();
    dispatch(dequeueCapture(key, timestamp));
  }
};

export const handleBoxMouseDown = (key, player) => dispatch => {
  // Only trigger if it is an allowed key and the video is playing
  if (SYNC_KEY_LIST[key] && player && player.getPlayerState() === 1) {
    const timestamp = player.getCurrentTime();
    dispatch(enqueueCapture(key, timestamp));
  }
};

export const handleBoxMouseUp = (key, player) => dispatch => {
  if (SYNC_KEY_LIST[key]) {
    const timestamp = player.getCurrentTime();
    dispatch(dequeueCapture(key, timestamp));
  }
};

export const enqueueCapture = (id, timestamp) => (dispatch, getState) => {
  const queue = Object.assign({}, getState().sync.queue);
  if (queue[id] === undefined) {
    queue[id] = timestamp;
    dispatch(setQueue(queue));
  }
};

let newPillId = 0;

export const dequeueCapture = (id, timestamp) => (dispatch, getState) => {
  const queue = Object.assign({}, getState().sync.queue);
  const pills = Object.assign({}, getState().sync.pills);
  if (queue[id]) {
    const startTime = queue[id];
    const duration = timestamp - startTime;
    delete queue[id];

    newPillId++;
    pills[newPillId] = {
      pillId: newPillId,
      timestamp: startTime,
      duration,
      link: null,
      key: id,
    };

    dispatch(setQueue(queue));
    dispatch(setPills(pills));
  }
};

export const connectLine = id => (dispatch, getState) => {
  const { activeLine, activePill } = getState().sync;
  if (activeLine === id) {
    dispatch(setActiveLine(null));
  } else if (activePill) {
    dispatch(
      connect(
        id,
        activePill
      )
    );
  } else {
    dispatch(setActiveLine(id));
  }
};

export const connectPill = id => (dispatch, getState) => {
  const { activeLine, activePill } = getState().sync;
  if (activePill === id) {
    dispatch(setActivePill(null));
  } else if (activeLine) {
    dispatch(
      connect(
        activeLine,
        id
      )
    );
  } else {
    dispatch(setActivePill(id));
  }
};

let linksBackUp = {};

export const connect = (lineId, pillId) => (dispatch, getState) => {
  let lines = [...getState().sync.distributionLines];
  let pills = Object.assign({}, getState().sync.pills);

  // Nullify any line with pillId as a link
  lines = nullifyLine(lines, pillId, lineId);
  // Nullify any pill with lineId as a link
  pills = nullifyPill(pills, lineId);
  // Link each other
  function modifyPart(collection, searchId, id, key, newValue) {
    return collection.map(l =>
      l.map(part => {
        if (part[searchId] == id) {
          part[key] = newValue;
        }
        return part;
      })
    );
  }

  pills[pillId].link = lineId;
  modifyPart(lines, 'id', lineId, 'link', pillId);

  // Add to the linksBackUp for when user needs to edit lyrics
  linksBackUp[lineId] = pillId;

  dispatch(setActiveLine(null));
  dispatch(setActivePill(null));

  // Check if distribution is complete
  function isDistributionComplete(collection) {
    let isComplete = true;

    collection.forEach(l =>
      l.forEach(part => {
        if (part.link === null) isComplete = false;
      })
    );
    return isComplete;
  }

  dispatch(setIsDistributionComplete(isDistributionComplete(lines)));
};

export const connectLyricsWithBackUp = () => (dispatch, getState) => {
  return [...getState().sync.distributionLines].map(line =>
    line.map(part => {
      if (linksBackUp[part.id]) {
        part.link = linksBackUp[part.id];
      }
      return part;
    })
  );
};

export const deletePill = () => (dispatch, getState) => {
  const { activePill } = getState().sync;

  if (activePill) {
    const pills = Object.assign({}, getState().sync.pills);
    let lines = [...getState().sync.distributionLines];

    // Nullify any line with activePill as a link
    lines = nullifyPill(lines, activePill);

    delete pills[activePill];

    dispatch(setActivePill(null));
    dispatch(setPills(pills));
    dispatch(setDistributionLines(lines));
  }
};

const nullifyLine = (collection, item, partId = '') => {
  collection.forEach(l =>
    l.forEach(part => {
      if (part.link == item) part.link = null;
    })
  );
  // Also remove from backup
  delete linksBackUp[partId];

  return collection;
};

const nullifyPill = (collection, item) => {
  Object.keys(collection).forEach(k => {
    const pill = collection[k];
    if (pill.link == item) pill.link = null;
  });
  return collection;
};

export const finalizeLyrics = () => (dispatch, getState) => {
  const lines = [...getState().sync.distributionLines];
  const pills = Object.assign({}, getState().sync.pills);

  let finalId = 1;

  const newLines = lines.map(l =>
    l.map(part => {
      part.timestamp = +pills[part.link].timestamp.toFixed(2);
      part.duration = +pills[part.link].duration.toFixed(2);
      return part;
    })
  );

  // Build string
  let finalLyrics = '';
  const timepstamps = {};

  newLines.forEach(l => {
    if (l.length > 0) {
      l.forEach(part => {
        // Join parts
        const bracket = `[${finalId}:${part.timestamp}:${part.duration}] `;
        finalLyrics += `${bracket} ${part.content}`;
        finalId++;
        // Create karaoke-line object
        const second = Math.round(part.timestamp);
        if (timepstamps[second] === undefined) timepstamps[second] = [];
        timepstamps[second].push({
          partId: `part-${part.id}`,
          duration: part.duration,
          size: 0,
          total: part.content.length,
          content: part.content,
        });
      });
    }
    finalLyrics += '\n';
  });
  dispatch(setFinalLyrics(finalLyrics));
  dispatch(setTimestamps(timepstamps));
};

export const saveSong = () => async (dispatch, getState) => {
  const { form, videoId, finalLyrics } = getState().sync;

  const body = {
    title: form.title,
    album: form.album || 'Unknown',
    single: form.single,
    originalArtist: form.originalArtist,
    groupSize: form.groupSize,
    query: `${form.title} - ${form.originalArtist} - ${form.album}`,
    videoId,
    distribution: finalLyrics,
  };

  const response = await API.post('/songs/', body);

  if (response.id) {
    dispatch(setStep(1));
    dispatch(reset());
  }
};

export const resetPillLinks = () => (dispatch, getState) => {
  const pills = Object.assign({}, getState().sync.pills);

  Object.keys(pills).forEach(k => {
    const pill = pills[k];
    pill.link = null;
  });

  dispatch(setPills(pills));
};

let intervalId = null;

export const linkPillsSequence = () => async (dispatch, getState) => {
  let isOn = getState().sync.linkSequenceMode;

  if (isOn) {
    dispatch(setLinkSequenceMode(false));
    clearInterval(intervalId);
    dispatch(setActivePill(null));
  } else {
    dispatch(setLinkSequenceMode(true));
    let { pills } = getState().sync;
    const pillList = Object.keys(pills);

    const findNextPill = () => pillList.find(el => pills[el].link === null);

    let nextActive = findNextPill();

    // While is on mode is turned on, perform every one second
    intervalId = setInterval(() => {
      pills = getState().sync.pills;
      isOn = getState().sync.linkSequenceMode;

      const { activePill } = getState().sync;
      if (activePill === null) {
        nextActive = findNextPill();
        dispatch(setActivePill(nextActive));
      }
      if (nextActive === undefined) {
        clearInterval(intervalId);
        dispatch(setLinkSequenceMode(false));
        dispatch(setActivePill(null));
      }
    }, 1000);
  }
};
