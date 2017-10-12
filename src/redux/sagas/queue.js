import { takeEvery } from 'redux-saga';
import { select, call, put } from 'redux-saga/effects';
import moment from 'moment';
import { CoreAPI } from 'react-kinetic-core';

import { types, actions } from '../modules/queue';
import { actions as errorActions } from '../modules/errors';

export const ERROR_STATUS_STRING = 'There was a problem retrieving items.';
export const TOO_MANY_STATUS_STRING = 'Your filter matches too many items.';

export const SUBMISSION_INCLUDES =
  'details,values,attributes,form,children,children.form,children.values';

export const getAppSettings = state => state.app;
export const getCurrentItem = state => state.queue.currentItem;

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

export const prepareAssignmentFilter = (searcher, filter, appSettings) => {
  // If we're searching by individuals we won't process any of the preset flags,
  // we'll just process the list they've chosen.
  if (filter.assignments.byIndividuals) {
    searcher.in(
      'values[Assigned Individual]',
      filter.assignments.individuals.toJS()
    );
  } else if (
    filter.assignments.mine ||
    filter.assignments.teammates ||
    filter.assignments.unassigned
  ) {
    searcher.or();
    if (filter.assignments.mine) {
      searcher.eq('values[Assigned Individual]', appSettings.profile.username);
    }
    if (filter.assignments.teammates) {
      searcher.in(
        'values[Assigned Individual]',
        appSettings.myTeammates.map(u => u.username)
      );
    }
    if (filter.assignments.unassigned) {
      searcher.eq('values[Assigned Individual]', null);
    }
    searcher.end();
  }
  return searcher;
};

export const prepareDateRangeFilter = (searcher, filter, now) => {
  if (filter.dateRange.custom) {
    searcher.sortBy(filter.dateRange.timeline);
    searcher.startDate(moment(filter.dateRange.start).toDate());
    searcher.endDate(
      moment(filter.dateRange.end)
        .add(1, 'day')
        .toDate()
    );
  } else if (filter.dateRange.preset !== '') {
    // Compute the number of days specified in the preset date range, just use
    // regex to get the number. If the string does not match the pattern log a
    // warning and default to 7.
    const match = filter.dateRange.preset.match(/^(\d+)days$/);
    const numberOfDays = match ? parseInt(match[1], 10) : 7;
    if (!match) {
      window.console.warn(
        `Invalid date range filter preset: ${filter.dateRange.preset}`
      );
    }
    searcher.sortBy(filter.dateRange.timeline);
    searcher.startDate(
      now
        .clone()
        .startOf('day')
        .subtract(numberOfDays, 'days')
        .toDate()
    );
    searcher.endDate(now.toDate());
  }
  return searcher;
};

export const buildSearch = (filter, appSettings) => {
  let searcher = new CoreAPI.SubmissionSearch();

  searcher = prepareStatusFilter(searcher, filter);
  searcher = prepareTeamsFilter(searcher, filter, appSettings);
  searcher = prepareAssignmentFilter(searcher, filter, appSettings);
  searcher = prepareDateRangeFilter(searcher, filter, moment());

  return searcher.include('details,form,values').build();
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

    const beforeIndex = -1;
    const afterIndex = 1;

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

export function* fetchCurrentFilterTask(action) {
  const filter = action.payload;
  const appSettings = yield select(getAppSettings);
  const search = yield call(buildSearch, filter, appSettings);

  const {
    submissions,
    messages,
    nextPageToken,
    serverError
  } = yield call(CoreAPI.searchSubmissions, { search });

  if (serverError || (messages && messages.length > 0)) {
    yield put(actions.setListStatus(ERROR_STATUS_STRING));
    yield put(errorActions.addError('Failed to retrieve items!'));
  } else if (nextPageToken) {
    yield put(actions.setListStatus(TOO_MANY_STATUS_STRING));
  } else {
    // Post-process results:
    const sortedSubmissions = yield call(sortSubmissions, submissions, filter);

    yield put(actions.setListItems(filter.name, sortedSubmissions));
  }
}

export function* fetchCurrentItemTask(action) {
  const { submission, serverError } = yield call(CoreAPI.fetchSubmission, {
    id: action.payload,
    include: SUBMISSION_INCLUDES
  });

  if (!serverError) {
    yield put(actions.setCurrentItem(submission));
  } else {
    yield put(errorActions.addError('Failed to retrieve item!'));
  }
}

export function* updateCurrentItemTask(action) {
  const currentItem = yield select(getCurrentItem);
  const { submission } = yield call(CoreAPI.updateSubmission, {
    id: currentItem.id,
    values: action.payload,
    include: SUBMISSION_INCLUDES
  });

  if (submission) {
    yield put(actions.setCurrentItem(submission));
  } else {
    yield put(errorActions.addError('Failed to update item!'));
  }
}

export function* watchQueue() {
  yield takeEvery(types.SET_CURRENT_FILTER, fetchCurrentFilterTask);
  yield takeEvery(types.FETCH_LIST, fetchCurrentFilterTask);
  yield takeEvery(types.FETCH_CURRENT_ITEM, fetchCurrentItemTask);
  yield takeEvery(types.UPDATE_CURRENT_ITEM, updateCurrentItemTask);
}
