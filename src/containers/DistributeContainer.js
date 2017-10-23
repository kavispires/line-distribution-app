import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Distribute from '../components/Distribute';

import {
	boxMouseDown,
	boxMouseUp,
	handleDecrease,
	setDurations,
	setPercentages,
	handleFinish,
	handleKeydown,
	handleKeyup,
	handleReset,
	handleUndo
} from '../reducers/distribute';

const mapStateToProps = (state) => ({ app: state.app, distribute: state.distribute });

const mapDispatchToProps = {
	boxMouseDown,
	boxMouseUp,
	handleDecrease,
	setDurations,
	setPercentages,
	handleFinish,
	handleKeydown,
	handleKeyup,
	handleReset,
	handleUndo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Distribute));