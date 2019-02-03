import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Error from '../components/Error';

const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Error)
);
