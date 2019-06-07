import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ErrorModal from '../components/ErrorModal';

import { appOperations } from '../../../../reducers/app';

const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = {
  ...appOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ErrorModal)
);
