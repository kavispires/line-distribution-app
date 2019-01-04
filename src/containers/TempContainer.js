import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Temp from '../components/Temp';

import { testFunction1 } from '../reducers/temp';

const mapStateToProps = state => ({
  temp: state.temp,
});

const mapDispatchToProps = {
  testFunction1,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Temp)
);
