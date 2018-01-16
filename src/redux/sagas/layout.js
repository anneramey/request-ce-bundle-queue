import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { types } from '../modules/layout';
import { actions } from '../modules/app';

export function* setSize({ payload }) {
  yield put(actions.setLayoutSize(payload));
}

export function* watchLayout() {
  yield takeEvery(types.SET_SIZE, setSize);
}
