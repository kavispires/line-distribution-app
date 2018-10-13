import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Home from '../components/Home';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
