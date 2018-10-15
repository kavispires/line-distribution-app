export const ROOT_PATHS = {
  ARTISTS: 'ARTISTS',
  COLORS: 'COLORS',
  LYRICS: 'LYRICS',
  MEMBERS: 'MEMBERS',
  POSITIONS: 'POSITIONS',
  SONGS: 'SONGS',
  UNITS: 'UNITS',
  USERS: 'USERS',
};

/* SCHEMA LEGEND
 * reference = an id from an entry in the database
 * list = a list of references
 */

export const ARTIST_SCHEMA_DB = {
  genre: 'string',
  name: 'string',
  otherNames: 'string',
  units: 'list',
};

export const ARTIST_SCHEMA = {
  genre: 'string',
  id: 'id',
  name: 'string',
  otherNames: 'string',
  units: 'list',
  memberList: 'array',
};

export const ARTIST_SCHEMA_DP = {
  genre: 'string',
  id: 'id',
  name: 'string',
  otherNames: 'string',
  units: 'list',
  memberList: 'array',
  private: 'boolean',
};

export const COLOR_SCHEMA_DB = {
  hex: 'hex',
  name: 'string',
  r: 'number',
  g: 'number',
  b: 'number',
};

export const COLOR_SCHEMA = {
  class: 'string',
  hex: 'hex',
  id: 'id',
  name: 'string',
  r: 'number',
  g: 'number',
  b: 'number',
};

export const LYRIC_SCHEMA = {
  id: 'id',
  title: 'string',
  // TO-DO: complete this
};

export const MEMBER_SCHEMA = {
  altColor: 'object',
  birthdate: 'number',
  color: 'object',
  id: 'id',
  nacionality: 'string',
  name: 'string',
  positions: 'array',
};

export const MEMBER_SCHEMA_DB = {
  altColorId: 'reference:color',
  birthdate: 'number',
  colorId: 'reference:color',
  nacionality: 'string',
  name: 'string',
  positions: 'array',
  referenceArtist: 'string',
};

export const MEMBER_SCHEMA_DP = {
  altColor: 'object',
  birthdate: 'number',
  color: 'object',
  id: 'id',
  name: 'string',
  positions: 'array',
};

export const POSITION_SCHEMA_DB = {
  name: 'string',
};

export const POSITION_SCHEMA = {
  id: 'id',
  name: 'string',
};

export const SONG_SCHEMA = {
  distribution: 'object',
  id: 'id',
  lyrics: 'string',
  originalArtist: 'string',
  query: 'string',
  title: 'string',
  type: 'string',
  unitId: 'reference:id',
  userId: 'string',
  video: 'link',
  groupSize: 'number',
};

export const SONG_SCHEMA_DB = {
  distribution: 'string',
  lyrics: 'string',
  originalArtist: 'string',
  query: 'string',
  title: 'string',
  type: 'string',
  unitId: 'reference:id',
  userId: 'string',
  video: 'link',
  groupSize: 'number',
};

export const SONG_SCHEMA_DP = {
  distribution: 'object',
  id: 'id',
  lyrics: 'string',
  originalArtist: 'string',
  query: 'string',
  title: 'string',
  type: 'string',
  unitId: 'reference:id',
  userId: 'string',
};

export const UNIT_SCHEMA = {
  artist: 'object',
  debutYear: 'number',
  members: 'array',
  name: 'string',
  official: 'boolean',
  songs: 'list',
};

export const UNIT_SCHEMA_DB = {
  artistId: 'reference:id',
  debutYear: 'number',
  members: 'array',
  name: 'string',
  official: 'boolean',
  songs: 'list',
};

export const UNIT_SCHEMA_DP = {
  artist: 'object',
  debutYear: 'number',
  id: 'id',
  members: 'array',
  name: 'string',
  official: 'boolean',
  songs: 'object',
};

export const USER_SCHEMA = {
  email: 'email',
  favoriteArtists: 'object',
  isAdmin: 'boolean',
  latestUnits: 'list',
  session: 'object',
};

export const TEST_SCHEMA = {
  array: 'array',
  boolean: 'boolean',
  string: 'string',
  number: 'number',
  hex: 'hex',
  id: 'id',
  link: 'link',
  list: 'list',
  object: 'object',
  email: 'email',
  referenceColor: 'reference:color',
  referenceId: 'reference:id',
};
