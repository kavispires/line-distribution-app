/* eslint arrow-body-style: 0 */

import utils from './utils';

export const deserialize = {
  post: {
    artist: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, ['id', 'uid', 'name']);
      return {
        id,
        createdBy: uid,
        genre: data.genre ? utils.ensureGenreEnum(data.genre) : 'OTHER',
        modifiedBy: uid,
        name: data.name,
        otherNames: data.otherNames || null,
        private: data.private || false,
        units: data.units || [],
      };
    },
    color: (data, id) => {
      utils.verifyRequirements(data, id, null, [
        'id',
        'name',
        'hex',
        'r',
        'g',
        'b',
      ]);
      return {
        id,
        b: data.b,
        g: data.g,
        hex: data.hex,
        name: data.name,
        r: data.r,
      };
    },
    distribution: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, [
        'id',
        'uid',
        'category',
        'rates',
        'relationships',
        'songId',
        'unitId',
      ]);
      return {
        id,
        category: data.category,
        createdBy: uid,
        features: data.features || null,
        modifiedBy: uid,
        rates: data.rates,
        relationships:
          typeof data.relationships === 'string'
            ? data.relationships
            : JSON.stringify(data.relationships),
        songId: data.songId,
        unitId: data.unitId,
      };
    },
    log: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, ['id', 'timestamp', 'content']);
      return {
        reportedBy: uid || 'ANONYMOUS',
        timestamp: data.timestamp,
        content: data.content,
      };
    },
    member: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, [
        'id',
        'uid',
        'name',
        'birthdate',
        'colorId',
        'gender',
        'nationality',
        'referenceArtist',
      ]);
      return {
        id,
        createdBy: uid,
        birthdate: data.birthdate,
        colorId: data.colorId,
        gender: data.gender,
        initials: data.initials || utils.buildMemberInitials(data.name),
        modifiedBy: uid,
        name: data.name,
        nationality: data.nationality,
        private: data.private || false,
        referenceArtist: data.referenceArtist,
      };
    },
    song: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, [
        'id',
        'uid',
        'distribution',
        'gender',
        'groupSize',
        'originalArtist',
        'title',
        'videoId',
      ]);
      return {
        id,
        createdBy: uid,
        album: data.album || null,
        distribution: data.distribution,
        gender: data.gender,
        groupSize: data.groupSize,
        modifiedBy: uid,
        originalArtist: data.originalArtist || '',
        originalArtistId: data.originalArtistId || null,
        private: data.private || false,
        single: data.single || false,
        title: data.title,
        videoId: data.videoId,
      };
    },
    unit: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, [
        'id',
        'uid',
        'artistId',
        'debutYear',
        'name',
      ]);
      return {
        id,
        createdBy: uid,
        artistId: data.artistId,
        debutYear: data.debutYear,
        distributions: data.distributions || [],
        modifiedBy: uid,
        name: data.name,
        members: data.members || {},
        official: data.official || false,
        private: data.private || false,
        subUnit: data.subUnit || false,
      };
    },
    user: (data, id) => {
      utils.verifyRequirements(data, id, null, ['id', 'email']);
      return {
        uid: id,
        email: data.email,
        favoriteArtists: data.favoriteArtists || {}, // Oject(Reference(Artist):Boolean)
        favoriteMembers: data.favoriteMembers || {}, // Oject(Reference(Member):Boolean)
        biases: data.biases || {}, // Object(Reference(Artist):Reference(Member))
        isAdmin: data.isAdmin || false,
        latestUnits: data.latesUnits || [],
        session: data.session || {},
        displayName: null, // merged from auth
        photoUrl: null, // merged from auth
      };
    },
  },
  put: {
    artist: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, ['id', 'uid']);
      const res = {};
      if (uid) res.modifiedBy = uid;
      if (data.genre) res.genre = utils.ensureGenreEnum(data.genre);
      if (data.memberList) res.memberList = data.memberList;
      if (data.name) res.name = data.name;
      if (data.otherNames) res.otherNames = data.otherNames;
      if (data.private) res.private = data.private;
      if (data.units) res.units = data.units;

      return res;
    },
    distribution: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, [
        'id',
        'uid',
        'category',
        'rates',
        'relationships',
        'songId',
        'unitId',
      ]);
      const res = {};
      if (uid) res.modifiedBy = uid;
      if (data.category) res.category = data.category;
      if (data.features) res.features = data.features;
      if (data.rates) res.rates = data.rates;
      if (data.relationships) res.relationships = data.relationships;
      if (data.songId) res.songId = data.songId;
      if (data.unitId) res.unitId = data.unitId;

      return res;
    },
    member: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, ['id', 'uid']);
      const res = {};

      if (uid) res.modifiedBy = uid;
      if (data.colorId) {
        res.colorId = data.colorId;
      }

      if (data.birthdate) res.birthdate = data.birthdate;
      if (data.gender) res.gender = data.gender;

      if (data.name) {
        res.name = data.name;
        res.initials = utils.buildMemberInitials(data.name);
      }
      if (data.initials) res.initials = data.initials;

      if (data.nationality) res.nationality = data.nationality;
      if (data.positions) res.positions = data.positions;

      if (data.private) res.private = data.private;
      if (data.referenceArtist) res.referenceArtist = data.referenceArtist;

      return res;
    },
    song: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, ['id', 'uid']);
      const res = {};

      if (uid) res.modifiedBy = uid;
      if (data.album) res.album = data.album;
      if (data.distribution) res.distribution = data.distribution;
      if (data.gender) res.gender = data.gender;
      if (data.groupSize) res.groupSize = data.groupSize;
      if (data.originalArtist) res.originalArtist = data.originalArtist;
      if (data.originalArtistId) res.originalArtistId = data.originalArtistId;
      if (data.single) res.single = data.single;
      if (data.private) res.private = data.private;
      if (data.title) res.title = data.title;
      if (data.videoId) res.videoId = data.videoId;

      return res;
    },
    unit: (data, id, uid) => {
      utils.verifyRequirements(data, id, uid, ['id', 'uid']);
      const res = {};

      if (uid) res.modifiedBy = uid;
      if (data.artistId) res.artistId = data.artistId;
      if (data.distributions) res.distributions = data.distributions;
      if (data.members) res.members = data.members;
      if (data.name) res.name = data.name;
      if (data.official) res.official = data.official;
      if (data.private) res.private = data.private;
      if (data.subUnit) res.subUnit = data.subUnit;

      return res;
    },
    user: (data, id) => {
      utils.verifyRequirements(data, id, null, ['id']);
      const res = {};

      if (data.email) res.email = data.email;
      if (data.favoriteArtists) res.favoriteArtists = data.favoriteArtists;
      if (data.favoriteMembers) res.favoriteMembers = data.favoriteMembers;
      if (data.biases) res.biases = data.biases;
      if (data.isAdmin) res.isAdmin = data.isAdmin;
      if (data.latesUnits) res.latesUnits = data.latesUnits;
      if (data.session) res.session = data.session;

      return res;
    },
  },
};

export default deserialize;
