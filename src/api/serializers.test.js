import { serialize, serializeCollection } from './serializers';

describe('API/Serializers', () => {
  describe('artist', () => {
    it('it serializes data correctly', () => {
      const data = {
        id: '1',
        name: 'Band',
        otherNames: 'bandit',
      };
      expect(serialize.artist(data)).toEqual({
        id: '1',
        type: 'artist',
        attributes: {
          createdBy: null,
          genre: 'UNKNOWN',
          memberList: [],
          memberIds: [],
          modifiedBy: null,
          name: 'Band',
          otherNames: 'bandit',
          private: false,
          query: 'Band bandit ',
          units: [],
        },
      });
    });
  });

  describe('color', () => {
    it('it serializes data correctly', () => {
      const data = {
        id: '1',
        name: 'white',
        hex: '#FFFFFF',
        r: 255,
        g: 255,
        b: 255,
      };
      expect(serialize.color(data)).toEqual({
        id: '1',
        type: 'color',
        attributes: {
          b: 255,
          count: 0,
          g: 255,
          hex: '#FFFFFF',
          name: 'white',
          r: 255,
        },
      });
    });
  });

  describe('distribution', () => {
    it('it serializes data correctly', () => {
      const data = {
        id: '1',
        songId: '1',
      };
      expect(serialize.distribution(data)).toEqual({
        id: '1',
        type: 'distribution',
        attributes: {
          songId: '1',
          modifiedBy: null,
          createdBy: null,
        },
      });
    });
  });

  describe('member', () => {
    it('it serializes data correctly', () => {
      const data = {
        id: '1',
        name: 'Zachary',
        colorId: '2',
      };
      expect(serialize.member(data)).toEqual({
        id: '1',
        type: 'member',
        attributes: {
          altColorId: null,
          birthdate: 0,
          colorId: '2',
          createdBy: null,
          gender: 'UNKNOWN',
          initials: 'ZH',
          modifiedBy: null,
          name: 'Zachary',
          nationality: 'UNKNOWN',
          positions: [],
          private: false,
          referenceArtist: 'UNKNOWN',
        },
      });
    });
  });

  describe('song', () => {
    it('it serializes data correctly', () => {
      const data = {
        id: '1',
        distribution: '[1:6.69:0.58]  TWICE!\n',
        title: 'Song Title',
      };
      expect(serialize.song(data)).toEqual({
        id: '1',
        type: 'song',
        attributes: {
          album: 'UNKNOWN',
          createdBy: null,
          distribution: '[1:6.69:0.58]  TWICE!\n',
          groupSize: 0,
          modifiedBy: null,
          originalArtist: '',
          originalArtistId: null,
          private: false,
          single: false,
          title: 'Song Title',
          videoId: null,
        },
      });
    });
  });

  describe('unit', () => {
    it('it serializes data correctly', () => {
      const data = {
        id: '1',
        name: 'OT1',
        debutYear: 2018,
        artistId: '2',
      };
      expect(serialize.unit(data)).toEqual({
        id: '1',
        type: 'unit',
        attributes: {
          artistId: '2',
          createdBy: null,
          debutYear: 2018,
          distributions: [],
          distributions_legacy: [],
          name: 'OT1',
          members: [],
          modifiedBy: null,
          official: false,
          private: false,
        },
      });
    });
  });

  describe('user', () => {
    it('it serializes data correctly', () => {
      const data = {
        id: '1',
        email: 'bob@bob.com',
      };
      expect(serialize.user(data)).toEqual({
        id: '1',
        type: 'user',
        attributes: {
          email: 'bob@bob.com',
          favoriteArtists: {},
          favoriteMembers: {},
          biases: {},
          isAdmin: false,
          latestUnits: [],
          session: {},
          displayName: null,
          photoUrl: null,
        },
      });
    });
  });

  describe('collection', () => {
    it('it serializes data correctly', () => {
      const data = {
        1: {
          name: 'Band',
          otherNames: 'bandit',
        },
        2: {
          name: 'Group',
          otherNames: 'groupie',
        },
      };
      expect(serializeCollection(data, 'artist')).toEqual([
        {
          id: '1',
          type: 'artist',
          attributes: {
            createdBy: null,
            genre: 'UNKNOWN',
            memberList: [],
            memberIds: [],
            modifiedBy: null,
            name: 'Band',
            otherNames: 'bandit',
            private: false,
            query: 'Band bandit ',
            units: [],
          },
        },
        {
          id: '2',
          type: 'artist',
          attributes: {
            createdBy: null,
            genre: 'UNKNOWN',
            memberList: [],
            memberIds: [],
            modifiedBy: null,
            name: 'Group',
            otherNames: 'groupie',
            private: false,
            query: 'Group groupie ',
            units: [],
          },
        },
      ]);
    });
  });
});
