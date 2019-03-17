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
  //       altColorId: 'col000004',
  //       altColor: {
  //         b: 122,
  //         count: 6,
  //         g: 160,
  //         hex: '#FFA07A',
  //         name: 'peach',
  //         number: 4,
  //         r: 255,
  //         id: 'col000004',
  //       },
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
  //       altColorId: 'col000010',
  //       altColor: {
  //         b: 82,
  //         count: 4,
  //         g: 255,
  //         hex: '#FFFF52',
  //         name: 'lemon',
  //         number: 10,
  //         r: 225,
  //         id: 'col000010',
  //       },
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
  //       altColorId: 'col000019',
  //       altColor: {
  //         b: 134,
  //         count: 6,
  //         g: 89,
  //         hex: '#285986',
  //         name: 'navy',
  //         number: 19,
  //         r: 40,
  //         id: 'col000019',
  //       },
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
  //       altColorId: 'col000023',
  //       altColor: {
  //         b: 239,
  //         count: 10,
  //         g: 119,
  //         hex: '#A177EF',
  //         name: 'violet',
  //         number: 23,
  //         r: 161,
  //         id: 'col000023',
  //       },
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
  //       altColorId: 'col000027',
  //       altColor: {
  //         b: 101,
  //         count: 5,
  //         g: 20,
  //         hex: '#9C1465',
  //         name: 'jam',
  //         number: 27,
  //         r: 156,
  //         id: 'col000027',
  //       },
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
  //       altColorId: 'col000024',
  //       altColor: {
  //         b: 255,
  //         count: 2,
  //         g: 208,
  //         hex: '#F7D0FF',
  //         name: 'rose',
  //         number: 24,
  //         r: 247,
  //         id: 'col000024',
  //       },
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
  const newState = Object.assign({}, prevState);

  switch (action.type) {
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
