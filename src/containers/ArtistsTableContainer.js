import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ArtistsTable from '../components/ArtistsTable';

import { updateFavoriteArtists } from '../reducers/auth';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  updateFavoriteArtists,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ArtistsTable)
);
