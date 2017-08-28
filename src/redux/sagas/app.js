import { takeEvery } from 'redux-saga';
import { all, call, put } from 'redux-saga/effects';
import { CoreAPI } from 'react-kinetic-core';

import { getAttributeValue } from '../../utils';

import { actions, types, DEFAULT_DOCUMENTATION_URL, DEFAULT_SUPPORT_URL } from '../modules/app';

export function* fetchAppSettingsSaga() {
  const { space: { space }, kapp: { kapp } } = yield all({
    kapp: call(CoreAPI.fetchKapp, { include: 'attributes' }),
    space: call(CoreAPI.fetchSpace, { include: 'attributes' }),
  });

  const appSettings = {
    documentationUrl: getAttributeValue(
      'Documentation Url',
      DEFAULT_DOCUMENTATION_URL,
      kapp, space,
    )[0],
    supportUrl: getAttributeValue(
      'Support Url',
      DEFAULT_SUPPORT_URL,
      kapp, space,
    )[0],
  };

  yield put(actions.setAppSettings(appSettings));
}

export function* watchApp() {
  yield takeEvery(types.LOAD_APP_SETTINGS, fetchAppSettingsSaga);
}
