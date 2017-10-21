import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Creator from '../components/Creator';

const mapStateToProps = (state) => ({ app: state.app});

const mapDispatchToProps = {

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Creator));
