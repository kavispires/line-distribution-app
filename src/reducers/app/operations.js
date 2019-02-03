const init = () => dispatch => dispatch({ type: 'INITIALIZER' });

const setLoading = (value, instance) => dispatch => {
  // TO-DO: Delete this when no internal operation is using this function
};

export default {
  init,
  setLoading,
};
