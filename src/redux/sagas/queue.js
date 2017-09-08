import { takeEvery } from 'redux-saga';
import { select, call, put } from 'redux-saga/effects';
import { List } from 'immutable';
import moment from 'moment';
import { CoreAPI } from 'react-kinetic-core';

import { types, actions } from '../modules/queue';

export const ERROR_STATUS_STRING = 'There was a problem retrieving items.';
export const TOO_MANY_STATUS_STRING = 'Your filter matches too many items.';

export const getAppSettings = state => state.app;

/* eslint-disable no-param-reassign */
export const prepareStatusFilter = (searcher, filter) => {
  // There is at least one status add the criteria.
  if (filter.status.size > 0) {
    if (filter.status.size === 1) {
      searcher = searcher.eq('values[Status]', filter.status.first());
    } else {
      searcher = searcher.in('values[Status]', filter.status.toJS());
    }
  }

  return searcher;
};

/* eslint-disable no-param-reassign */
export const prepareTeamsFilter = (searcher, filter, appSettings) => {
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
export const prepareAssignmentFilter = (searcher, filter, appSettings) => {
  // If we're searching by individuals we won't process any of the preset flags,
  // we'll just process the list they've chosen.
  if (filter.assignments.byIndividuals) {
    searcher.in('values[Assigned Individual]', filter.assignments.individuals.toJS());
  } if (filter.assignments.unassigned) {
    let assignments = List([null]);
    if (filter.assignments.mine && filter.assignments.teammates) {
      assignments = assignments
        .concat(appSettings.myTeammates.map(u => u.username))
        .push(appSettings.profile.username);
    } else if (filter.assignments.mine) {
      assignments = assignments.push(appSettings.profile.username);
    } else if (filter.assignments.teammates) {
      assignments = assignments.concat(appSettings.myTeammates.map(u => u.username));
    }
    searcher.in('values[Assigned Individual]', assignments.toJS());
  } else {
    let assignments = List();
    if (filter.assignments.mine) {
      assignments = assignments.push(appSettings.profile.username);
    }
    if (filter.assignments.teammates) {
      assignments = assignments.concat(appSettings.myTeammates.map(u => u.username));
    }
    searcher.in('values[Assigned Individual]', assignments.toArray());
  }

  return searcher;
};

export const prepareDateRangeFilter = (searcher, filter) => {
  if (filter.dateRange.custom) {
    searcher.sortBy(filter.dateRange.timeline);
    searcher.startDate(filter.dateRange.start);
    searcher.endDate(filter.dateRange.end);
  } else if (filter.dateRange.preset !== '') {
    searcher.sortBy(filter.dateRange.timeline);
    searcher.endDate(new Date());
    switch (filter.dateRange.preset) {
      case '7days':
        searcher.startDate(moment().subtract(7, 'days').toDate());
        break;
      case '30days':
        searcher.startDate(moment().subtract(30, 'days').toDate());
        break;
      case '60days':
        searcher.startDate(moment().subtract(60, 'days').toDate());
        break;
      case '90days':
        searcher.startDate(moment().subtract(90, 'days').toDate());
        break;
      default:
        window.console.warn(`Invalid date ranger filter preset '${filter.dateRange.preset}'.`);
        searcher.startDate(moment().subtract(7, 'days').toDate());
        break;
    }
  }
  return searcher;
};

export const buildSearch = (filter, appSettings) => {
  let searcher = new CoreAPI.SubmissionSearch();

  searcher = prepareStatusFilter(searcher, filter);
  searcher = prepareTeamsFilter(searcher, filter, appSettings);
  searcher = prepareAssignmentFilter(searcher, filter, appSettings);
  searcher = prepareDateRangeFilter(searcher, filter);

  return searcher.include('values').build();
};

export const getSubmissionDate = (submission, key) => {
  if (['createdAt', 'updatedAt', 'closedAt'].includes(key)) {
    return submission[key];
  } else {
    return submission.values[key];
  }
};

export const sortSubmissions = (submissions, filter) =>
  submissions.sort((s1, s2) => {
    const s1Date = getSubmissionDate(s1, filter.sortBy);
    const s2Date = getSubmissionDate(s2, filter.sortBy);

    const beforeIndex = filter.sortDir === 'ASC' ? -1 : 1;
    const afterIndex = filter.sortDir === 'ASC' ? 1 : -1;

    if (s1Date && s2Date) {
      if (moment(s1Date).isBefore(s2Date)) {
        return beforeIndex;
      } else if (moment(s1Date).isAfter(s2Date)) {
        return afterIndex;
      }
    } else if (s1Date && !s2Date) {
      return afterIndex;
    } else if (!s1Date && s2Date) {
      return beforeIndex;
    } else {
      const s1Created = getSubmissionDate(s1, 'createdAt');
      const s2Created = getSubmissionDate(s2, 'createdAt');

      if (moment(s1Created).isBefore(s2Created)) {
        return beforeIndex;
      } else if (moment(s1Created).isAfter(s2Created)) {
        return afterIndex;
      }
    }

    return 0;
  });

export function* fetchCurrentFilterSaga(action) {
  const filter = action.payload;
  const appSettings = yield select(getAppSettings);
  const search = yield call(buildSearch, filter, appSettings);

  const {
    submissions,
    messages,
    nextPageToken,
    serverError,
  } = yield call(CoreAPI.searchSubmissions, { search });

  if (serverError || (messages && messages.length > 0)) {
    yield put(actions.setListStatus(ERROR_STATUS_STRING));
  } else if (nextPageToken) {
    yield put(actions.setListStatus(TOO_MANY_STATUS_STRING));
  } else {
    // Post-process results:
    const sortedSubmissions = yield call(sortSubmissions, submissions, filter);

    yield put(actions.setListItems(sortedSubmissions));
  }
}

export function* watchQueue() {
  yield takeEvery(types.SET_CURRENT_FILTER, fetchCurrentFilterSaga);
}
