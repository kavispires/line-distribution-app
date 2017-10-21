import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Distribute from '../components/Distribute';

const mapStateToProps = (state) => ({ app: state.app});

const mapDispatchToProps = {

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Distribute));
