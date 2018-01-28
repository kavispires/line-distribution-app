/* SCHEMA
 * id: Id (required)
 * bandId: Band(id) (required)
 * name: String (required) // version, subunit name
 * debutYeat: Integer
 * official: Boolean (required)
 * members: Array[Member(id)] (required)
 * songs: Array[Song(id)]
 */

const UNITS = {
  1: {
    id: 1,
    bandId: 1,
    name: 'OT9',
    debutYeat: 2007,
    official: true,
    members: [1, 2, 3, 7, 4, 5, 8, 6, 9],
    songs: [],
  },
  2: {
    id: 2,
    bandId: 1,
    name: 'OT8',
    debutYeat: 2014,
    official: true,
    members: [1, 3, 7, 4, 5, 8, 6, 9],
    songs: [],
  },
  3: {
    id: 3,
    bandId: 1,
    name: 'TTS TaeTiSeo',
    debutYeat: 2012,
    official: true,
    members: [1, 7, 9],
    songs: [],
  },
  0: {
    id: 0,
    bandId: 0,
    name: '',
    debutYeat: 0,
    official: true,
    members: [],
    songs: [],
  },
  // "2": {
  //   "id": 2,
  //   "name": "Girls' Generation",
  //   "official": true,
  //   "version": "OT8",
  //   "genre": "K-Pop",
  //   "members": [1, 3, 7, 4, 5, 8, 6, 9],
  //   "songs": []
  // },
  // "3": {
  //   "id": 3,
  //   "name": "2NE1",
  //   "official": true,
  //   "version": "OT4",
  //   "genre": "K-Pop",
  //   "members": [11, 12, 10, 13],
  //   "songs": []
  // },
  // "4": {
  //   "id": 4,
  //   "name": "2NE1",
  //   "official": true,
  //   "version": "OT3",
  //   "genre": "K-Pop",
  //   "members": [11, 12, 10],
  //   "songs": []
  // },
  // "5": {
  //   "id": 5,
  //   "name": "Wonder Girls",
  //   "official": true,
  //   "version": "OT5",
  //   "genre": "K-Pop",
  //   "members": [14, 15, 19, 16, 18],
  //   "songs": []
  // },
  // "6": {
  //   "id": 6,
  //   "name": "Wonder Girls",
  //   "official": true,
  //   "version": "OT5 (2010)",
  //   "genre": "K-Pop",
  //   "members": [14, 15, 19, 18, 17],
  //   "songs": []
  // },
  // "7": {
  //   "id": 7,
  //   "name": "Wonder Girls",
  //   "official": true,
  //   "version": "OT4",
  //   "genre": "K-Pop",
  //   "members": [14, 15, 16, 17],
  //   "songs": []
  // },
  // "8": {
  //   "id": 8,
  //   "name": "Brown Eyed Girls",
  //   "official": true,
  //   "version": null,
  //   "genre": "K-Pop",
  //   "members": [21, 20, 22, 23],
  //   "songs": []
  // }
};

export default UNITS;
