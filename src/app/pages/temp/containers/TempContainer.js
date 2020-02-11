import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Temp from '../components/Temp';

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Temp)
);
