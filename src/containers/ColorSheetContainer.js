import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ColorSheet from '../components/ColorSheet';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ColorSheet)
);
