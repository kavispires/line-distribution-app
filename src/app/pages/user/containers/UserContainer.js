import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import User from '../components/User';

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(User)
);
