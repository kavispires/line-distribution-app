import utils from './utils';

describe('API/Utils', () => {
  describe('Breadcrumble', () => {
    it('it throws an error if no path is provided', () => {
      function catcher() {
        utils.breadcrumble();
      }

      expect(catcher).toThrowError(
        '401: A path is required to make api requests'
      );
    });

    it('it throws an error if no path is not a string', () => {
      function catcher() {
        utils.breadcrumble(123);
      }

      expect(catcher).toThrowError(
        '400: Breadcrumble path argument must be a string'
      );
    });

    it('it returns the expected breadcrumble object', () => {
      const result = utils.breadcrumble('/artists');

      expect(result).toStrictEqual({
        length: 1,
        root: 'artists',
        referenceId: null,
        subPath: null,
        queryParams: null,
      });
    });

    it('it treats the second part of the path as a reference id', () => {
      const result = utils.breadcrumble('/artists/123');

      expect(result).toStrictEqual({
        length: 2,
        root: 'artists',
        referenceId: '123',
        subPath: null,
        queryParams: null,
      });
    });

    it('it treats the third part of the path as a subpath', () => {
      const result = utils.breadcrumble('/artists/123/units');

      expect(result).toStrictEqual({
        length: 3,
        root: 'artists',
        referenceId: '123',
        subPath: 'units',
        queryParams: null,
      });
    });

    it('it accepts query params', () => {
      const result = utils.breadcrumble('/artists/123/units?units=123,456');

      expect(result).toStrictEqual({
        length: 3,
        root: 'artists',
        referenceId: '123',
        subPath: 'units',
        queryParams: { units: ['123', '456'] },
      });
    });

    it('it accepts more than one query param', () => {
      const result = utils.breadcrumble(
        '/artists/123/units?units=123,456,789&user=1'
      );

      expect(result).toStrictEqual({
        length: 3,
        root: 'artists',
        referenceId: '123',
        subPath: 'units',
        queryParams: { units: ['123', '456', '789'], user: '1' },
      });
    });
  });

  describe('buildArtistQuery', () => {
    it('it builds a correct querry', () => {
      const data = {
        name: 'test',
        otherNames: 'testie',
        memberList: ['testing', 'tested'],
      };
      const res = utils.buildArtistQuery(data);

      expect(res).toEqual('test testie testing tested');
    });

    it('its otherNames data value is optional', () => {
      const data = {
        name: 'test',
        memberList: ['testing', 'tested'],
      };
      const res = utils.buildArtistQuery(data);

      expect(res).toEqual('test  testing tested');
    });

    it('its memberList data value is optional', () => {
      const data = {
        name: 'test',
        otherNames: 'testie',
      };
      const res = utils.buildArtistQuery(data);

      expect(res).toEqual('test testie ');
    });
  });

  describe('buildMemberInitials', () => {
    it('it builds member initials correctly', () => {
      expect(utils.buildMemberInitials('test')).toEqual('TS');
      expect(utils.buildMemberInitials('christopher')).toEqual('CT');
      expect(utils.buildMemberInitials('melody')).toEqual('MO');
      expect(utils.buildMemberInitials('hyoyeon')).toEqual('HY');
      expect(utils.buildMemberInitials('bob')).toEqual('BO');
    });
  });

  describe('buildSongQuery', () => {
    it('it builds a correct querry', () => {
      const data = {
        title: 'test',
        originalArtist: 'testie',
        album: 'testing',
      };
      const res = utils.buildSongQuery(data);

      expect(res).toEqual('test testie testing');
    });

    it('its originalArtist data value is optional', () => {
      const data = {
        title: 'test',
        album: 'testing',
      };
      const res = utils.buildSongQuery(data);

      expect(res).toEqual('test  testing');
    });

    it('its album data value is optional', () => {
      const data = {
        title: 'test',
        originalArtist: 'testie',
      };
      const res = utils.buildSongQuery(data);

      expect(res).toEqual('test testie ');
    });
  });

  describe('calculateAge', () => {
    it('it returns the today age of given birthdate', () => {
      expect(utils.calculateAge(19840117)).toEqual(34);
      expect(utils.calculateAge(19941010)).toEqual(24);
      expect(utils.calculateAge(20040229)).toEqual(14);
      expect(utils.calculateAge(20140615)).toEqual(4);
    });
  });

  describe('ensureGenreEnum', () => {
    it('it returns a number from a color id', () => {
      expect(utils.ensureGenreEnum('CPOP')).toEqual('CPOP');
      expect(utils.ensureGenreEnum('JPOP')).toEqual('JPOP');
      expect(utils.ensureGenreEnum('KPOP')).toEqual('KPOP');
      expect(utils.ensureGenreEnum('OTHER')).toEqual('OTHER');
      expect(utils.ensureGenreEnum('POP')).toEqual('POP');
      expect(utils.ensureGenreEnum('c-pop')).toEqual('CPOP');
      expect(utils.ensureGenreEnum('J-pop')).toEqual('JPOP');
      expect(utils.ensureGenreEnum('K-Pop')).toEqual('KPOP');
    });
  });

  describe('getNumberFromColorId', () => {
    it('it returns a number from a color id', () => {
      expect(utils.getNumberFromColorId('col000012')).toEqual(12);
      expect(utils.getNumberFromColorId('col000001')).toEqual(1);
      expect(utils.getNumberFromColorId('col000025')).toEqual(25);
    });
  });

  describe('getAlternativeColor', () => {
    it('it returns a valid alternative color id', () => {
      let result = utils.getNumberFromColorId(
        utils.getAlternativeColor('col000012')
      );
      expect(result).toBeGreaterThanOrEqual(25);
      expect(result).toBeLessThanOrEqual(29);

      result = utils.getNumberFromColorId(
        utils.getAlternativeColor('col000025')
      );
      expect(result).toBeGreaterThanOrEqual(8);
      expect(result).toBeLessThanOrEqual(12);

      result = utils.getNumberFromColorId(
        utils.getAlternativeColor('col000016')
      );
      if (result < 4) {
        expect(result).toBeLessThanOrEqual(3);
        expect(result).toBeGreaterThanOrEqual(1);
      } else {
        expect(result).toBeLessThanOrEqual(30);
        expect(result).toBeGreaterThanOrEqual(29);
      }
    });
  });

  describe('makeSixDigit', () => {
    it('it returns correct number', () => {
      expect(utils.makeSixDigit(1)).toEqual('000001');
      expect(utils.makeSixDigit(123)).toEqual('000123');
      expect(utils.makeSixDigit(444444)).toEqual('444444');
    });

    it('it accepts stringified numbers', () => {
      expect(utils.makeSixDigit('1')).toEqual('000001');
      expect(utils.makeSixDigit('123')).toEqual('000123');
      expect(utils.makeSixDigit('444444')).toEqual('444444');
    });

    it('it returns the placeholder when parameter is not a number', () => {
      expect(utils.makeSixDigit('abc')).toEqual('000000');
      expect(utils.makeSixDigit([])).toEqual('000000');
      expect(utils.makeSixDigit({})).toEqual('000000');
      expect(utils.makeSixDigit(true)).toEqual('000000');
    });
  });

  describe('mergeMembers', () => {
    it('it returns a merged member array', () => {
      const unitMembers = [
        {
          memberId: '1',
          name: 'Bob',
          positions: ['VOCALIST', 'LEADER'],
        },
      ];
      const members = [
        {
          id: '1',
          type: 'member',
          attributes: {
            age: 20,
            altColorId: 'col000004',
            altColor: {
              b: 122,
              count: 6,
              g: 160,
              hex: '#FFA07A',
              name: 'peach',
              number: 4,
              r: 255,
              id: 'col000004',
            },
            birthdate: 19980826,
            colorId: 'col000018',
            color: {
              b: 221,
              count: 8,
              g: 186,
              hex: '#39BADD',
              name: 'turquoise',
              number: 18,
              r: 57,
              id: 'col000018',
            },
            createdBy: '1',
            gender: 'MALE',
            initials: 'SY',
            name: 'Bob',
            modifiedBy: '1',
            nationality: 'UNKNOWN',
            positions: ['CENTER', 'LEADER'],
            private: false,
            referenceArtist: 'Test Band',
            id: '1',
          },
        },
      ];

      const expected = [
        {
          age: 20,
          altColor: {
            b: 122,
            count: 6,
            g: 160,
            hex: '#FFA07A',
            id: 'col000004',
            name: 'peach',
            number: 4,
            r: 255,
          },
          altColorId: 'col000004',
          birthdate: 19980826,
          color: {
            b: 221,
            count: 8,
            g: 186,
            hex: '#39BADD',
            id: 'col000018',
            name: 'turquoise',
            number: 18,
            r: 57,
          },
          colorId: 'col000018',
          createdBy: '1',
          gender: 'MALE',
          id: '1',
          initials: 'SY',
          modifiedBy: '1',
          name: 'Bob',
          nationality: 'UNKNOWN',
          positions: ['VOCALIST', 'LEADER'],
          private: false,
          referenceArtist: 'Test Band',
        },
      ];

      expect(utils.mergeMembers(unitMembers, members)).toEqual(expected);
    });
  });

  describe('parseUnitMembers', () => {
    it('it returns the parsed array', () => {
      const data = {
        '1:Adam:DANCER': true,
        '2:Bob:VOCALIST': true,
        '2:Bob:LEADER': true,
        '3:Carl:VOCALIST': true,
        '3:Carl:RAPPER': true,
        '3:Carl:DANCER': true,
      };

      const expected = [
        { memberId: '1', name: 'Adam', positions: ['DANCER'] },
        { memberId: '2', name: 'Bob', positions: ['VOCALIST', 'LEADER'] },
        {
          memberId: '3',
          name: 'Carl',
          positions: ['VOCALIST', 'RAPPER', 'DANCER'],
        },
      ];
      expect(utils.parseUnitMembers(data)).toEqual(expected);
    });
  });

  describe('verifyRequirements', () => {
    it('it throws an error if id is required but missing', () => {
      function catcher() {
        utils.verifyRequirements({}, undefined, '1', ['id']);
      }

      expect(catcher).toThrowError(
        '400: Can NOT perform post request for null, missing the following data: id'
      );
    });

    it('it throws an error if uid is required but missing', () => {
      function catcher() {
        utils.verifyRequirements({}, undefined, undefined, ['uid']);
      }

      expect(catcher).toThrowError(
        '400: Can NOT perform post request for null, missing the following data: user uid'
      );
    });

    it('it throws an error if any field is required but missing', () => {
      function catcher() {
        utils.verifyRequirements({ name: 'Bob', age: 20 }, '1', '1', [
          'id',
          'uid',
          'age',
          'gender',
        ]);
      }

      expect(catcher).toThrowError(
        '400: Can NOT perform post request for 1, missing the following data: gender'
      );
    });

    it('it returns true when all requirements are met', () => {
      const result = utils.verifyRequirements(
        { name: 'Bob', age: 20 },
        '1',
        '1',
        ['id', 'uid', 'age', 'name']
      );

      expect(result).toEqual(true);
    });
  });
});
