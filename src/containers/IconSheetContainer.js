import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import IconSheet from '../components/IconSheet';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IconSheet)
);
