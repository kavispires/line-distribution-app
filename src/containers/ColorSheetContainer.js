import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ColorSheet from '../components/ColorSheet';

const mapStateToProps = state => ({ db: state.db });

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ColorSheet)
);
