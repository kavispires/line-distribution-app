import actions from './actions';

import constants from '../../utils/constants';

const handleVideoId = e => dispatch => {
  const { value } = e.target;

  let videoId = '';
  // TO-DO: Check if value is one of the placeholders and assign correct video id

  // Parse youtube link
  if (value.startsWith('https://youtu.be/')) {
    videoId = value.substring(17);
  } else if (value && !videoId) {
    const youtubeLink = value.split('v=');
    if (youtubeLink.length === 1) {
      [videoId] = youtubeLink;
    } else if (youtubeLink.length === 2) {
      const youtubeLinkQuery = youtubeLink[1].split('&');
      [videoId] = youtubeLinkQuery;
    }
  }

  dispatch(actions.setVideoId(videoId));
};

const handleFormInfo = (formState, originalArtist) => (dispatch, getState) => {
  // Original Artist is required
  if (!originalArtist) return;

  const info = {};

  const { artistsTypeaheadDict } = getState().db;
  if (artistsTypeaheadDict[originalArtist]) {
    info.artistId = artistsTypeaheadDict[originalArtist];
    info.originalArtist = originalArtist;
  }

  if (Object.values(formState.values)) {
    info.album = formState.values.album;
    info.groupSize = formState.values.groupSize;
    info.single = formState.values.single || false;
    info.title = formState.values.title;
    info.private = formState.values.private;
  }

  info.videoId = getState().sync.videoId;

  dispatch(actions.setInfo(info));
  dispatch(unlockNextStep());
};

const unlockNextStep = () => (dispatch, getState) => {
  let { step } = getState().sync;
  const steps = { ...getState().sync.steps };

  steps[step].locked = true;
  steps[step].expanded = false;
  steps[step + 1].locked = false;
  steps[step + 1].expanded = true;

  step++;

  if (step === 5) {
    dispatch(finalizeLyrics());
  }
  dispatch(actions.setStep(step));
  dispatch(actions.setSteps(steps));
};

const unlockSpecificStep = num => (dispatch, getState) => {
  if (!num) return;

  let { step } = getState().sync;
  const steps = { ...getState().sync.steps };

  Object.values(steps).forEach(st => {
    st.locked = true;
    st.expanded = false;
  });

  steps[+num].locked = false;
  steps[+num].expanded = true;

  step = +num;

  dispatch(actions.setStep(step));
  dispatch(actions.setSteps(steps));

  if (+num === 3) {
    dispatch(actions.setAreLyricsLocked(false));
  }
};

// Adds []s in the beginning of every line and remove diplicated spaces
const prepareLines = (clearBrackets = false) => (dispatch, getState) => {
  const { lyrics } = getState().sync;

  let preparedLyrics = lyrics;

  if (clearBrackets) {
    preparedLyrics = preparedLyrics.replace(/\[(.*?)\]/g, '[]');
  }

  preparedLyrics = preparedLyrics
    .split('\n')
    .map(line => {
      if (line.length > 0 && !line.startsWith('[')) {
        return `[] ${line}`;
      }
      return line;
    })
    .join('\n')
    .replace(/ +(?= )/g, '');

  dispatch(actions.setLyrics(preparedLyrics));
};

// Verify lyrics and add ids to all []s
const prepareLyrics = () => (dispatch, getState) => {
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
  dispatch(actions.setLastIdNum(idNum));
  dispatch(actions.setLyrics(lyrics));
  dispatch(actions.setAreLyricsLocked(true));
};

const lockLyrics = (locked = true) => (dispatch, getState) => {
  dispatch(prepareLines());
  dispatch(prepareLyrics());
  dispatch(actions.setAreLyricsLocked(locked));
  const { lyrics } = getState().sync;
  dispatch(parseLyricsToObject(lyrics));
};

const handleLyricsEdit = e => dispatch => {
  let text = '';
  if (typeof e === 'string') {
    text = e;
  } else {
    text = e.target.value || '';
  }
  dispatch(actions.setLyrics(text.replace(/ +(?= )/g, '')));
  dispatch(actions.setAreLyricsLocked(false));
};

const parseLyricsToObject = lyrics => (dispatch, getState) => {
  let lineCount = 0;
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
        lineCount++;
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
    parsedLine.push({ id, content, link: null, color: null });

    return parsedLine;
  });
  dispatch(actions.setSyncDistributionLines(lines));

  const stats = { ...getState().sync.stats };
  stats.lines = lineCount;

  dispatch(actions.setSyncStats(stats));

  setTimeout(() => {
    dispatch(unlockNextStep());
  }, 1000);
};

const handleSyncKeydown = (event, player) => dispatch => {
  // Only trigger if it is an allowed key and the video is playing
  const { key } = event;
  if (constants.SYNC_KEY_LIST[key] && player && player.getPlayerState() === 1) {
    const timestamp = player.getCurrentTime();
    dispatch(enqueueCapture(key, timestamp));
  }
};

const handleSyncKeyup = (event, player) => dispatch => {
  const { key } = event;
  if (constants.SYNC_KEY_LIST[key]) {
    const timestamp = player.getCurrentTime();
    dispatch(
      dequeueCapture(key, timestamp, constants.SYNC_KEY_COLOR_LIST[key])
    );
  }
};

const handleSyncBoxMouseDown = (key, player) => dispatch => {
  // Only trigger if it is an allowed key and the video is playing
  if (constants.SYNC_KEY_LIST[key] && player && player.getPlayerState() === 1) {
    const timestamp = player.getCurrentTime();
    dispatch(enqueueCapture(key, timestamp));
  }
};

const handleSyncBoxMouseUp = (key, player, color) => dispatch => {
  if (constants.SYNC_KEY_LIST[key]) {
    const timestamp = player.getCurrentTime();
    dispatch(dequeueCapture(key, timestamp, color));
  }
};

const enqueueCapture = (id, timestamp) => (dispatch, getState) => {
  const queue = Object.assign({}, getState().sync.queue);
  if (queue[id] === undefined) {
    queue[id] = timestamp;
    dispatch(actions.setQueue(queue));
  }
};

let newPillId = 0;

const dequeueCapture = (id, timestamp, color) => (dispatch, getState) => {
  const queue = Object.assign({}, getState().sync.queue);

  if (queue[id]) {
    const pills = Object.assign({}, getState().sync.pills);
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
      color,
    };

    dispatch(actions.setQueue(queue));
    dispatch(actions.setPills(pills));

    const stats = { ...getState().sync.stats };
    stats.pills = Object.keys(pills).length;
    dispatch(actions.setSyncStats(stats));
  }
};

const connectSyncLine = id => (dispatch, getState) => {
  const { activeLine, activePill } = getState().sync;
  if (activeLine === id) {
    dispatch(actions.setActiveLine(null));
  } else if (activePill) {
    dispatch(
      connect(
        id,
        activePill
      )
    );
  } else {
    dispatch(actions.setActiveLine(id));
  }
};

const connectSyncPill = id => (dispatch, getState) => {
  const { activeLine, activePill } = getState().sync;
  if (activePill === id) {
    dispatch(actions.setActivePill(null));
  } else if (activeLine) {
    dispatch(
      connect(
        activeLine,
        id
      )
    );
  } else {
    dispatch(actions.setActivePill(id));
  }
};

let linksBackUp = {};
const connect = (lineId, pillId) => (dispatch, getState) => {
  let lines = [...getState().sync.distributionLines];
  let pills = Object.assign({}, getState().sync.pills);

  // Nullify any line with pillId as a link
  lines = nullifyLine(lines, pillId, lineId);
  // Nullify any pill with lineId as a link
  pills = nullifyPill(pills, lineId);
  // Link each other
  function modifyPart(collection, searchId, id, key, newValue, color) {
    return collection.map(l =>
      l.map(part => {
        if (+part[searchId] === +id) {
          part[key] = newValue;
          part.color = color;
        }
        return part;
      })
    );
  }

  pills[pillId].link = lineId;
  modifyPart(lines, 'id', lineId, 'link', pillId, pills[pillId].color);

  // Add to the linksBackUp for when user needs to edit lyrics
  linksBackUp[lineId] = pillId;

  dispatch(actions.setActiveLine(null));
  dispatch(actions.setActivePill(null));

  dispatch(actions.setPills(pills));
  dispatch(actions.setSyncDistributionLines(lines));

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

  const stats = { ...getState().sync.stats };
  stats.linked = Object.keys(linksBackUp).length;
  dispatch(actions.setSyncStats(stats));

  dispatch(actions.setIsDistributionComplete(isDistributionComplete(lines)));
};

const deleteSyncPill = () => (dispatch, getState) => {
  const { activePill } = getState().sync;

  if (activePill) {
    const pills = Object.assign({}, getState().sync.pills);
    let lines = [...getState().sync.distributionLines];

    // Nullify any line with activePill as a link
    lines = nullifyLine(lines, activePill);

    delete pills[activePill];

    dispatch(actions.setActivePill(null));
    dispatch(actions.setPills(pills));
    dispatch(actions.setSyncDistributionLines(lines));
    dispatch(actions.setLinkSequenceMode(false));

    const stats = { ...getState().sync.stats };
    stats.linked = Object.keys(linksBackUp).length;
    dispatch(actions.setSyncStats(stats));
  }
};

const nullifyLine = (collection, item, partId = null) => {
  collection.forEach(l =>
    l.forEach(part => {
      if (+part.link === +item) {
        part.link = null;
        part.color = null;
      }
      if (+linksBackUp[part.id] === +item) {
        delete linksBackUp[part.id];
      }
    })
  );

  // Also remove from backup if part was provided
  if (partId) {
    delete linksBackUp[partId];
  }

  return collection;
};

const nullifyPill = (collection, item) => {
  Object.keys(collection).forEach(k => {
    const pill = collection[k];
    if (+pill.link === +item) pill.link = null;
  });
  return collection;
};

const finalizeLyrics = () => (dispatch, getState) => {
  const lines = [...getState().sync.distributionLines];
  const pills = Object.assign({}, getState().sync.pills);

  const newLines = lines.map(line =>
    line.map(part => {
      part.startTime = +pills[part.link].timestamp.toFixed(2);
      part.duration = +pills[part.link].duration.toFixed(2);
      part.endTime = part.startTime + part.duration;
      return part;
    })
  );

  // Build string
  let finalId = 1;
  let finalLyrics = '';
  const timepstamps = {};

  newLines.forEach(line => {
    if (line.length > 0) {
      line.forEach(part => {
        // Join parts
        const bracket = `[${finalId}:${part.startTime}:${part.duration}] `;
        finalLyrics += `${bracket} ${part.content}`;
        finalId++;
        // Create karaoke-line object
        const second = Math.round(part.startTime);
        if (timepstamps[second] === undefined) timepstamps[second] = [];
        timepstamps[second].push({
          partId: `part-${part.id}`,
          duration: part.duration,
          endTime: part.endTime,
          size: 0,
          totalSize: part.content.length,
          content: part.content,
        });
      });
    }
    finalLyrics += '\n';
  });
  finalLyrics = finalLyrics.replace('  ', ' ');
  dispatch(actions.setFinalLyrics(finalLyrics));
  dispatch(actions.setTimestamps(timepstamps));
};

const resetPillLinks = () => (dispatch, getState) => {
  const pills = { ...getState().sync.pills };
  const distributionLines = [...getState().sync.distributionLines];

  Object.keys(pills).forEach(k => {
    const pill = pills[k];
    pill.link = null;
  });

  distributionLines.forEach(line => line.forEach(part => (part.link = null)));

  dispatch(actions.setPills(pills));
};

let intervalId = null;

const linkPillsSequence = () => async (dispatch, getState) => {
  let isOn = getState().sync.linkSequenceMode;

  if (isOn) {
    dispatch(actions.setLinkSequenceMode(false));
    clearInterval(intervalId);
    dispatch(actions.setActivePill(null));
  } else {
    dispatch(actions.setLinkSequenceMode(true));
    let { pills } = getState().sync;
    const pillList = Object.keys(pills);

    const findNextPill = () => pillList.find(el => pills[el].link === null);

    let nextActive = findNextPill();

    // While is on mode is turned on, perform every one second
    intervalId = setInterval(() => {
      pills = getState().sync.pills; // eslint-disable-line
      isOn = getState().sync.linkSequenceMode;

      const { activePill } = getState().sync;
      if (activePill === null) {
        nextActive = findNextPill();
        dispatch(actions.setActivePill(nextActive));
      }
      if (nextActive === undefined) {
        clearInterval(intervalId);
        dispatch(actions.setLinkSequenceMode(false));
        dispatch(actions.setActivePill(null));
      }
    }, 250);
  }
};

const saveSync = () => async (dispatch, getState) => {
  const { info, finalLyrics } = getState().sync;
  const body = {
    album: info.album || null,
    distribution: finalLyrics,
    groupSize: info.groupSize,
    originalArtist: info.originalArtist,
    originalArtistId: info.artistId || null,
    private: info.private || false,
    single: info.single || false,
    title: info.title,
    videoId: info.videoId,
  };

  await dispatch({ type: 'SEND_SONG', body });

  dispatch(actions.setStep(6));
};

const handleResetSync = () => dispatch => {
  newPillId = 0;
  linksBackUp = {};
  dispatch(actions.resetSync());
};

export default {
  connectSyncLine,
  connectSyncPill,
  deleteSyncPill,
  handleFormInfo,
  handleLyricsEdit,
  handleResetSync,
  handleSyncBoxMouseDown,
  handleSyncBoxMouseUp,
  handleSyncKeydown,
  handleSyncKeyup,
  handleVideoId,
  linkPillsSequence,
  lockLyrics,
  prepareLines,
  resetPillLinks,
  saveSync,
  unlockNextStep,
  unlockSpecificStep,
};
