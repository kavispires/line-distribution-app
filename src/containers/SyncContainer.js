import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sync from '../components/Sync';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sync)
);
