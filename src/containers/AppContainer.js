import { connect } from 'react-redux';

import App from '../components/App';

import {

} from '../reducers/app';



const mapStateToProps = (state) => ({ app: state.app});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
