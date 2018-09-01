import {
  ARTIST_SCHEMA,
  ARTIST_SCHEMA_DB,
  ARTIST_SCHEMA_DP,
  COLOR_SCHEMA,
  COLOR_SCHEMA_DB,
  LYRIC_SCHEMA,
  MEMBER_SCHEMA,
  MEMBER_SCHEMA_DB,
  MEMBER_SCHEMA_DP,
  POSITION_SCHEMA,
  POSITION_SCHEMA_DB,
  SONG_SCHEMA,
  SONG_SCHEMA_DB,
  SONG_SCHEMA_DP,
  UNIT_SCHEMA,
  UNIT_SCHEMA_DB,
  UNIT_SCHEMA_DP,
  USER_SCHEMA,
} from './schema';

const SCHEMA_DICT = {
  artist: ARTIST_SCHEMA,
  'artist-database': ARTIST_SCHEMA_DB,
  'artist-dependencies': ARTIST_SCHEMA_DP,
  color: COLOR_SCHEMA,
  'color-database': COLOR_SCHEMA_DB,
  lyric: LYRIC_SCHEMA,
  member: MEMBER_SCHEMA,
  'member-database': MEMBER_SCHEMA_DB,
  'member-dependencies': MEMBER_SCHEMA_DP,
  position: POSITION_SCHEMA,
  'position-database': POSITION_SCHEMA_DB,
  song: SONG_SCHEMA,
  'song-database': SONG_SCHEMA_DB,
  'song-dependencies': SONG_SCHEMA_DP,
  unit: UNIT_SCHEMA,
  'unit-database': UNIT_SCHEMA_DB,
  'unit-dependencies': UNIT_SCHEMA_DP,
  'user-database': USER_SCHEMA,
};

const DEFAULT_VALUES = {
  array: [],
  boolean: false,
  id: null,
  list: [],
  number: 0,
  object: {},
  reference: null,
  string: '',
  link: null,
};

const SCHEMA_WITH_PUSH_ID = {
  artist: true,
  'artist-dependencies': true,
  lyric: true,
  'lyric-dependencies': true,
  member: true,
  'member-dependencies': true,
  song: true,
  'song-dependencies': true,
  unit: true,
  'unit-dependencies': true,
};

const serializer = (schemaName, data) => {
  const schema = SCHEMA_DICT[schemaName];
  const missingKeys = [];

  // Required Id when it is not a database data
  if (!schemaName.endsWith('-database') && data.id === undefined) {
    throw new Error('Missing id. Api calls MUST add the entry id to its data');
  }
  // Verify schema existence
  if (typeof schema !== 'object') console.error(schemaName, schema);

  Object.keys(schema).forEach(key => {
    const type = schema[key];

    // Verify if schema is complete
    if (data[key] === undefined) {
      data[key] = DEFAULT_VALUES[type];
      missingKeys.push(key);
    }

    const entry = {
      entry: data[key],
      type,
      schema: schemaName,
      key,
    };

    switch (type) {
      case 'array':
        isArrayType(entry);
        break;
      case 'boolean':
      case 'number':
      case 'string':
        isPrimitiveType(entry);
        break;
      case 'hex':
        isHexType(entry);
        break;
      case 'id':
        isIdType(entry);
        break;
      case 'link':
        isLinkType(entry);
        break;
      case 'list':
        isListType(entry);
        break;
      case 'object':
        isObjectType(entry);
        break;
      case 'email':
        isEmailType(entry);
        break;
      case 'reference:color':
        isReferenceColorType(entry);
        break;
      case 'reference:id':
        isReferenceIdType(entry);
        break;
      default:
        console.warn(`Unknown type: ${type}`);
    }
  });

  // Warn about missing keys
  if (missingKeys.length > 0) {
    console.warn(`Missing keys on ${schemaName}: ${missingKeys.join(', ')}`);
  }
  return data;
};

function isPrimitiveType({ entry, type, schema, key }) {
  if (
    typeof entry !== 'boolean' &&
    typeof entry !== 'number' &&
    typeof entry !== 'string'
  )
    throw new TypeError(
      `${key} type for ${schema} must be a ${type}, instead got: ${typeof entry}`
    );
}

function isHexType({ entry, schema, key }) {
  if (typeof entry !== 'string' && entry[0] !== '#' && entry.length !== 7)
    throw new TypeError(
      `${key} on the ${schema} table must be a 7-digit string beginning with #, instead got: ${entry}`
    );
}

function isObjectType({ entry, schema, key }) {
  if (typeof entry !== 'object')
    throw new TypeError(
      `${key} on the ${schema} table must be an object, instead got: ${typeof entry}`
    );
}

function isArrayType({ entry, schema, key }) {
  if (!Array.isArray(entry))
    throw new TypeError(
      `${key} on the ${schema} table must be an array, instead got: ${typeof entry}`
    );
}

function isListType({ entry, schema, key }) {
  if (!Array.isArray(entry))
    throw new TypeError(
      `${key} on the ${schema} table must be an array, instead got: ${typeof entry}`
    );

  const errorList = [];
  entry.forEach(instance => {
    if (instance.length !== 20 || instance[0] !== '-') errorList.push(instance);
  });

  if (errorList.length > 0)
    throw new TypeError(
      `${key} on the ${schema} table must be an array with 20-digit unique id strings, but got incorrect items: ${errorList.join(
        ', '
      )}`
    );
}

function isIdType({ entry, schema }) {
  if (
    entry !== null &&
    SCHEMA_WITH_PUSH_ID[schema] === undefined &&
    entry.length !== 9
  ) {
    throw new TypeError(
      `Ids for the ${schema} table must have 9 digits, instead got: ${typeof entry}`
    );
  }
  if (
    entry !== null &&
    SCHEMA_WITH_PUSH_ID[schema] &&
    (entry.length !== 20 || entry[0] !== '-')
  )
    throw new TypeError(
      `Ids for the ${schema} table must have 20 digits and start with a dash, instead got: ${typeof entry}`
    );
}

function isReferenceColorType({ entry, schema, key }) {
  if (entry.length !== 9 && !entry.startsWith('col'))
    throw new TypeError(
      `${key} on the ${schema} table must be a color id, instead got: ${typeof entry}`
    );
}

function isReferenceIdType({ entry, schema, key }) {
  if (entry.length !== 20 && !entry.startsWith('-'))
    throw new TypeError(
      `${key} on the ${schema} table must be a push id with 20 digits and starting with a dash, instead got: ${typeof entry}`
    );
}

function isLinkType({ entry, schema, key }) {
  if (entry !== null && !entry.startsWith('http'))
    throw new TypeError(
      `${key} on the ${schema} table must be a http link, instead got: ${typeof entry}`
    );
}

function isEmailType({ entry, schema, key }) {
  if (entry !== null && typeof entry !== 'string' && !entry.includes('@'))
    throw new TypeError(
      `${key} on the ${schema} table must be a email string, instead got: ${typeof entry}`
    );
}

export default serializer;
