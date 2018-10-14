import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Test from '../components/Test';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Test)
);
