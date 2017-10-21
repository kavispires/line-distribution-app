import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Lyrics from '../components/Lyrics';

const mapStateToProps = (state) => ({ app: state.app});

const mapDispatchToProps = {

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lyrics));
