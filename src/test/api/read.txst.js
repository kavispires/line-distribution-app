import read from '../../api/read';

describe('Read API', () => {
  describe('Errors', () => {
    it('throws an error when call is trying to access database root', () => {
      function response() {
        read('');
      }
      expect(response).toThrowError(
        'Unable to retrive data from database root. Make sure your path starts with /.'
      );
    });

    it('throws an error when root path does not exist', () => {
      function response() {
        read('/bola');
      }
      expect(response).toThrowError(
        'Unable to retrive data. Path bola does not exist.'
      );
    });
  });

  describe('Artists', () => {
    it('fetches a artist', () => {
      const response = read('/artists/-a000000000000000101');

      expect(typeof response).toEqual('object');

      expect(response.genre).toEqual('Pop');
      expect(response.id).toEqual('-a000000000000000101');
      expect(response.name).toEqual('Foo');
      expect(response.otherNames).toEqual('foo foor');

      expect(response.memberList.length).toEqual(3);
      expect(response.query).toEqual('FOO FOO FOOR ADAM BOB CARL');
    });

    it('fetches all artists', () => {
      const response = read('/artists');

      expect(typeof response).toEqual('object');

      const artist = response['-a000000000000000101'];
      expect(artist.genre).toEqual('Pop');
      expect(artist.id).toEqual('-a000000000000000101');
      expect(artist.name).toEqual('Foo');
      expect(artist.otherNames).toEqual('foo foor');

      expect(Array.isArray(artist.units)).toBeTruthy();
      expect(artist.units.length).toEqual(2);
      expect(artist.units[0]).toEqual('-u000000000000000101');

      expect(artist.memberList.length).toEqual(3);
      expect(artist.query).toEqual('FOO FOO FOOR ADAM BOB CARL');
    });

    it('fetches all artists units', () => {
      const response = read('/artists/-a000000000000000101/units');

      expect(typeof response).toEqual('object');

      let unit = response['-u000000000000000101'];
      expect(unit.id).toEqual('-u000000000000000101');
      expect(unit.debutYear).toEqual(2018);
      expect(unit.name).toEqual('OT2');
      expect(unit.members.length).toEqual(2);

      unit = response['-u000000000000000102'];
      expect(unit.id).toEqual('-u000000000000000102');
      expect(unit.debutYear).toEqual(2018);
      expect(unit.name).toEqual('OT3');
      expect(unit.members.length).toEqual(3);
    });

    it('throws error when the artist id does not exist', () => {
      function response() {
        read('/artists/000');
      }
      expect(response).toThrowError('Failed to retrieve artist for id: 000');
    });
  });

  describe('Colors', () => {
    it('fetches a color', () => {
      const response = read('/colors/col000101');

      expect(typeof response).toEqual('object');

      expect(response.class).toEqual('color-101');
      expect(response.hex).toEqual('#FF0000');
      expect(response.id).toEqual('col000101');
      expect(response.name).toEqual('red');
    });

    it('fetches all colors', () => {
      const response = read('/colors');

      expect(typeof response).toEqual('object');

      expect(Object.keys(response).length).toEqual(3);
    });

    it('throws error when the color id does not exist', () => {
      function response() {
        read('/colors/000');
      }
      expect(response).toThrowError('Failed to retrieve color for id: 000');
    });

    it('fetches the total color counts', () => {
      const response = read('/colors/count');

      expect(typeof response).toEqual('object');
      expect(response.col000101).toEqual(1);
      expect(response.col000102).toEqual(1);
      expect(response.col000103).toEqual(1);
    });
  });

  describe('Members', () => {
    it('fetches a member', () => {
      const response = read('/members/-m000000000000000101');

      expect(typeof response).toEqual('object');

      expect(response.birthdate).toEqual(20180101);
      expect(response.id).toEqual('-m000000000000000101');
      expect(response.name).toEqual('Adam');

      expect(typeof response.altColor).toEqual('object');
      expect(response.altColor.class).toEqual('color-101');
      expect(response.altColor.hex).toEqual('#FF0000');
      expect(response.altColor.id).toEqual('col000101');
      expect(response.altColor.name).toEqual('red');

      expect(typeof response.color).toEqual('object');
      expect(response.color.class).toEqual('color-102');
      expect(response.color.hex).toEqual('#00FF00');
      expect(response.color.id).toEqual('col000102');
      expect(response.color.name).toEqual('green');

      expect(typeof response.positions).toEqual('object');
      expect(response.positions[0].id).toEqual('pos000101');
      expect(response.positions[0].name).toEqual('Vocalist');
      expect(response.positions[1].id).toEqual('pos000102');
      expect(response.positions[1].name).toEqual('Dancer');
    });

    it('fetches all members', () => {
      const response = read('/members');
      expect(typeof response).toEqual('object');
      expect(Object.keys(response).length).toEqual(3);
    });

    it('throws error when the member id does not exist', () => {
      function response() {
        read('/members/000');
      }
      expect(response).toThrowError('Failed to retrieve member for id: 000');
    });
  });

  describe('Positions', () => {
    it('fetches a position', () => {
      const response = read('/positions/pos000101');

      expect(typeof response).toEqual('object');

      expect(response.id).toEqual('pos000101');
      expect(response.name).toEqual('Vocalist');
    });

    it('fetches all positions', () => {
      const response = read('/positions');

      expect(typeof response).toEqual('object');

      expect(Object.keys(response).length).toEqual(3);
    });

    it('throws error when the position id does not exist', () => {
      function response() {
        read('/positions/000');
      }
      expect(response).toThrowError('Failed to retrieve position for id: 000');
    });
  });

  describe('Songs', () => {
    it('fetches a song', () => {
      const response = read('/songs/-s000000000000000101');

      expect(typeof response).toEqual('object');

      expect(response.id).toEqual('-s000000000000000101');
      expect(response.title).toEqual('Music');
      expect(response.type).toEqual('would');
      expect(response.unitId).toEqual('-u000000000000000101');
      expect(response.userId).toEqual('ld@ld.com');
      expect(response.query).toEqual('bar - music');
      expect(response.video).toEqual(
        'https://www.youtube.com/watch?v=0rtV5esQT6I'
      );
    });

    it('fetches all songs', () => {
      const response = read('/songs');

      expect(typeof response).toEqual('object');

      expect(Object.keys(response).length).toEqual(2);
    });

    it('throws error when the song id does not exist', () => {
      function response() {
        read('/songs/000');
      }
      expect(response).toThrowError('Failed to retrieve song for id: 000');
    });
  });

  describe('Units', () => {
    it('fetches a unit', () => {
      const response = read('/units/-u000000000000000101');

      expect(typeof response).toEqual('object');

      expect(response.debutYear).toEqual(2018);
      expect(response.id).toEqual('-u000000000000000101');
      expect(response.name).toEqual('OT2');
      expect(response.official).toEqual(true);

      expect(typeof response.artist).toEqual('object');
      expect(response.artist.name).toEqual('Foo');
      expect(response.artist.id).toEqual('-a000000000000000101');
      expect(response.artist.units.length).toEqual(2);
      expect(response.artist.units[0]).toEqual('-u000000000000000101');

      expect(Array.isArray(response.members)).toBeTruthy();
      expect(response.members.length).toEqual(2);
      expect(response.members[0].name).toEqual('Adam');
      expect(response.members[0].id).toEqual('-m000000000000000101');
      expect(response.members[0].positions.length).toEqual(2);

      expect(Array.isArray(response.songs)).toBeTruthy();
      expect(response.songs.length).toEqual(1);
      expect(response.songs[0].title).toEqual('Music');
      expect(response.songs[0].id).toEqual('-s000000000000000101');
    });

    it('fetches all units', () => {
      const response = read('/units');

      expect(typeof response).toEqual('object');

      expect(Object.keys(response).length).toEqual(3);
    });

    it('throws error when the unit id does not exist', () => {
      function response() {
        read('/units/000');
      }
      expect(response).toThrowError('Failed to retrieve unit for id: 000');
    });
  });

  describe('Users', () => {
    it('fetches a user', () => {
      const response = read('/users/us001');

      expect(typeof response).toEqual('object');

      expect(response.id).toEqual('us001');
      expect(response.email).toEqual('ld@ld.com');
      expect(response.isAdmin).toBeTruthy();
      expect(response.favoriteUnits.length).toEqual(3);
      expect(response.latestUnits.length).toEqual(3);
      expect(typeof response.session).toEqual('object');
    });

    it("fetches a user's favorite units", () => {
      const response = read('/users/us001/favorite');

      expect(Array.isArray(response)).toBeTruthy();

      expect(response.length).toEqual(3);
      expect(response[0].id).toEqual('-u000000000000000101');
      expect(response[1].id).toEqual('-u000000000000000102');
    });

    it("fetches a user's latest units", () => {
      const response = read('/users/us001/latest');

      expect(Array.isArray(response)).toBeTruthy();

      expect(response.length).toEqual(3);
      expect(response[0].id).toEqual('-u000000000000000102');
      expect(response[1].id).toEqual('-u000000000000000103');
    });

    it("fetches a user's session", () => {
      const response = read('/users/us001/session');

      expect(typeof response).toEqual('object');

      expect(response['user-favorite-artists']).toEqual(false);
      expect(response['user-latest-artists']).toEqual(false);
    });

    it('throws error when the user id does not exist', () => {
      function response() {
        read('/users/000');
      }
      expect(response).toThrowError('Failed to retrieve user for id: 000');
    });
  });
});
