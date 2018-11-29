import { buildArtistQuery, buildMemberInitials } from './utils';

const UNKNOWN = 'UNKNOWN';

export const serialize = {
  artist: (data, id) => {
    return {
      id: data.id || id,
      type: 'artist',
      attributes: {
        createdBy: data.createdBy || null,
        genre: data.genre || UNKNOWN,
        memberList: data.memberList || [],
        name: data.name,
        otherNames: data.otherNames || '',
        private: data.private || false,
        query: data.query || buildArtistQuery(data),
        units: data.units || [],
      },
    };
  },
  color: (data, id) => {
    return {
      id: data.id || id,
      type: 'color',
      attributes: {
        b: data.b,
        count: data.count || 0,
        g: data.g,
        hex: data.hex,
        name: data.name,
        r: data.r,
      },
    };
  },
  distribution: (data, id) => {
    return {
      id: data.id || id,
      type: 'distribution',
      attributes: {
        songId: data.songId,
        // TO-DO: Complete distribution serializer
      },
    };
  },
  member: (data, id) => {
    return {
      id: data.id || id,
      type: 'member',
      attributes: {
        altColorId: data.colorId || null,
        birthdate: data.birthdate || 0,
        colorId: data.colorId || null,
        createdBy: data.createdBy || null,
        gender: data.gender || UNKNOWN,
        initials: data.initials || buildMemberInitials(data.name),
        name: data.name,
        nationality: data.nationality || UNKNOWN,
        positions: data.positions || [],
        private: data.private || false,
        referenceArtist: data.referenceArtist || UNKNOWN,
      },
    };
  },
  song: (data, id) => {
    return {
      id: data.id || id,
      type: 'song',
      attributes: {
        album: data.album || UNKNOWN,
        createdBy: data.createdBy || null,
        distribution: data.distribution,
        groupSize: data.groupSize || 0,
        originalArtist: data.originalArtist || '',
        originalArtistId: data.originalArtistId || null,
        private: data.private || false,
        single: data.single || false,
        title: data.title,
        videoId: data.videoId || null,
      },
    };
  },
  unit: (data, id) => {
    return {
      id: data.id || id,
      type: 'unit',
      attributes: {
        artistId: data.artistId,
        createdBy: data.createdBy || null,
        debutYear: data.debutYear,
        distributions: data.distributions || [],
        distributions_legacy: data.distributions_legacy || [],
        name: data.name,
        official: data.official || false,
        private: data.private || false,
      },
    };
  },
  user: (data, id) => {
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
        photoUrl: null, // merged from auth
      },
    };
  },
};

export const serializeCollection = (object, type) =>
  Object.keys(object).map(key => serialize[type](object[key], object[key].id));
