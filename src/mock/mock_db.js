const mockDB = {
  artists: {
    '-a000000000000000101': {
      genre: 'Pop',
      name: 'Foo',
      otherNames: 'foo foor',
      units: ['-u000000000000000101', '-u000000000000000102'],
    },
    '-a000000000000000102': {
      genre: 'K-Pop',
      name: 'Bar',
      otherNames: 'barr',
      units: ['-u000000000000000103'],
    },
    '-a000000000000000103': {
      genre: 'Rock',
      name: 'Baz',
      otherNames: 'bazr',
    },
  },
  colors: {
    col000101: {
      hex: '#FF0000',
      name: 'red',
    },
    col000102: {
      hex: '#00FF00',
      name: 'green',
    },
    col000103: {
      hex: '#0000FF',
      name: 'blue',
    },
  },
  members: {
    '-m000000000000000101': {
      altColorId: 'col000101',
      birthdate: 20180101,
      colorId: 'col000102',
      name: 'Adam',
      positions: ['pos000101', 'pos000102'],
    },
    '-m000000000000000102': {
      altColorId: 'col000102',
      birthdate: 20180102,
      colorId: 'col000103',
      name: 'Bob',
      positions: ['pos000102'],
    },
    '-m000000000000000103': {
      altColorId: 'col000103',
      birthdate: 20180103,
      colorId: 'col000101',
      name: 'Carl',
      positions: ['pos000101', 'pos000103'],
    },
  },
  positions: {
    pos000101: {
      name: 'Vocalist',
    },
    pos000102: {
      name: 'Dancer',
    },
    pos000103: {
      name: 'Rapper',
    },
  },
  songs: {
    '-s000000000000000101': {
      distribution:
        '[{"memberId":"-m000000000000000101","duration":2021},{"memberId":"m000000000000000102","duration":5632},{"memberId":"-m000000000000000103","duration":3401},{"memberId":"-m000000000000000102","duration":7283}]',
      lyrics:
        '[ADAM] I’m telling you now\n[BOB] I’m telling you\n[CARL]I’m telling you now\n\n[BOB] I told you\n',
      originalArtist: 'Bar',
      query: 'bar - music',
      title: 'Music',
      type: 'would',
      unitId: '-u000000000000000101',
      userId: 'ld@ld.com',
      video: 'https://www.youtube.com/watch?v=0rtV5esQT6I',
      groupSize: 3,
    },
    '-s000000000000000102': {
      distribution:
        '[{"memberId":"-m000000000000000101","duration":2021},{"memberId":"m000000000000000102","duration":5632},{"memberId":"-m000000000000000103","duration":3401},{"memberId":"-m000000000000000102","duration":7283}]',
      lyrics:
        '[ADAM] I’m kissing you now\n[BOB] I’m kissing you\n[CARL]I’m kissing you now\n\n[BOB] I kissed you\n',
      originalArtist: 'Bar',
      query: 'bar - kiss',
      title: 'Music',
      type: 'original',
      unitId: '-u000000000000000102',
      userId: 'ld@ld.com',
    },
  },
  units: {
    '-u000000000000000101': {
      artistId: '-a000000000000000101',
      debutYear: 2018,
      members: [
        {
          memberId: '-m000000000000000101',
          positions: ['pos000101', 'pos000102'],
        },
        {
          memberId: '-m000000000000000102',
          positions: ['pos000102'],
        },
      ],
      name: 'OT2',
      official: true,
      songs: ['-s000000000000000101'],
    },
    '-u000000000000000102': {
      artistId: '-a000000000000000102',
      debutYear: 2018,
      members: [
        {
          memberId: '-m000000000000000101',
          positions: ['pos000101'],
        },
        {
          memberId: '-m000000000000000102',
          positions: ['pos000102'],
        },
        {
          memberId: '-m000000000000000103',
          positions: ['pos000103'],
        },
      ],
      name: 'OT3',
      official: true,
      songs: [],
    },
    '-u000000000000000103': {
      artistId: '-a000000000000000103',
      debutYear: 2018,
      members: [
        {
          memberId: '-m000000000000000101',
          positions: ['pos000101', 'pos000103'],
        },
      ],
      name: 'OT1',
      official: false,
      songs: [],
    },
  },
  users: {
    us001: {
      email: 'ld@ld.com',
      favoriteUnits: [
        '-u000000000000000101',
        '-u000000000000000102',
        '-u000000000000000103',
      ],
      isAdmin: true,
      latestUnits: [
        '-u000000000000000102',
        '-u000000000000000103',
        '-u000000000000000101',
      ],
      session: {
        'user-favorite-artists': false,
        'user-latest-artists': false,
      },
    },
  },
};

export default mockDB;
