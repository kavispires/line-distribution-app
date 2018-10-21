import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Member from '../components/Member';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Member)
);
