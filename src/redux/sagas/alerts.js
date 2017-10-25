import { call, put, takeEvery } from 'redux-saga/effects';
import { CoreAPI } from 'react-kinetic-core';
import { types, actions } from '../modules/alerts';

export const ALERTS_SEARCH = new CoreAPI.SubmissionSearch()
  .eq('values[Status]', 'Active')
  .include('details,values')
  .limit(1000)
  .build();

export function* fetchAlertsSaga() {
  const { submissions, serverError } = yield call(CoreAPI.searchSubmissions, {
    kapp: 'admin',
    form: 'alerts',
    search: ALERTS_SEARCH,
  });

  yield put(
    serverError
      ? actions.setAlertsError(serverError)
      : actions.setAlerts(submissions),
  );
}

export function* watchAlerts() {
  yield takeEvery(types.FETCH_ALERTS, fetchAlertsSaga);
}
