import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Manage from '../components/Manage';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Manage)
);
