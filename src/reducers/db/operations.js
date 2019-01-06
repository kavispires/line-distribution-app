import { toastr } from 'react-redux-toastr';

import API from '../../api';

import actions from './actions';

import { appOperations } from '../app';
import utils from '../../utils';

const loadColors = () => async dispatch => {
  dispatch(appOperations.setLoading(true, 'colors'));

  try {
    const response = await API.get('/colors');
    const colors = utils.parseResponseToObject(response);
    dispatch(actions.setColors(colors));
  } catch (error) {
    console.error(error);
    toastr.error('Oh no', error.errorMessage);
  } finally {
    dispatch(appOperations.setLoading(false, 'colors'));
  }
};

export default {
  loadColors,
};
