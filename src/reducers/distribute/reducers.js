import types from './types';

const initialState = {
  activeMemberPill: '',
  activeSong: {},
  activeUnit: {},
  // activeSong: {
  //   id: '-L_4OOhzdx5L1qgyuyoU',
  //   album: 'The Story Begins',
  //   createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //   distribution:
  //     '[1:13.31:3.09] modu nareul gajigo maeil gaman an dujo\n[2:16.51:1.6]  naega neomu yeppeujo\n[3:18.23:1.67]  na ttaemune da himdeuljo\n[4:19.95:3.23]  eodil geotgo isseodo ppalgan badagingeojo\n[5:23.24:1.98]  Red carpet gateun gibun',
  //   groupSize: 9,
  //   modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //   originalArtist: 'TEST',
  //   originalArtistId: '-LZDwKklI8YGlhmy0KJ2',
  //   private: false,
  //   query: 'like ooh-ahh twice the story begins',
  //   single: true,
  //   title: 'Test Title',
  //   videoId: '0rtV5esQT6I',
  // },
  // activeUnit: {
  //   id: '-LZJ7AZJOR0ehcrPecgO',
  //   artistId: '-LZJ7AQQhyOk5w_TAD4u',
  //   averages: [],
  //   createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //   debutYear: 2018,
  //   distributions: [],
  //   distributions_legacy: [],
  //   members: {
  //     '-LZJ7AGyuXFDjXz1ECb2': {
  //       age: 20,
  //       birthdate: 19980826,
  //       colorId: 'col000018',
  //       color: {
  //         b: 221,
  //         count: 8,
  //         g: 186,
  //         hex: '#39BADD',
  //         name: 'turquoise',
  //         number: 18,
  //         r: 57,
  //         id: 'col000018',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'SY',
  //       name: 'Soyeon',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'KOREAN',
  //       positions: [
  //         'CENTER',
  //         'LEADER',
  //         'LEAD_RAPPER',
  //         'MAIN_DANCER',
  //         'VOCALIST',
  //       ],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AGyuXFDjXz1ECb2',
  //     },
  //     '-LZJ7AH22seM59PQ977M': {
  //       age: 22,
  //       birthdate: 19970131,
  //       colorId: 'col000023',
  //       color: {
  //         b: 239,
  //         count: 10,
  //         g: 119,
  //         hex: '#A177EF',
  //         name: 'violet',
  //         number: 23,
  //         r: 161,
  //         id: 'col000023',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'MY',
  //       name: 'Miyeon',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'KOREAN',
  //       positions: ['MAIN_VOCALIST'],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AH22seM59PQ977M',
  //     },
  //     '-LZJ7AH7krbGtR-yZyhT': {
  //       age: 21,
  //       birthdate: 19971023,
  //       colorId: 'col000002',
  //       color: {
  //         b: 27,
  //         count: 6,
  //         g: 49,
  //         hex: '#CE311B',
  //         name: 'blood',
  //         number: 2,
  //         r: 206,
  //         id: 'col000002',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'MN',
  //       name: 'Minnie',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'KOREAN',
  //       positions: ['MAIN_VOCALIST'],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AH7krbGtR-yZyhT',
  //     },
  //     '-LZJ7AHDQIEw5VM1mI3C': {
  //       age: 20,
  //       birthdate: 19980309,
  //       colorId: 'col000006',
  //       color: {
  //         b: 42,
  //         count: 14,
  //         g: 142,
  //         hex: '#FF8E2A',
  //         name: 'orange',
  //         number: 6,
  //         r: 255,
  //         id: 'col000006',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'SJ',
  //       name: 'Soojin',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'KOREAN',
  //       positions: ['LEAD_RAPPER', 'MAIN_DANCER', 'VOCALIST'],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AHDQIEw5VM1mI3C',
  //     },
  //     '-LZJ7AHM3LgaoxdPJphc': {
  //       age: 19,
  //       birthdate: 19990923,
  //       colorId: 'col000014',
  //       color: {
  //         b: 20,
  //         count: 5,
  //         g: 125,
  //         hex: '#147D14',
  //         name: 'forest',
  //         number: 14,
  //         r: 20,
  //         id: 'col000014',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'YQ',
  //       name: 'Yuqi',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'CHINESE',
  //       positions: ['LEAD_DANCER', 'LEAD_RAPPER', 'LEAD_VOCALIST'],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AHM3LgaoxdPJphc',
  //     },
  //     '-LZJ7AHNENioOO_v3cE5': {
  //       age: 19,
  //       birthdate: 20000106,
  //       colorId: 'col000008',
  //       color: {
  //         b: 0,
  //         count: 10,
  //         g: 228,
  //         hex: '#FFE400',
  //         name: 'yellow',
  //         number: 8,
  //         r: 255,
  //         id: 'col000008',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'SH',
  //       name: 'Shuhua',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'TAIWANESE',
  //       positions: ['VISUAL', 'VOCALIST'],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AHNENioOO_v3cE5',
  //     },
  //   },
  //   modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //   name: 'OT6',
  //   official: true,
  //   private: false,
  //   complete: true,
  //   artistName: '(G)I-DLE',
  //   genre: 'K-Pop',
  // },
  category: 'OFFICIAL',
  distributionLines: [],
  rates: {},
  remainder: 100,
};

export default function reducer(prevState = initialState, action) {
  let newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.RESET_DISTRIBUTE:
      newState = Object.assign({}, initialState);
      break;

    case types.RESET_DISTRIBUTE_SONG:
      newState = Object.assign({}, initialState);
      newState.activeUnit = Object.assign({}, prevState.activeUnit);
      break;

    case types.SET_ACTIVE_MEMBER_PILL:
      newState.activeMemberPill = action.payload;
      break;

    case types.SET_ACTIVE_SONG:
      newState.activeSong = action.payload;
      break;

    case types.SET_ACTIVE_UNIT:
      newState.activeUnit = action.payload;
      break;

    case types.SET_DISTRIBUTION_CATEGORY:
      newState.category = action.payload;
      break;

    case types.SET_DISTRIBUTION_LINES:
      newState.distributionLines = action.payload;
      break;

    case types.SET_DISTRIBUTION_REMAINDER:
      newState.remainder = action.payload;
      break;

    case types.SET_RATES:
      newState.rates = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
