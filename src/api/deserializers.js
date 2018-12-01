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
        id: id,
        createdBy: uid,
        genre: data.genre || null,
        name: data.name,
        otherNames: data.otherNames || null,
        private: data.private || false,
        units: data.units || [],
      };
    },
    color: (data, id) => {
      verifyRequirements(data, id, null, ['id', 'name', 'hex', 'r', 'g', 'b']);
      return {
        id: id,
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
        id: id,
        createdBy: uid,
        altColorId:
          data.altColorId || `col${getAlternativeColor(data.colorId)}`,
        birthdate: data.birthdate,
        colorId: data.colorId,
        gender: data.gender,
        initials: data.initials || buildMemberInitials(data.name),
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
        id: id,
        createdBy: uid,
        album: data.album || null,
        distribution: data.distribution,
        groupSize: data.groupSize || 0,
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
        id: id,
        createdBy: uid,
        artistId: data.artistId,
        debutYear: data.debutYear,
        distributions: data.distributions || [],
        distributions_legacy: data.distributions_legacy || [],
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
  put: {},
};
