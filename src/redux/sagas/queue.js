import { takeEvery } from 'redux-saga';
import { select, call } from 'redux-saga/effects';

import { CoreAPI } from 'react-kinetic-core';

import { types } from '../modules/queue';

const getAppSettings = state => state.app;

const buildSearch = (filter, appSettings) => {
  let searcher = new CoreAPI.SubmissionSearch();

  // There is at least one status add the criteria.
  if (filter.status.size > 0) {
    if (filter.status.length === 1) {
      searcher = searcher.eq('values[Status]', filter.status.first());
    } else {
      searcher = searcher.in('values[Status]', filter.status.toJS());
    }
  }

  // If there are selected teams then add them to the in-list. Otherwise implicitly
  // add all of my teams to the list.
  if (filter.teams.size > 0) {
    searcher = searcher.in('values[Assigned Team]', filter.teams.toJS());
  } else {
    const myTeams = appSettings.myTeams.map(t => t.name);
    searcher = searcher.in('values[Assigned Team]', myTeams.toJS());
  }

  if (filter.assignments.mine) {
    searcher.eq('values[Assigned Individual]', appSettings.profile.username);
  }

  // Process assignments.
  // .in('values[Assigned Individual]', filter.assignment)
  return searcher;
};

export function* fetchCurrentFiltersSaga(action) {
  const filter = action.payload;
  const appSettings = yield select(getAppSettings);
  const search = buildSearch(filter, appSettings).include('values').build();

  const { submissions } = yield call(CoreAPI.searchSubmissions, { search });

  // Post-process results:
  window.console.log(submissions);
}

export function* watchQueue() {
  yield takeEvery(types.SET_CURRENT_FILTER, fetchCurrentFiltersSaga);
}
