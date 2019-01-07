import { toastr } from 'react-redux-toastr';

import actions from './actions';

import API from '../../api';

const init = () => async dispatch => {
  dispatch(setLoading(true, 'init'));
  try {
    const dbStart = await API.init();
    const status = dbStart.dbInfo();
    await dispatch(actions.setDatabaseReady(status.data.loaded));
  } catch (error) {
    console.log(error);
    toastr.error('Unable to reach database', error);
  } finally {
    dispatch(setLoading(false, 'init'));
  }
};

const loadingDict = {};

const setLoading = (value, instance) => dispatch => {
  // Check if value and instance were passed as argument
  if (typeof instance !== 'string') {
    return console.error('Missing instance string');
  }
  if (typeof value !== 'boolean') {
    return console.error('Missing boolean value string');
  }

  // Check if instance is in the dictonary or not.
  if (loadingDict[instance] === undefined && value) {
    loadingDict[instance] = true;
    dispatch(actions.setIsLoading(true));
  } else if (loadingDict[instance] && !value) {
    delete loadingDict[instance];
  }

  // If there are no loading instances, remove loading bar
  if (Object.keys(loadingDict).length === 0) {
    dispatch(actions.setIsLoading(false));
  }
};

export default {
  init,
  setLoading,
};
