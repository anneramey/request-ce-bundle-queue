import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CoreAPI } from 'react-kinetic-core';

import { types, actions } from '../modules/submissions';
import { actions as errorActions } from '../modules/errors';

export function* searchSubmissionsSaga(action) {
  const { submissions, serverError } = yield call(CoreAPI.searchSubmissions, {
    search: action.payload,
  });

  if (serverError) {
    yield put(errorActions.setSystemError(serverError));
    yield put(push('/system-error'));
  } else {
    yield put(actions.setSubmissions(submissions));
  }
}

export function* watchSubmissions() {
  yield takeEvery(types.SEARCH_SUBMISSIONS, searchSubmissionsSaga);
}
