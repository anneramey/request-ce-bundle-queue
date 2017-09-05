import { takeEvery } from 'redux-saga';
import { select, call } from 'redux-saga/effects';
import { List } from 'immutable';
import moment from 'moment';
import { CoreAPI } from 'react-kinetic-core';

import { types } from '../modules/queue';

const getAppSettings = state => state.app;

/* eslint-disable no-param-reassign */
const prepareStatusFilter = (searcher, filter) => {
  // There is at least one status add the criteria.
  if (filter.status.size > 0) {
    if (filter.status.length === 1) {
      searcher = searcher.eq('values[Status]', filter.status.first());
    } else {
      searcher = searcher.in('values[Status]', filter.status.toJS());
    }
  }

  return searcher;
};

/* eslint-disable no-param-reassign */
const prepareTeamsFilter = (searcher, filter, appSettings) => {
  // If there are selected teams then add them to the in-list. Otherwise implicitly
  // add all of my teams to the list.
  if (filter.teams.size > 0) {
    searcher = searcher.in('values[Assigned Team]', filter.teams.toJS());
  } else {
    const myTeams = appSettings.myTeams.map(t => t.name);
    searcher = searcher.in('values[Assigned Team]', myTeams.toJS());
  }
  return searcher;
};

/* eslint-disable no-param-reassign */
const prepareAssignmentFilter = (searcher, filter, appSettings) => {
  // If we're searching by individuals we won't process any of the preset flags,
  // we'll just process the list they've chosen.
  if (filter.assignments.byIndividuals) {
    searcher.in('values[Assigned Individual]', filter.assignments.individuals.toJS());
  } if (filter.assignments.unassigned) {
    // if mine and teammates
    if (filter.assignments.mine && filter.assignments.teammates) {
      // this means... everyone and no one too?
    } else if (filter.assignments.mine) {
      searcher.in('values[Assigned Individual]', [appSettings.profile.username, null]);
    } else if (filter.assignments.teammates) {
      searcher.in('values[Assigned Individual]', appSettings.myTeammates.push(null).toJS());
    } else {
      searcher.eq('values[Assigned Individual]', null);
    }
  } else {
    let assignments = List();
    if (filter.assignments.mine) {
      assignments = assignments.push(appSettings.profile.username);
    }
    if (filter.assignments.teammates) {
      assignments = assignments.merge(appSettings.myTeammates);
    }
    searcher.in('values[Assigned Individual]', assignments.toArray());
  }

  return searcher;
};

const prepareDateRangeFilter = (searcher, filter) => {
  if (filter.dateRange.custom) {
    searcher.sortBy(filter.dateRange.timeline);
    searcher.startDate(filter.dateRange.start);
    searcher.endDate(filter.dateRange.end);
  } else if (filter.dateRange.preset !== '') {
    searcher.sortBy(filter.dateRange.timeline);
    searcher.endDate(new Date());
    switch (filter.dateRange.preset) {
      case '7days':
        searcher.startDate(moment().subtract(7, 'days'));
        break;
      case '30days':
        searcher.startDate(moment().subtract(30, 'days'));
        break;
      case '60days':
        searcher.startDate(moment().subtract(60, 'days'));
        break;
      case '90days':
        searcher.startDate(moment().subtract(90, 'days'));
        break;
      default:
        window.console.warn(`Invalid date ranger filter preset '${filter.dateRange.preset}'.`);
        searcher.startDate(moment().subtract(7, 'days'));
        break;
    }
  }
  return searcher;
};

const buildSearch = (filter, appSettings) => {
  let searcher = new CoreAPI.SubmissionSearch();

  searcher = prepareStatusFilter(searcher, filter);
  searcher = prepareTeamsFilter(searcher, filter, appSettings);
  searcher = prepareAssignmentFilter(searcher, filter, appSettings);
  searcher = prepareDateRangeFilter(searcher, filter);

  return searcher;
};

const getSubmissionDate = (submission, key) => {
  if (['createdAt', 'updatedAt', 'closedAt'].includes(key)) {
    return submission[key];
  } else {
    return submission.values[key];
  }
};

export function* fetchCurrentFiltersSaga(action) {
  const filter = action.payload;
  const appSettings = yield select(getAppSettings);
  const search = buildSearch(filter, appSettings).include('values').build();

  const { submissions } = yield call(CoreAPI.searchSubmissions, { search });

  // Post-process results:
  submissions.sort((s1, s2) => {
    const s1Date = getSubmissionDate(s1, filter.sortBy);
    const s2Date = getSubmissionDate(s2, filter.sortBy);

    const beforeIndex = filter.sortDir === 'ASC' ? -1 : 1;
    const afterIndex = filter.sortDir === 'ASC' ? 1 : -1;

    if (moment(s1Date).isBefore(s2Date)) {
      return beforeIndex;
    } else if (moment(s1Date.isAfter(s2Date))) {
      return afterIndex;
    } else if (filter.sortedBy !== 'createdAt') {
      const s1Created = getSubmissionDate(s1, 'createdAt');
      const s2Created = getSubmissionDate(s2, 'createdAt');

      if (moment(s1Created).isBefore(s2Created)) {
        return beforeIndex;
      } else if (moment(s1Created.isAfter(s2Created))) {
        return afterIndex;
      }
    }
    return 0;
  });
}

export function* watchQueue() {
  yield takeEvery(types.SET_CURRENT_FILTER, fetchCurrentFiltersSaga);
}
