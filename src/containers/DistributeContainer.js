import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Distribute from '../components/Distribute';

import {
	boxMouseDown,
	boxMouseUp,
	setDurations,
	setPercentages,
	handleReset,
	handleUndo,
	handleDecrease,
	handleFinish
} from '../reducers/distribute';

const mapStateToProps = (state) => ({ app: state.app, distribute: state.distribute });

const mapDispatchToProps = {
	boxMouseDown,
	boxMouseUp,
	setDurations,
	setPercentages,
	handleReset,
	handleUndo,
	handleDecrease,
	handleFinish
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Distribute));
