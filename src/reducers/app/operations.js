import actions from './actions';

const init = () => dispatch => dispatch({ type: 'INITIALIZER' });

const setLoading = (value, instance) => dispatch => {
  // TO-DO: Delete this when no internal operation is using this function
};

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
  setLoading,
};
