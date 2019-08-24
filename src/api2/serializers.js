/* eslint arrow-body-style: 0 */
import _ from 'lodash';

import utils from './utils';

import getEnum, { UNKNOWN } from './enums';

const serializers = {
  artist: (data, id) => {
    data = _.cloneDeep(data);

    const members = data.members.map(m => utils.parseArtistMemberUrn(m));
    const query = utils.buildArtistQuery(data, members);

    return {
      id: data.id || id,
      type: 'artist',
      attributes: {
        agency: data.agency || UNKNOWN,
        createdBy: data.createdBy || null,
        genre: getEnum(data.genre, 'GENRE'),
        members,
        name: data.name,
        modifiedBy: data.modifiedBy || null,
        otherNames: data.otherNames || '',
        private: data.private || false,
        query,
        unitIds: data.unitIds,
      },
    };
  },

  typeahead: (data, id) => {
    return {
      text: data.name,
      value: data.id || id,
    };
  },

  user: (data, id) => {
    data = _.cloneDeep(data);
    return {
      id: data.id || id,
      type: 'user',
      attributes: {
        email: data.email,
        favoriteArtists: data.favoriteArtists || {}, // Oject(Reference(Artist):Boolean)
        favoriteMembers: data.favoriteMembers || {}, // Oject(Reference(Member):Boolean)
        biases: data.biases || {}, // Object(Reference(Artist):Reference(Member))
        isAdmin: data.isAdmin || false,
        latestUnits: data.latesUnits || [],
        session: data.session || {},
        displayName: null, // merged from auth
        photoURL: null, // merged from auth
      },
    };
  },
};

/**
 * Serializer a collection of entries
 * @category Function
 * @param {object} entity the data entity from the database
 * @param {string} id the id of the entity
 * @param {string} type the serializer type
 * @returns {object} a serialized collection of data
 */
export const serialize = (entity, id, type) => {
  return {
    data: serializers[type](entity, id),
  };
};

/**
 * Serializer a collection of entries
 * @category Function
 * @param {object} collection the data collection
 * @param {string} type the serializer type
 * @param {boolean} includeTypeahead
 * @returns {object} a serialized collection of data
 */
export const serializeCollection = (
  collection,
  type,
  includeTypeahead = false
) => {
  const result = {};

  const serializedCollectionResult = Object.values(collection).map(value =>
    serializers[type](value)
  );

  result.data = serializedCollectionResult;

  if (includeTypeahead) {
    const serializedTypeahead = Object.entries(collection).map(([key, value]) =>
      serializers.typeahead(value, key)
    );

    result.meta = {
      typeahead: serializedTypeahead,
    };
  }

  return result;
};
