import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Temp from '../components/Temp';

import { tempOperations } from '../reducers/temp';

const mapStateToProps = state => ({
  temp: state.temp,
});

const mapDispatchToProps = {
  ...tempOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Temp)
);
