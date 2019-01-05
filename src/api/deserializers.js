/* eslint arrow-body-style: 0 */

import {
  buildMemberInitials,
  getAlternativeColor,
  verifyRequirements,
} from './utils';

export const deserialize = {
  post: {
    artist: (data, id, uid) => {
      verifyRequirements(data, id, uid, ['id', 'uid', 'name']);
      return {
        id,
        createdBy: uid,
        genre: data.genre || null,
        modifiedBy: uid,
        name: data.name,
        otherNames: data.otherNames || null,
        private: data.private || false,
        units: data.units || [],
      };
    },
    color: (data, id) => {
      verifyRequirements(data, id, null, ['id', 'name', 'hex', 'r', 'g', 'b']);
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
      verifyRequirements(data, id, uid, ['id', 'uid', 'songId']);
      return {
        songId: data.songId,
        createdBy: uid,
        modifiedBy: uid,
      };
    },
    member: (data, id, uid) => {
      verifyRequirements(data, id, uid, [
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
        altColorId:
          data.altColorId || `col${getAlternativeColor(data.colorId)}`,
        birthdate: data.birthdate,
        colorId: data.colorId,
        gender: data.gender,
        initials: data.initials || buildMemberInitials(data.name),
        modifiedBy: uid,
        name: data.name,
        nationality: data.nationality,
        private: data.private || false,
        referenceArtist: data.referenceArtist,
      };
    },
    song: (data, id, uid) => {
      verifyRequirements(data, id, uid, [
        'id',
        'uid',
        'distribution',
        'originalArtist',
        'title',
      ]);
      return {
        id,
        createdBy: uid,
        album: data.album || null,
        distribution: data.distribution,
        groupSize: data.groupSize || 0,
        modifiedBy: uid,
        originalArtist: data.originalArtist || '',
        originalArtistId: data.originalArtistId || null,
        private: data.private || false,
        single: data.single || false,
        title: data.title,
        videoId: data.videoId || null,
      };
    },
    unit: (data, id, uid) => {
      verifyRequirements(data, id, uid, [
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
        distributions_legacy: data.distributions_legacy || [],
        modifiedBy: uid,
        name: data.name,
        members: data.members || [],
        official: data.official || false,
        private: data.private || false,
      };
    },
    user: (data, id) => {
      verifyRequirements(data, id, null, ['id', 'email']);
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
      verifyRequirements(data, id, uid, ['id', 'uid']);
      const res = {};
      if (uid) res.modifiedBy = uid;
      if (data.genre) res.genre = data.genre;
      if (data.memberList) res.memberList = data.memberList;
      if (data.name) res.name = data.name;
      if (data.otherNames) res.otherNames = data.otherNames;
      if (data.private) res.private = data.private;
      if (data.units) res.units = data.units;

      return res;
    },
    distribution: (data, id, uid) => {
      verifyRequirements(data, id, uid, ['uid']);
      return {
        songId: data.songId,
        createdBy: uid,
      };
    },
    member: (data, id, uid) => {
      verifyRequirements(data, id, uid, ['id', 'uid']);
      const res = {};

      if (uid) res.modifiedBy = uid;
      if (data.colorId) {
        res.colorId = data.colorId;
        res.altColorId = `col${getAlternativeColor(data.colorId)}`;
      }
      if (data.altColorId) res.altColorId = data.altColorId;

      if (data.birthdate) res.birthdate = data.birthdate;
      if (data.gender) res.gender = data.gender;

      if (data.name) {
        res.name = data.name;
        res.initials = buildMemberInitials(data.name);
      }
      if (data.initials) res.initials = data.initials;

      if (data.nationality) res.nationality = data.nationality;
      if (data.positions) res.positions = data.positions;

      if (data.private) res.private = data.private;
      if (data.referenceArtist) res.referenceArtist = data.referenceArtist;

      return res;
    },
    song: (data, id, uid) => {
      verifyRequirements(data, id, uid, ['id', 'uid']);
      const res = {};

      if (uid) res.modifiedBy = uid;
      if (data.album) res.album = data.album;
      if (data.distribution) res.distribution = data.distribution;
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
      verifyRequirements(data, id, uid, ['id', 'uid']);
      const res = {};

      if (uid) res.modifiedBy = uid;
      if (data.artistId) res.artistId = data.artistId;
      if (data.distributions) res.distributions = data.distributions;
      if (data.distributions_legacy)
        res.distributions_legacy = data.distributions_legacy;
      if (data.members) res.members = data.members;
      if (data.name) res.name = data.name;
      if (data.official) res.official = data.official;
      if (data.private) res.private = data.private;
      if (data.artistId) res.artistId = data.artistId;

      return res;
    },
    user: (data, id) => {
      verifyRequirements(data, id, null, ['id']);
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
