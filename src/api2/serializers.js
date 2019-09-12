/* eslint arrow-body-style: 0 */
import _ from 'lodash';

import utils from './utils';

import getEnum, { UNKNOWN } from './enums';

const serializers = {
  artist: (data, id, unitsData) => {
    data = _.cloneDeep(data);

    const members = data.members.map(m => utils.parseArtistMemberUrn(m));
    const query = utils.buildArtistQuery(data, members);

    const result = {
      id: data.id || id,
      type: 'artist',
      attributes: {
        agency: data.agency || UNKNOWN,
        createdBy: data.createdBy || null,
        disbanded: Boolean(data.disbanded),
        genre: getEnum(data.genre, 'GENRE'),
        members,
        name: data.name,
        modifiedBy: data.modifiedBy || null,
        otherNames: data.otherNames || '',
        private: Boolean(data.private),
        query,
        unitIds: data.unitIds,
      },
    };

    // Add basic units info if unitsData was received
    if (unitsData) {
      result.attributes.units = unitsData.map(unitData => {
        return {
          id: unitData.id,
          name: unitData.name,
          debutYear: unitData.debutYear,
          official: Boolean(unitData.official),
          subUnit: Boolean(unitData.subUnit),
        };
      });

      // TO-DO: sort units officials > unnoficial, unit > subunits, by year
    }

    return result;
  },

  color: (data, id) => {
    data = _.cloneDeep(data);

    const number = Number(id.substring(3));

    return {
      id: number,
      type: 'color',
      attributes: {
        count: data.count || 0,
        hex: data.hex,
        name: data.name,
        rgb: utils.parseColorRGB(data.rgb),
      },
    };
  },

  distributionSummary: (data, id) => {
    data = _.cloneDeep(data);

    return {
      id: data.id || id,
      createdBy: data.createdBy || null,
      modifiedBy: data.modifiedBy || null,
      category: data.category,
      rates: data.rates,
      features: data.features || {},
      private: Boolean(data.private),
      sondId: data.songId,
      songTitle: data.songInfo.title,
      songArtist: data.songInfo.originalArtist,
    };
  },

  member: (data, id) => {
    data = _.cloneDeep(data);

    return {
      id: data.id || id,
      type: 'member',
      attributes: {
        age: data.birthdate ? utils.calculateAge(data.birthdate) : 0,
        birthdate: data.birthdate || 0,
        color: data.color,
        createdBy: data.createdBy || null,
        gender: getEnum(data.gender, 'GENDER'),
        hide: Boolean(data.hide),
        initials: data.initials || utils.buildMemberInitials(data.name),
        modifiedBy: data.modifiedBy || null,
        name: data.name,
        nationality: getEnum(data.nationality, 'NATIONALITY'),
        positions: data.positions || [],
        private: Boolean(data.private),
        primaryGenre: getEnum(data.primaryGenre, 'GENRE'),
        referenceArtists: data.referenceArtists || [],
        tags: data.tags || [],
      },
    };
  },

  typeahead: (data, type) => {
    let text = data.attributes.name;

    if (type === 'member') {
      text = `${data.attributes.name} (${data.attributes.referenceArtists[0]})`;
    }

    return {
      text,
      value: data.id,
    };
  },

  song: (data, id) => {
    data = _.cloneDeep(data);

    return {
      id: data.id || id,
      type: 'song',
      attributes: {
        album: data.album || UNKNOWN,
        createdBy: data.createdBy || null,
        modifiedBy: data.modifiedBy || null,
        private: Boolean(data.private),
        distribution: data.distribution,
        gender: data.gender || UNKNOWN,
        groupSize: data.groupSize || 0,
        originalArtistId: data.originalArtist.artistId || null,
        originalArtistName: data.originalArtist.name,
        single: Boolean(data.single),
        title: data.title,
        videoId: data.videoId,
        hasMusicVideo: Boolean(!data.hasNoMusicVideo),
        hasRap: Boolean(data.hasRap),
        hasDanceBreak: Boolean(data.hasDance),
      },
    };
  },

  unit: (data, id, additionalData) => {
    data = _.cloneDeep(data);

    const result = {
      id: data.id || id,
      type: 'unit',
      attributes: {
        artistId: data.artistId || null,
        createdBy: data.createdBy || null,
        modifiedBy: data.modifiedBy || null,
        debutYear: data.debutYear,
        name: data.name,
        official: Boolean(!data.unofficial),
        subUnit: Boolean(data.subUnit),
        private: Boolean(data.private),
      },
    };

    // Add artist name
    if (additionalData.artist) {
      result.attributes.artistName = additionalData.artist.name;
    } else {
      result.attributes.artistName = UNKNOWN;
    }

    // Parse and add members, then determine genre
    if (additionalData.members) {
      const serializedMembers = additionalData.members.map(m =>
        serialize(m, m.id, 'member')
      );
      const parsedUnitMembers = utils.parseUnitMembersPositions(data.members);

      result.attributes.members = utils.mergeUnitMembers(
        serializedMembers,
        parsedUnitMembers
      );

      result.attributes.gender = utils.determineUnitGenre(serializedMembers);
    } else {
      result.attributes.members = [];
      result.attributes.gender = UNKNOWN;
    }

    // Add distributions
    if (additionalData.distributions) {
      // do stuff
      const serializedDistributions = additionalData.distributions.map(d =>
        serialize(d, d.id, 'distributionSummary')
      );

      result.attributes.distributions = utils.categorizeDistributions(
        serializedDistributions
      );
    } else {
      result.attributes.distributions = {
        official: [],
        custom: [],
        rework: [],
      };
    }

    // Calculate averages
    result.attributes.members = utils.calculateUnitAverages(
      result.attributes.members,
      result.attributes.distributions
    );

    return result;
  },

  user: (data, id, additionalData) => {
    data = _.cloneDeep(data);
    return {
      id: data.id || id,
      type: 'user',
      attributes: {
        email: data.email,
        favoriteArtists: data.favoriteArtists || {}, // Oject(Reference(Artist):Boolean)
        favoriteMembers: data.favoriteMembers || {}, // Oject(Reference(Member):Boolean)
        biases: data.biases || {}, // Object(Reference(Artist):Reference(Member))
        isAdmin: Boolean(data.isAdmin),
        latestUnits: data.latesUnits || [],
        session: data.session || {},
        displayName: additionalData.displayName || null, // merged from auth
        photoURL: additionalData.photoURL || null, // merged from auth
      },
    };
  },
};

/**
 * Serializes a single entry
 * @category Function
 * @param {object} entity the data entity from the database
 * @param {string} id the id of the entity
 * @param {string} type the serializer type
 * @returns {object} a serialized ]data object
 */
export const serialize = (entity, id, type, additionalData) => {
  return {
    data: serializers[type](entity, id, additionalData),
  };
};

/**
 * Serializes a collection of entries
 * @category Function
 * @param {object} collection the data collection
 * @param {string} type the serializer type
 * @param {boolean} includeTypeahead
 * @param {string} sortBy
 * @returns {object} a serialized collection of data
 */
export const serializeCollection = (
  collection,
  type,
  includeTypeahead = false,
  sortBy = ''
) => {
  const result = {};

  let collectionEntries = Object.entries(collection);

  if (sortBy) {
    collectionEntries = _.sortBy(collectionEntries, [
      a => a[1][sortBy].toLowerCase(),
    ]);
  }

  const serializedCollectionResult = collectionEntries.map(([id, value]) =>
    serializers[type](value, id)
  );

  result.data = serializedCollectionResult;

  if (includeTypeahead) {
    const serializedTypeahead = serializedCollectionResult.map(value =>
      serializers.typeahead(value, type)
    );

    result.meta = {
      typeahead: serializedTypeahead,
    };
  }

  return result;
};
