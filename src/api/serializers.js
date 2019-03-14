/* eslint arrow-body-style: 0 */
import _ from 'lodash';

import {
  buildArtistQuery,
  buildMemberInitials,
  calculateAge,
  getNumberFromColorId,
  buildSongQuery,
} from './utils';
import { GENRES } from './enums';

const UNKNOWN = 'UNKNOWN';

export const serialize = {
  artist: (data, id) => {
    data = _.cloneDeep(data);
    return {
      id: data.id || id,
      type: 'artist',
      attributes: {
        createdBy: data.createdBy || null,
        genre: GENRES[data.genre] || UNKNOWN,
        memberIds: data.memberIds || [],
        memberList: data.memberList || [],
        modifiedBy: data.modifiedBy || null,
        name: data.name,
        otherNames: data.otherNames || '',
        private: data.private || false,
        query: data.query || buildArtistQuery(data),
        units: data.units || [],
      },
    };
  },
  color: (data, id) => {
    data = _.cloneDeep(data);
    return {
      id: data.id || id,
      type: 'color',
      attributes: {
        b: data.b,
        count: data.count || 0,
        g: data.g,
        hex: data.hex,
        name: data.name,
        number: data.id
          ? getNumberFromColorId(data.id)
          : getNumberFromColorId(id),
        r: data.r,
      },
    };
  },
  distribution: (data, id) => {
    data = _.cloneDeep(data);
    return {
      id: data.id || id,
      type: 'distribution',
      attributes: {
        createdBy: data.createdBy || null,
        category: data.category,
        features: data.features || [],
        modifiedBy: data.modifiedBy || null,
        rates: data.rates,
        relationships: JSON.parse(data.relationships),
        songId: data.songId,
        unitId: data.unitId,
      },
    };
  },
  member: (data, id) => {
    data = _.cloneDeep(data);
    return {
      id: data.id || id,
      type: 'member',
      attributes: {
        age: data.birthdate ? calculateAge(data.birthdate) : 0,
        altColorId: data.altColorId || null,
        altColor: data.altColor || null,
        birthdate: data.birthdate || 0,
        colorId: data.colorId,
        color: data.color || null,
        createdBy: data.createdBy || null,
        gender: data.gender || UNKNOWN,
        initials: data.initials || buildMemberInitials(data.name),
        name: data.name,
        modifiedBy: data.modifiedBy || null,
        nationality: data.nationality || UNKNOWN,
        positions: data.positions || [],
        private: data.private || false,
        referenceArtist: data.referenceArtist || UNKNOWN,
      },
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
        distribution: data.distribution,
        groupSize: data.groupSize || 0,
        modifiedBy: data.modifiedBy || null,
        originalArtist: data.originalArtist || '',
        originalArtistId: data.originalArtistId || null,
        private: data.private || false,
        query: data.query || buildSongQuery(data),
        single: data.single || false,
        title: data.title,
        videoId: data.videoId || null,
      },
    };
  },
  unit: (data, id) => {
    data = _.cloneDeep(data);
    return {
      id: data.id || id,
      type: 'unit',
      attributes: {
        artistId: data.artistId,
        averages: data.averages || [],
        createdBy: data.createdBy || null,
        debutYear: data.debutYear,
        distributions: data.distributions || [],
        distributions_legacy: data.distributions_legacy || [],
        members: data.members ? parseUnitMembers(data.members) : [],
        modifiedBy: data.modifiedBy || null,
        name: data.name,
        official: data.official || false,
        private: data.private || false,
      },
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

export const serializeCollection = (object, type) =>
  Object.keys(object).map(key => serialize[type](object[key], key));

// Utils

const parseUnitMembers = membersObj => {
  const dict = {};
  Object.keys(membersObj).forEach(key => {
    const entrySplit = key.split(':');
    const memberId = entrySplit[0];
    const memberName = entrySplit[1];
    const memberPosition = entrySplit[2];

    if (dict[memberId] === undefined) {
      dict[memberId] = {
        positions: {},
      };
    }

    dict[memberId].memberId = memberId;
    dict[memberId].name = memberName;

    dict[memberId].positions[memberPosition] = true;
  });

  return Object.keys(dict).map(entry => {
    const result = {
      memberId: dict[entry].memberId,
      name: dict[entry].name,
      positions: Object.keys(dict[entry].positions),
    };
    return result;
  });
};
