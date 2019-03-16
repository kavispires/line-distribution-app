import actions from './actions';

const init = () => dispatch => dispatch({ type: 'INITIALIZER' });

const handleCloseErrorModal = () => dispatch => {
  dispatch(actions.resetError());
};
const handleSendBugReport = () => (dispatch, getState) => {
  const { errorMessage } = getState().app;
  const today = Date.now();

  const body = {
    type: 'error',
    timestamp: today,
    content: errorMessage,
  };

  dispatch({ type: 'SEND_LOG', body });
  dispatch(actions.resetError());
};

export default {
  init,
  handleCloseErrorModal,
  handleSendBugReport,
};
