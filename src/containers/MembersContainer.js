import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Members from '../components/Members';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Members)
);
