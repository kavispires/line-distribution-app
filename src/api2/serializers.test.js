import { serialize, serializeCollection } from './serializers';

describe('API/Serializers', () => {
  describe('artist', () => {
    it('it serializes data correctly', () => {
      const data = {
        id: '-a1',
        name: 'Band',
        otherNames: 'bandit',
        members: ['2001:-m1:Adam:1', '2002:-m2:Bob:2'],
        unitIds: ['-u1'],
      };
      expect(serialize.artist(data)).toEqual({
        id: '-a1',
        type: 'artist',
        attributes: {
          agency: 'UNKNOWN',
          createdBy: null,
          genre: 'UNKNOWN',
          members: [
            { id: '-m1', color: '1', name: 'Adam' },
            { id: '-m2', color: '2', name: 'Bob' },
          ],
          modifiedBy: null,
          name: 'Band',
          otherNames: 'bandit',
          private: false,
          query: 'band bandit adam bob',
          unitIds: ['-u1'],
        },
      });
    });
  });

  // describe('color', () => {
  //   it('it serializes data correctly', () => {
  //     const data = {
  //       id: 'col000001',
  //       name: 'white',
  //       hex: '#FFFFFF',
  //       r: 255,
  //       g: 255,
  //       b: 255,
  //     };
  //     expect(serialize.color(data)).toEqual({
  //       id: 'col000001',
  //       type: 'color',
  //       attributes: {
  //         b: 255,
  //         count: 0,
  //         g: 255,
  //         hex: '#FFFFFF',
  //         name: 'white',
  //         number: 1,
  //         r: 255,
  //       },
  //     });
  //   });
  // });

  // describe('distribution', () => {
  //   it('it serializes data correctly', () => {
  //     const data = {
  //       id: '1',
  //       songId: '1',
  //       unitId: 'u',
  //       category: 'OFFICIAL',
  //       rates: { ALL: 0, NONE: 0 },
  //       relationships: '{"1":["1","2"]}',
  //     };
  //     expect(serialize.distribution(data)).toEqual({
  //       id: '1',
  //       type: 'distribution',
  //       attributes: {
  //         songId: '1',
  //         unitId: 'u',
  //         modifiedBy: null,
  //         createdBy: null,
  //         category: 'OFFICIAL',
  //         features: [],
  //         rates: { ALL: 0, NONE: 0 },
  //         relationships: { 1: ['1', '2'] },
  //       },
  //     });
  //   });
  // });

  // describe('member', () => {
  //   it('it serializes data correctly', () => {
  //     const data = {
  //       id: '1',
  //       name: 'Zachary',
  //       colorId: '2',
  //       birthdate: 19931010,
  //     };
  //     expect(serialize.member(data)).toEqual({
  //       id: '1',
  //       type: 'member',
  //       attributes: {
  //         age: 25,
  //         birthdate: 19931010,
  //         color: null,
  //         colorId: '2',
  //         createdBy: null,
  //         gender: 'UNKNOWN',
  //         initials: 'ZH',
  //         modifiedBy: null,
  //         name: 'Zachary',
  //         nationality: 'UNKNOWN',
  //         positions: [],
  //         private: false,
  //         primaryGenre: 'UNKNOWN',
  //         referenceArtist: 'UNKNOWN',
  //       },
  //     });
  //   });
  // });

  // describe('song', () => {
  //   it('it serializes data correctly', () => {
  //     const data = {
  //       id: '1',
  //       distribution: '[1:6.69:0.58]  TWICE!\n',
  //       title: 'Song Title',
  //     };
  //     expect(serialize.song(data)).toEqual({
  //       id: '1',
  //       type: 'song',
  //       attributes: {
  //         album: 'UNKNOWN',
  //         createdBy: null,
  //         distribution: '[1:6.69:0.58]  TWICE!\n',
  //         gender: 'UNKNOWN',
  //         groupSize: 0,
  //         modifiedBy: null,
  //         originalArtist: '',
  //         originalArtistId: null,
  //         private: false,
  //         query: 'song title  ',
  //         single: false,
  //         title: 'Song Title',
  //         videoId: null,
  //       },
  //     });
  //   });
  // });

  // describe('unit', () => {
  //   it('it serializes data correctly', () => {
  //     const data = {
  //       id: '1',
  //       name: 'OT1',
  //       debutYear: 2018,
  //       artistId: '2',
  //     };
  //     expect(serialize.unit(data)).toEqual({
  //       id: '1',
  //       type: 'unit',
  //       attributes: {
  //         artistId: '2',
  //         averages: [],
  //         createdBy: null,
  //         debutYear: 2018,
  //         distributions: [],
  //         name: 'OT1',
  //         members: [],
  //         modifiedBy: null,
  //         official: false,
  //         private: false,
  //         subUnit: false,
  //       },
  //     });
  //   });
  // });

  // describe('user', () => {
  //   it('it serializes data correctly', () => {
  //     const data = {
  //       id: '1',
  //       email: 'bob@bob.com',
  //     };
  //     expect(serialize.user(data)).toEqual({
  //       id: '1',
  //       type: 'user',
  //       attributes: {
  //         email: 'bob@bob.com',
  //         favoriteArtists: {},
  //         favoriteMembers: {},
  //         biases: {},
  //         isAdmin: false,
  //         latestUnits: [],
  //         session: {},
  //         displayName: null,
  //         photoURL: null,
  //       },
  //     });
  //   });
  // });

  describe('collection', () => {
    it('it serializes data correctly', () => {
      const data = {
        '-a1': {
          id: '-a1',
          name: 'Band',
          otherNames: 'bandit',
          members: ['2001:-m1:Adam:1', '2002:-m2:Bob:2'],
          unitIds: ['-u1'],
        },
        '-a2': {
          id: '-a2',
          name: 'Group',
          otherNames: 'groupie',
          members: ['2003:-m3:Carl:3', '2004:-m4:Dan:4'],
          unitIds: ['-u2', '-u3'],
        },
      };
      expect(serializeCollection(data, 'artist')).toEqual([
        {
          id: '-a1',
          type: 'artist',
          attributes: {
            agency: 'UNKNOWN',
            createdBy: null,
            genre: 'UNKNOWN',
            members: [
              { id: '-m1', name: 'Adam', color: '1' },
              { id: '-m2', name: 'Bob', color: '2' },
            ],
            modifiedBy: null,
            name: 'Band',
            otherNames: 'bandit',
            private: false,
            query: 'band bandit adam bob',
            unitIds: ['-u1'],
          },
        },
        {
          id: '-a2',
          type: 'artist',
          attributes: {
            agency: 'UNKNOWN',
            createdBy: null,
            genre: 'UNKNOWN',
            members: [
              { id: '-m3', name: 'Carl', color: '3' },
              { id: '-m4', name: 'Dan', color: '4' },
            ],
            modifiedBy: null,
            name: 'Group',
            otherNames: 'groupie',
            private: false,
            query: 'group groupie carl dan',
            unitIds: ['-u2', '-u3'],
          },
        },
      ]);
    });
  });
});
