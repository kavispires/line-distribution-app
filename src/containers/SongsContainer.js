import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Songs from '../components/Songs';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Songs)
);
