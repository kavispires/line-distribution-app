import { deserialize } from './deserializers';

const ID = 'abc';
const UID = 'def';
const ARTIST_ID = 'ghi';
const SONG_ID = 'jkl';
const UNIT_ID = 'mno';

describe('API/deserializers', () => {
  describe('POST', () => {
    describe('artist', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: ID,
          uid: UID,
          name: 'Band',
          genre: 'POP',
        };
        expect(deserialize.post.artist(data, ID, UID)).toEqual({
          id: ID,
          createdBy: UID,
          genre: 'POP',
          modifiedBy: UID,
          name: 'Band',
          otherNames: null,
          private: false,
          units: [],
        });
      });

      it('it deserializes data correctly with no genre', () => {
        const data = {
          id: ID,
          uid: UID,
          name: 'Band',
        };
        expect(deserialize.post.artist(data, ID, UID)).toEqual({
          id: ID,
          createdBy: UID,
          genre: 'OTHER',
          modifiedBy: UID,
          name: 'Band',
          otherNames: null,
          private: false,
          units: [],
        });
      });
    });

    describe('color', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: ID,
          name: 'white',
          hex: '#fff',
          r: 255,
          g: 255,
          b: 255,
        };
        expect(deserialize.post.color(data, ID)).toEqual({
          id: ID,
          b: 255,
          g: 255,
          hex: '#fff',
          name: 'white',
          r: 255,
        });
      });
    });

    describe('distribution', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: ID,
          uid: UID,
          category: 'OFFICIAL',
          rates: {},
          relationships: 'test',
          songId: SONG_ID,
          unitId: UNIT_ID,
        };
        expect(deserialize.post.distribution(data, ID, UID)).toEqual({
          id: ID,
          category: 'OFFICIAL',
          createdBy: UID,
          features: null,
          modifiedBy: UID,
          rates: {},
          relationships: 'test',
          songId: SONG_ID,
          unitId: UNIT_ID,
        });
      });

      it('it deserializes data correctly when relationships is an object', () => {
        const data = {
          id: ID,
          uid: UID,
          category: 'OFFICIAL',
          rates: {},
          relationships: { 1: 'test' },
          songId: SONG_ID,
          unitId: UNIT_ID,
        };
        expect(deserialize.post.distribution(data, ID, UID)).toEqual({
          id: ID,
          category: 'OFFICIAL',
          createdBy: UID,
          features: null,
          modifiedBy: UID,
          rates: {},
          relationships: '{"1":"test"}',
          songId: SONG_ID,
          unitId: UNIT_ID,
        });
      });
    });

    describe('log', () => {
      it('it deserializes data correctly with uid', () => {
        const data = {
          id: ID,
          uid: UID,
          timestamp: 123,
          content: 'comment',
        };
        expect(deserialize.post.log(data, ID, UID)).toEqual({
          content: 'comment',
          reportedBy: UID,
          timestamp: 123,
        });
      });

      it('it deserializes data correctly without uid', () => {
        const data = {
          id: ID,
          timestamp: 123,
          content: 'comment',
        };
        expect(deserialize.post.log(data, ID, null)).toEqual({
          content: 'comment',
          reportedBy: 'ANONYMOUS',
          timestamp: 123,
        });
      });
    });

    describe('member', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: ID,
          uid: UID,
          name: 'Bob',
          birthdate: 20000101,
          colorId: 'col000001',
          gender: 'MALE',
          nationality: 'OTHER',
          referenceArtist: ARTIST_ID,
        };
        expect(deserialize.post.member(data, ID, UID)).toEqual({
          birthdate: 20000101,
          colorId: 'col000001',
          createdBy: UID,
          gender: 'MALE',
          id: ID,
          initials: 'BO',
          modifiedBy: UID,
          name: 'Bob',
          nationality: 'OTHER',
          private: false,
          referenceArtist: ARTIST_ID,
        });
      });
    });

    describe('song', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: ID,
          uid: UID,
          distribution: 'lyrics',
          groupSize: 5,
          originalArtist: 'Band',
          title: 'Title',
          videoId: '001',
        };
        expect(deserialize.post.song(data, ID, UID)).toEqual({
          album: null,
          createdBy: UID,
          distribution: 'lyrics',
          groupSize: 5,
          id: ID,
          modifiedBy: UID,
          originalArtist: 'Band',
          originalArtistId: null,
          private: false,
          single: false,
          title: 'Title',
          videoId: '001',
        });
      });

      describe('unit', () => {
        it('it deserializes data correctly', () => {
          const data = {
            id: ID,
            uid: UID,
            artistId: ARTIST_ID,
            debutYear: 2019,
            name: 'OT1',
          };
          expect(deserialize.post.unit(data, ID, UID)).toEqual({
            artistId: ARTIST_ID,
            createdBy: UID,
            debutYear: 2019,
            distributions: [],
            distributions_legacy: [],
            id: ID,
            members: {},
            modifiedBy: UID,
            name: 'OT1',
            official: false,
            private: false,
            subUnit: false,
          });
        });
      });

      describe('user', () => {
        it('it deserializes data correctly', () => {
          const data = {
            id: UID,
            email: 'bob@ld.com',
          };
          expect(deserialize.post.user(data, ID, UID)).toEqual({
            biases: {},
            displayName: null,
            email: 'bob@ld.com',
            favoriteArtists: {},
            favoriteMembers: {},
            isAdmin: false,
            latestUnits: [],
            photoUrl: null,
            session: {},
            uid: ID,
          });
        });
      });
    });
  });

  describe('PUT', () => {
    describe('artist', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: ID,
          uid: UID,
          name: 'Band',
        };
        expect(deserialize.put.artist(data, ID, UID)).toEqual({
          modifiedBy: UID,
          name: 'Band',
        });
      });
    });

    describe('distribution', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: ID,
          uid: UID,
          category: 'OFFICIAL',
          rates: {},
          relationships: 'test',
          songId: SONG_ID,
          unitId: UNIT_ID,
        };
        expect(deserialize.put.distribution(data, ID, UID)).toEqual({
          category: 'OFFICIAL',
          modifiedBy: UID,
          rates: {},
          relationships: 'test',
          songId: SONG_ID,
          unitId: UNIT_ID,
        });
      });
    });

    describe('member', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: ID,
          uid: UID,
          name: 'Bob',
          birthdate: 20000101,
          colorId: 'col000001',
          gender: 'MALE',
          nationality: 'OTHER',
          referenceArtist: ARTIST_ID,
        };
        expect(deserialize.put.member(data, ID, UID)).toEqual({
          birthdate: 20000101,
          colorId: 'col000001',
          gender: 'MALE',
          initials: 'BO',
          modifiedBy: UID,
          name: 'Bob',
          nationality: 'OTHER',
          referenceArtist: ARTIST_ID,
        });
      });
    });

    describe('song', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: ID,
          uid: UID,
          distribution: 'lyrics',
          groupSize: 5,
          originalArtist: 'Band',
          title: 'Title',
          videoId: '001',
        };
        expect(deserialize.put.song(data, ID, UID)).toEqual({
          distribution: 'lyrics',
          groupSize: 5,
          modifiedBy: UID,
          originalArtist: 'Band',
          title: 'Title',
          videoId: '001',
        });
      });
    });

    describe('unit', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: ID,
          uid: UID,
          artistId: ARTIST_ID,
          debutYear: 2019,
          name: 'OT1',
        };
        expect(deserialize.put.unit(data, ID, UID)).toEqual({
          artistId: ARTIST_ID,
          modifiedBy: UID,
          name: 'OT1',
        });
      });
    });

    describe('user', () => {
      it('it deserializes data correctly', () => {
        const data = {
          id: UID,
          email: 'bob@ld.com',
        };
        expect(deserialize.put.user(data, ID, UID)).toEqual({
          email: 'bob@ld.com',
        });
      });
    });
  });
});
