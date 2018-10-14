import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artists from '../components/Artists';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Artists)
);
