import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MyDistributions from '../components/MyDistributions';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyDistributions)
);
