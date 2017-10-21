import { connect } from 'react-redux';

import ColorSheet from '../components/ColorSheet';

import {

} from '../reducers/app';



const mapStateToProps = (state) => ({ app: state.app});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ColorSheet);
