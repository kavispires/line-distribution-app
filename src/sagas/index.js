import { all, fork } from 'redux-saga/effects';
import apiSaga from './api-saga';
import statusHandlingSaga from './status-handling';

export default function* rootSaga() {
  yield all([fork(apiSaga), fork(statusHandlingSaga)]);
}
