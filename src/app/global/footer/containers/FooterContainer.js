import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Footer from '../components/Footer';

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Footer)
);
