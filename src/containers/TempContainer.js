import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Temp from '../components/Temp';

import { testFunction1, testFunction2 } from '../reducers/temp';

const mapStateToProps = state => ({
  temp: state.temp,
});

const mapDispatchToProps = {
  testFunction1,
  testFunction2,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Temp)
);
