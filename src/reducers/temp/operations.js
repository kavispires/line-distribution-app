import actions from './actions';

const testFunction1 = () => dispatch => {
  console.log('testFunction1');

  dispatch(actions.setTest1('Ran testFunction1'));
};

const testFunction2 = () => dispatch => {
  console.log('testFunction2');

  dispatch(actions.setTest1('Ran testFunction2'));
};

const testFunction3 = () => dispatch => {
  console.log('testFunction3');

  dispatch(actions.setTest1('Ran testFunction3'));
};

const testFunction4 = () => dispatch => {
  console.log('testFunction4');

  dispatch(actions.setTest1('Ran testFunction4'));
};

const testFunction5 = () => dispatch => {
  console.log('testFunction5');

  dispatch(actions.setTest1('Ran testFunction5'));
};

export default {
  testFunction1,
  testFunction2,
  testFunction3,
  testFunction4,
  testFunction5,
};
