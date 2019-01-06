import API from '../api';
import oldfirebasejson from '../api/temp/old-db';
import { parseResponse } from '../utils';

/* ------------------   ACTIONS   ------------------ */

const SET_TEST_1 = 'SET_TEST_1';
const SET_TEST_2 = 'SET_TEST_2';
const SET_TEST_3 = 'SET_TEST_3';
const SET_TEST_4 = 'SET_TEST_4';
const SET_TEST_5 = 'SET_TEST_5';

/* --------------   ACTION CREATORS   -------------- */

export const setTest1 = payload => dispatch =>
  dispatch({ type: SET_TEST_1, payload });
export const setTest2 = payload => dispatch =>
  dispatch({ type: SET_TEST_2, payload });
export const setTest3 = payload => dispatch =>
  dispatch({ type: SET_TEST_3, payload });
export const setTest4 = payload => dispatch =>
  dispatch({ type: SET_TEST_4, payload });
export const setTest5 = payload => dispatch =>
  dispatch({ type: SET_TEST_5, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  test1: '',
  test2: 0,
  test3: true,
  test4: [],
  test5: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_TEST_1:
      newState.test1 = action.payload;
      break;

    case SET_TEST_2:
      newState.test2 = action.payload;
      break;

    case SET_TEST_3:
      newState.test3 = action.payload;
      break;

    case SET_TEST_4:
      newState.test4 = action.payload;
      break;

    case SET_TEST_5:
      newState.test5 = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

// export const testFunction1 = () => async (dispatch, getState) => {
//   console.log('test2!!');

//   // console.log(oldfirebasejson);
//   const { members } = oldfirebasejson;
//   // console.log(members);

//   const ids = Object.keys(members);

//   const results = [];

//   // const response = await API.post('/members', members[ids[0]]);
//   console.log(ids.length);
//   // results.push(results);

//   // for (let i = 0; i < ids.length; i++) {
//   //   const key = ids[i];
//   //   const member = members[key];

//   //   const response = await API.post('/members', member);

//   //   results.push(response);
//   // }

//   dispatch(setTest4(results));
// };

const membersToAdd = {
  '-LDcyPgbytNzK2BkYaJR': {
    birthdate: 19710421,
    colorId: 'col000021',
    gender: 'MALE',
    initials: 'ZC',
    name: 'Zachary',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJS': {
    birthdate: 19800108,
    colorId: 'col000019',
    gender: 'MALE',
    initials: 'RB',
    name: 'Robbie',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJT': {
    birthdate: 19800810,
    colorId: 'col000016',
    gender: 'MALE',
    initials: 'LO',
    name: 'Leo',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJU': {
    birthdate: 19801117,
    colorId: 'col000006',
    gender: 'MALE',
    initials: '3J',
    name: '3J',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJV': {
    birthdate: 19811230,
    colorId: 'col000001',
    gender: 'MALE',
    initials: 'BB',
    name: 'Bobak',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJW': {
    birthdate: 19840622,
    colorId: 'col000026',
    gender: 'MALE',
    initials: 'NC',
    name: 'Nicky',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJX': {
    birthdate: 19840929,
    colorId: 'col000027',
    gender: 'MALE',
    initials: 'SP',
    name: 'Sypher',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJY': {
    birthdate: 19830530,
    colorId: 'col000023',
    gender: 'MALE',
    initials: 'BR',
    name: 'Bryan',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJZ': {
    birthdate: 19851011,
    colorId: 'col000008',
    gender: 'MALE',
    initials: 'JQ',
    name: 'JQ',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJ_': {
    birthdate: 19870204,
    colorId: 'col000012',
    gender: 'MALE',
    initials: 'NA',
    name: 'Nathan',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJa': {
    birthdate: 19780303,
    colorId: 'col000011',
    gender: 'MALE',
    initials: 'FD',
    name: 'Fuduck',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Squirrel Zone',
  },
  '-LDcyPgbytNzK2BkYaJb': {
    birthdate: 19730721,
    colorId: 'col000003',
    gender: 'FEMALE',
    initials: 'BT',
    name: 'Brittany',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Doubt Girls',
  },
  '-LDcyPgbytNzK2BkYaJc': {
    birthdate: 19840102,
    colorId: 'col000015',
    gender: 'FEMALE',
    initials: 'DI',
    name: 'Diana',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Doubt Girls',
  },
  '-LDcyPgbytNzK2BkYaJd': {
    birthdate: 19850628,
    colorId: 'col000028',
    gender: 'FEMALE',
    initials: 'UL',
    name: 'Ulla',
    nationality: 'OTHER',
    referenceArtist: 'Doubt Girls',
  },
  '-LDcyPgbytNzK2BkYaJe': {
    birthdate: 19850831,
    colorId: 'col000017',
    gender: 'FEMALE',
    initials: 'TC',
    name: 'Tracy',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Doubt Girls',
  },
  '-LDcyPgbytNzK2BkYaJf': {
    birthdate: 19871216,
    colorId: 'col000025',
    gender: 'FEMALE',
    initials: 'OL',
    name: 'Olive',
    nationality: 'OTHER',
    private: true,
    referenceArtist: 'Doubt Girls',
  },
};

const unit1 = {
  artistId: '-LVSHZepDbuUbjGYaMvB',
  debutYear: 2001,
  members: {
    '-LVSGoduSk1vtx_w0sfj:Zachary:VOCALIST': true,
    '-LVSGogF1aiKhbmFfiM8:Leo:LEAD_VOCALIST': true,
    '-LVSGogF1aiKhbmFfiM8:Leo:LEAD_DANCER': true,
    '-LVSGogF1aiKhbmFfiM8:Leo:RAPPER': true,
    '-LVSGohKhjelw9qRwDh3:3J:LEADER': true,
    '-LVSGohKhjelw9qRwDh3:3J:MAIN_VOCALIST': true,
    '-LVSGohKhjelw9qRwDh3:3J:CENTER': true,
    '-LVSGoiNYNXro4joqF9N:Bobak:MAIN_RAPPER': true,
    '-LVSGoiNYNXro4joqF9N:Bobak:MAIN_DANCER': true,
    '-LVSGol_Z7o7LAmU8cy-:Bryan:VOCALIST': true,
    '-LVSGol_Z7o7LAmU8cy-:Bryan:VISUAL': true,
    '-LVSGol_Z7o7LAmU8cy-:Bryan:MAKNAE': true,
  },
  name: 'I',
  official: true,
  private: true,
  distributions_legacy: [
    '-LDcyPgbytNzK2BkYaKY',
    '-LJwCfyGoBOZ5lkawffC',
    '-LKFTExcyEXXVAdeojOo',
    '-LKIK2wvoTLrP8yMg0Ce',
    '-LKINgHWvnVss_9DREEr',
    '-LKOyOYOHxNYTh1Gtq6R',
  ],
};

const unit2 = {
  artistId: '-LVSHZepDbuUbjGYaMvB',
  debutYear: 2003,
  members: {
    '-LVSGoduSk1vtx_w0sfj:Zachary:VOCALIST': true,
    '-LVSGookP8PQXnt5HfAa:FuDuck:VOCALIST': true,
    '-LVSGookP8PQXnt5HfAa:FuDuck:RAPPER': true,
    '-LVSGookP8PQXnt5HfAa:FuDuck:DANCER': true,
    '-LVSGookP8PQXnt5HfAa:FuDuck:FACE': true,
    '-LVSGohKhjelw9qRwDh3:3J:LEADER': true,
    '-LVSGohKhjelw9qRwDh3:3J:MAIN_VOCALIST': true,
    '-LVSGohKhjelw9qRwDh3:3J:CENTER': true,
    '-LVSGoiNYNXro4joqF9N:Bobak:MAIN_RAPPER': true,
    '-LVSGoiNYNXro4joqF9N:Bobak:MAIN_DANCER': true,
    '-LVSGol_Z7o7LAmU8cy-:Bryan:VOCALIST': true,
    '-LVSGol_Z7o7LAmU8cy-:Bryan:VISUAL': true,
    '-LVSGol_Z7o7LAmU8cy-:Bryan:MAKNAE': true,
  },
  name: 'I (FD)',
  official: true,
  private: true,
};

const unit3 = {
  artistId: '-LVSHZepDbuUbjGYaMvB',
  debutYear: 2004,
  members: {
    '-LVSGof3HVOjIclQ6_Sh:Robbie:LEADER': true,
    '-LVSGof3HVOjIclQ6_Sh:Robbie:LEAD_VOCALIST': true,
    '-LVSGojRcft8MFIZbpnn:Nicky:MAIN_VOCALIST': true,
    '-LVSGojRcft8MFIZbpnn:Nicky:VISUAL': true,
    '-LVSGokUdbk3J9S7tHcp:Sypher:MAIN_RAPPER': true,
    '-LVSGokUdbk3J9S7tHcp:Sypher:VOCALIST': true,
    '-LVSGomd2fLR7xm8AnuI:JQ:MAIN_DANCER': true,
    '-LVSGomd2fLR7xm8AnuI:JQ:LEAD_RAPPER': true,
    '-LVSGomd2fLR7xm8AnuI:JQ:VOCALIST': true,
    '-LVSGomd2fLR7xm8AnuI:JQ:CENTER': true,
    '-LVSGong9MSqRmxG1_j1:Nathan:VOCALIST': true,
    '-LVSGong9MSqRmxG1_j1:Nathan:MAKNAE': true,
  },
  name: 'II',
  official: true,
  private: true,
  distributions_legacy: [
    '-LDcyPgbytNzK2BkYaKi',
    '-LDoyhsa3aMzLBw8wilB',
    '-LEaWR3C5ZvM2Fn9VSsu',
  ],
};

const unit4 = {
  artistId: '-LVSHZepDbuUbjGYaMvB',
  debutYear: 2004,
  members: {
    '-LVSGoduSk1vtx_w0sfj:Zachary:VOCALIST': true,
    '-LVSGogF1aiKhbmFfiM8:Leo:LEAD_VOCALIST': true,
    '-LVSGogF1aiKhbmFfiM8:Leo:RAPPER': true,
    '-LVSGohKhjelw9qRwDh3:3J:MAIN_VOCALIST': true,
    '-LVSGoiNYNXro4joqF9N:Bobak:MAIN_RAPPER': true,
    '-LVSGol_Z7o7LAmU8cy-:Bryan:VOCALIST': true,
    '-LVSGol_Z7o7LAmU8cy-:Bryan:VISUAL': true,
    '-LVSGof3HVOjIclQ6_Sh:Robbie:LEADER': true,
    '-LVSGof3HVOjIclQ6_Sh:Robbie:LEAD_VOCALIST': true,
    '-LVSGojRcft8MFIZbpnn:Nicky:MAIN_VOCALIST': true,
    '-LVSGojRcft8MFIZbpnn:Nicky:VISUAL': true,
    '-LVSGokUdbk3J9S7tHcp:Sypher:MAIN_RAPPER': true,
    '-LVSGokUdbk3J9S7tHcp:Sypher:VOCALIST': true,
    '-LVSGomd2fLR7xm8AnuI:JQ:MAIN_DANCER': true,
    '-LVSGomd2fLR7xm8AnuI:JQ:LEAD_RAPPER': true,
    '-LVSGomd2fLR7xm8AnuI:JQ:VOCALIST': true,
    '-LVSGomd2fLR7xm8AnuI:JQ:CENTER': true,
    '-LVSGong9MSqRmxG1_j1:Nathan:VOCALIST': true,
    '-LVSGong9MSqRmxG1_j1:Nathan:MAKNAE': true,
  },
  name: 'I&II',
  official: true,
  private: true,
  distributions_legacy: [
    '-LDcyPgbytNzK2BkYaKm',
    '-LDp-ZJiBL-LbegDbDM2',
    '-LFsuZTaM1pi35rpe-bp',
  ],
};

const unit5 = {
  artistId: '-LVSHZd_cfsLNunDwIqN',
  debutYear: 2005,
  members: {
    '-LVSGopplF73ZSiIyAGq:Brittany:LEAD_VOCALIST': true,
    '-LVSGoqtvLMH8eH86DqA:Diana:LEADER': true,
    '-LVSGoqtvLMH8eH86DqA:Diana:MAIN_VOCALIST': true,
    '-LVSGorwFemZhcUoBxki:Ulla:MAIN_RAPPER': true,
    '-LVSGorwFemZhcUoBxki:Ulla:LEAD_VOCALIST': true,
    '-LVSGorwFemZhcUoBxki:Ulla:CENTER': true,
    '-LVSGovfkv5zxHnB_gab:Tracy:MAIN_DANCER': true,
    '-LVSGovfkv5zxHnB_gab:Tracy:LEAD_RAPPER': true,
    '-LVSGovfkv5zxHnB_gab:Tracy:VOCALIST': true,
    '-LVSGowkm8onjaVMQYyi:Olive:VOCALIST': true,
    '-LVSGowkm8onjaVMQYyi:Olive:VISUAL': true,
    '-LVSGowkm8onjaVMQYyi:Olive:MAKNAE': true,
  },
  name: 'OT5',
  official: true,
  private: true,
  distributions_legacy: [
    '-LDcyPgbytNzK2BkYaKW',
    '-LDcyPgbytNzK2BkYaK_',
    '-LDcyPgbytNzK2BkYaKl',
    '-LDcyPgbytNzK2BkYaL0',
    '-LDcyPgbytNzK2BkYaL9',
    '-LDcyPgbytNzK2BkYaJz',
    '-LDcyPgbytNzK2BkYaK1',
    '-LDcyPgbytNzK2BkYaK2',
    '-LEqfRCCi9KECeHbno82',
    '-LEql5XnkFP5KbSaJSzS',
    '-LF02r08NM5PBPd8syiG',
    '-LFotlHByjO3ox47jV-R',
    '-LHkikuegJd7kLC80FYL',
    '-LHyiu1Hk7Eqdzb6DllT',
    '-LIs2vq_V_w2ZbjrR7J8',
    '-LK9Co93gmLkfq13fku5',
  ],
};

const artistToAdd1 = {
  genre: 'Pop',
  name: 'DoubtGirls',
  otherNames: 'doubt girls',
  private: true,
};

const artistToAdd2 = {
  genre: 'Pop',
  name: 'Squirrel Zone',
  private: true,
};

export const testFunction1 = () => async (dispatch, getState) => {
  console.log('test!');

  // // console.log(oldfirebasejson);
  // const members = membersToAdd;
  // // console.log(members);

  // const ids = Object.keys(members);

  // const results = [];

  // for (let i = 0; i < ids.length; i++) {
  //   const key = ids[i];
  //   const member = members[key];

  //   const response = await API.post('/members', member);

  //   results.push(response);
  // }

  // dispatch(setTest4(results));
  const response1 = await API.get('/members');
  dispatch(setTest4(response1));
};

export const testFunction2 = () => async (dispatch, getState) => {
  console.log('testFunction2');

  // const ids = Object.keys(membersToAdd);

  // const results = [];

  // for (let i = 0; i < ids.length; i++) {
  //   const key = ids[i];
  //   const member = membersToAdd[key];

  //   const response = await API.post('/members', member);

  //   results.push(response);
  // }

  // dispatch(setTest5(results));

  // const response1 = await API.post('/artists', artistToAdd1);

  // const res1 = parseResponse(response1);

  // console.log(res1);
  // dispatch(setTest1(res1));

  // const response2 = await API.post('/artists', artistToAdd2);

  // const res2 = parseResponse(response2);

  // console.log(res2);
  // dispatch(setTest2(res2));

  // const response1 = await API.post('/units', unit5);

  // const res1 = parseResponse(response1);

  // console.log(res1);
  // dispatch(setTest5(res1));
};
