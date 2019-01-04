import React, { Component } from 'react';
import PropTypes from 'prop-types';

import API from '../api';

import Header from './Header';
import LoadingBar from './LoadingBar';

class App extends Component {
  async componentDidMount() {
    await this.props.init();
    await this.props.checkAuth();

    // try {
    //   console.log('==== TRY/CATCH START ====');
    //   const startDB = await API.init();
    //   API.setter('_authenticated', true);
    //   API.setter('_uid', '000000000001');
    //   console.log(startDB);
    // const testArtists = await API.get(`/artists`);
    // console.log('testArtists', testArtists);
    // const testArtist = await API.get(`/artists/-LDcyPgcJaR4gd8pvVKb`);
    // console.log('testArtist', testArtist);
    // const testArtistUnits = await API.get(
    //   `/artists/-LDcyPgcJaR4gd8pvVKb/units`
    // );
    // console.log('testArtistUnits', testArtistUnits);
    // const testColors = await API.get(`/colors`);
    // console.log('testColors', testColors);
    // const testMembers = await API.get(`/members`);
    // console.log('testMembers', testMembers);
    // const testMember = await API.get(`/members/-LDcyPg_LQgDOBQ-wFP3`);
    // console.log('testMember', testMember);
    // // const testPositions = await API.get(`/positions`);
    // // console.log('testPositions', testPositions);
    // const testSongs = await API.get(`/songs`);
    // console.log('testSongs', testSongs);
    // const testSong = await API.get(`/songs/-LLcdNSHFJj1TqkK0y9f`);
    // console.log('testSong', testSong);
    // const testUnit = await API.get(`/units/-LDcyPgbytNzK2BkYaLN`);
    // console.log('testUnit', testUnit);
    // const testUnitDistributions = await API.get(
    //   `/units/-LDcyPgbytNzK2BkYaLN/distributions`
    // );
    // console.log('testUnitDistributions', testUnitDistributions);
    // const testUnitMembers = await API.get(
    //   `/units/-LDcyPgbytNzK2BkYaLN/members`
    // );
    // console.log('testUnitMembers', testUnitMembers);
    // const testUser = await API.get(`/users/hbFlRswbZkepQfaONzoyB6EuJSA2`);
    // console.log('testUser', testUser);

    // const postColor = await API.post('/colors', {
    //   name: 'test',
    //   r: 1,
    //   g: 2,
    //   b: 3,
    //   hex: '#000000',

    // });
    // console.log('postArtist', postColor);
    // const postMember = await API.post('/members', {
    //   name: 'Adam',
    //   birthdate: '123',
    //   colorId: 'col000001',
    //   gender: 'MALE',
    //   nationality: 'BRITISH',
    //   referenceArtist: 'BAND'
    // });
    // console.log('postMember', postMember);
    // console.log('SONG');
    // const postSong = await API.post('/songs', {
    //   title: "Bob's Song",
    //   distribution: 'a string with the distribution',
    //   originalArtist: 'Twice'
    // });
    // console.log('postSong', postSong);
    // console.log('UNIT');
    // const postUnit = await API.post('/units', {
    //   artistId: 'at1', debutYear: 2018, name: 'OT1'
    // });
    // console.log('postUnit', postUnit);

    // console.log('USER');
    // const postUsers = await API.post('/users', {
    //   email: 'kavis@kavis.com'
    // });
    // console.log('postUsers', postUsers);

    // console.log('ARTIST');
    // const putArtist = await API.put('/artists/-LSbfcWFw7DJtlUP17Oi', {
    //   genre: 'BUCETUDO',
    //   otherNames: 'bucetinha'
    // });
    // console.log('putArtist', putArtist);

    // console.log('MEMBERS');
    // const putMember = await API.put('/members/-LSciS9M_mmqRt2Qeoz4', {
    //   colorId: 'col000001',
    // });
    // console.log('putMember', putMember);

    // console.log('SONGS');
    // const putSong = await API.put('/songs/-LSblcgEWRR0k-KKduw1', {
    //   groupSize: 4,
    // });
    // console.log('putSong', putSong);

    // console.log('UNITS');
    // const putUnit = await API.put('/units/-LSbnom0ncciQ9KB4id8', {
    //   name: 'OT2',
    // });
    // console.log('putUnit', putUnit);

    // console.log('USERS');
    // const putSong = await API.put('/songs/-LSblcgEWRR0k-KKduw1', {
    //   groupSize: 4,
    // });
    // console.log('putSong', putSong);

    // await API.post('/members', {
    //   name: 'Adam',
    //   birthdate: '121',
    //   colorId: 'col000001',
    //   gender: 'MALE',
    //   nationality: 'BRITISH',
    //   referenceArtist: 'BAND'
    // });

    // await API.post('/members', {
    //   name: 'Bob',
    //   birthdate: '122',
    //   colorId: 'col000002',
    //   gender: 'MALE',
    //   nationality: 'BRITISH',
    //   referenceArtist: 'BAND'
    // });

    // await API.post('/members', {
    //   name: 'Cam',
    //   birthdate: '123',
    //   colorId: 'col000003',
    //   gender: 'MALE',
    //   nationality: 'BRITISH',
    //   referenceArtist: 'BAND'
    // });

    // await API.post('/artists', {
    //   name: 'The Test band',
    // });

    // Artist Id
    // -LSflTBYX_OeiNell2ia

    // Member ids
    // -LSffMf0uvh3wCPTYFDi
    // -LSffNFtTbTrE2LNIp09
    // -LSffNGoyhjEUNz5AE6J

    // await API.post('/units', {
    //   name: 'OT3',
    //   debutYear: 2018,
    //   artistId: '-LSflTBYX_OeiNell2ia',
    // });

    // Unit Id
    // -LSkH2zzNHstIpUtg3wK

    //   const res = await API.put('/units/-LSkH2zzNHstIpUtg3wK', {
    //     members: {
    //       '-LSffMf0uvh3wCPTYFDi:Adam:DANCER': true,
    //       '-LSffMf0uvh3wCPTYFDi:Adam:VOCALIST': true,
    //       '-LSffNFtTbTrE2LNIp09:Bob:VOCALIST': true,
    //       '-LSffNGoyhjEUNz5AE6J:Cam:RAPPER': true,
    //     },
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.log('ERROR BITCH!!!', error);
    // } finally {
    //   console.log('==== TRY/CATCH DONE ====');
    // }
  }

  componentDidUpdate(nextProps) {
    // if (nextProps.db.loaded !== this.props.db.loaded) {
    //   this.props.checkAuth();
    //   const { location } = this.props;
    //   if (location.pathname === '/artists') {
    //     this.props.loadArtists();
    //   }
    //   if (location.pathname.includes('/artists/')) {
    //     this.props.loadArtist(location.pathname.substr(9), location.search);
    //   }
    // }
  }

  render() {
    return (
      <div>
        <Header props={this.props} />
        {this.props.app.isLoading ? <LoadingBar /> : null}
      </div>
    );
  }
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  checkAuth: PropTypes.func.isRequired,
  db: PropTypes.object.isRequired,
  initDB: PropTypes.func.isRequired,
  loadArtist: PropTypes.func.isRequired,
  loadArtists: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default App;
