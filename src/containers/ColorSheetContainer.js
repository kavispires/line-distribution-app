import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ColorSheet from '../components/ColorSheet';

const mapStateToProps = (state) => ({ app: state.app});

export default withRouter(connect(mapStateToProps)(ColorSheet));
