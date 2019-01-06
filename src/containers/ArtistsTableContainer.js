import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ArtistsTable from '../components/ArtistsTable';

import { authOperations } from '../reducers/auth';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  ...authOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ArtistsTable)
);
