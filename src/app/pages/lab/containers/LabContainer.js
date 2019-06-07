import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Lab from '../components/Lab';

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Lab)
);
