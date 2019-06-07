import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LearnMore from '../components/LearnMore';

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LearnMore)
);
