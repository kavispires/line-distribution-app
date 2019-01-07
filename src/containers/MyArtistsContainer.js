import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MyArtists from '../components/MyArtists';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyArtists)
);
