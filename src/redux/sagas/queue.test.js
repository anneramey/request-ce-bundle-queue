import { List } from 'immutable';
import moment from 'moment';
import { select, call, put } from 'redux-saga/effects';
import { actions } from '../modules/queue';

global.bundle = {
  apiLocation: () => '/acme/app/api/v1',
};
const { CoreAPI } = require('react-kinetic-core');
const { Filter, Profile } = require('../../records');
const {
  ERROR_STATUS_STRING,
  TOO_MANY_STATUS_STRING,
  getAppSettings,
  fetchCurrentFilterTask,
  fetchCurrentItemTask,
  prepareStatusFilter,
  prepareTeamsFilter,
  prepareAssignmentFilter,
  prepareDateRangeFilter,
  getSubmissionDate,
  sortSubmissions,
  buildSearch,
} = require('./queue');

const findQuery = (searcher, value) => searcher.query.find(q => q.lvalue === value);

describe('queue saga', () => {
  describe('filter assembling functions', () => {
    let filter;
    let searcher;
    let appSettings;

    beforeEach(() => {
      filter = new Filter();
      searcher = new CoreAPI.SubmissionSearch();

      appSettings = {
        myTeams: List([{ name: 'REAL_TEAM' }]),
        myTeammates: List([Profile({ username: 'you@yours.com' })]),
        profile: new Profile({ username: 'me@mine.com' }),
      };
    });

    describe('#prepareStatusFilter', () => {
      test('it uses the active statuses if there are no statuses', () => {
        searcher = prepareStatusFilter(searcher, filter);
        const query = findQuery(searcher, 'values[Status]');
        expect(query.rvalue).toContain('Open');
        expect(query.rvalue).toContain('Pending');
        expect(query.op).toBe('in');
      });

      test('it does change the status the searcher uses', () => {
        filter = filter.set('status', List(['FAKE_STATUS']));
        searcher = prepareStatusFilter(searcher, filter);
        const query = findQuery(searcher, 'values[Status]');
        expect(query.rvalue).toContain('FAKE_STATUS');
        expect(query.op).toBe('eq');
      });
    });

    describe('#prepareTeamsFilter', () => {
      test('uses the teams provided to it', () => {
        filter = filter.set('teams', List(['FAKE_TEAM']));
        searcher = prepareTeamsFilter(searcher, filter, appSettings);
        const query = findQuery(searcher, 'values[Assigned Team]');
        expect(query.rvalue).toContain('FAKE_TEAM');
        expect(query.rvalue).not.toContain('REAL_TEAM');
      });

      test('uses the profile teams if not provided', () => {
        searcher = prepareTeamsFilter(searcher, filter, appSettings);
        const query = findQuery(searcher, 'values[Assigned Team]');
        expect(query.rvalue).toContain('REAL_TEAM');
      });
    });

    describe('#prepareAssignmentFilter', () => {
      test('when "byIndividuals" is checked', () => {
        filter = filter
          .updateIn(['assignments', 'byIndividuals'], () => true)
          .updateIn(['assignments', 'individuals'], () => List(['none@of.us']));
        searcher = prepareAssignmentFilter(searcher, filter, appSettings);
        const query = findQuery(searcher, 'values[Assigned Individual]');
        expect(query.op).toBe('in');
        expect(query.rvalue).toContain('none@of.us');
        expect(query.rvalue).toHaveLength(1);
      });

      test('when "unassigned" is checked', () => {
        filter = filter.setIn(['assignments', 'unassigned'], true);
        searcher = prepareAssignmentFilter(searcher, filter, appSettings);
        expect(searcher.query.length).toBe(1);
        expect(searcher.query[0].op).toBe('or');
        expect(searcher.query[0].context.length).toBe(1);
        expect(searcher.query[0].context[0].op).toBe('eq');
        expect(searcher.query[0].context[0].lvalue).toBe('values[Assigned Individual]');
        expect(searcher.query[0].context[0].rvalue).toBe(null);
      });

      test('when "mine" is checked', () => {
        filter = filter.setIn(['assignments', 'mine'], true);
        searcher = prepareAssignmentFilter(searcher, filter, appSettings);
        expect(searcher.query.length).toBe(1);
        expect(searcher.query[0].op).toBe('or');
        expect(searcher.query[0].context.length).toBe(1);
        expect(searcher.query[0].context[0].op).toBe('eq');
        expect(searcher.query[0].context[0].lvalue).toBe('values[Assigned Individual]');
        expect(searcher.query[0].context[0].rvalue).toBe('me@mine.com');
      });

      test('when "teammates" is checked', () => {
        filter = filter.setIn(['assignments', 'teammates'], true);
        searcher = prepareAssignmentFilter(searcher, filter, appSettings);
        expect(searcher.query.length).toBe(1);
        expect(searcher.query[0].op).toBe('or');
        expect(searcher.query[0].context.length).toBe(1);
        expect(searcher.query[0].context[0].op).toBe('in');
        expect(searcher.query[0].context[0].lvalue).toBe('values[Assigned Individual]');
        expect(searcher.query[0].context[0].rvalue.toJS()).toEqual(['you@yours.com']);
      });

      describe('when a combination is checked', () => {
        test('mine and teammates', () => {
          filter = filter
            .setIn(['assignments', 'mine'], true)
            .setIn(['assignments', 'teammates'], true);
          searcher = prepareAssignmentFilter(searcher, filter, appSettings);
          expect(searcher.query.length).toBe(1);
          expect(searcher.query[0].op).toBe('or');
          expect(searcher.query[0].context.length).toBe(2);
          expect(searcher.query[0].context[0].op).toBe('eq');
          expect(searcher.query[0].context[0].lvalue).toBe('values[Assigned Individual]');
          expect(searcher.query[0].context[0].rvalue).toEqual('me@mine.com');
          expect(searcher.query[0].context[1].op).toBe('in');
          expect(searcher.query[0].context[1].lvalue).toBe('values[Assigned Individual]');
          expect(searcher.query[0].context[1].rvalue.toJS()).toEqual(['you@yours.com']);
        });

        describe('when none are checked', () => {
          test('mine and teammates', () => {
            filter = filter
              .setIn(['assignments', 'mine'], false)
              .setIn(['assignments', 'teammates'], false)
              .setIn(['assignments', 'unassigned'], false);
            searcher = prepareAssignmentFilter(searcher, filter, appSettings);
            expect(searcher.query.length).toBe(0);
          });
        });
      });
    });

    describe('#prepareDateRangeFilter', () => {
      test('no preset or custom range', () => {
        filter = filter
          .setIn(['dateRange', 'preset'], '')
          .setIn(['dateRange', 'custom'], false);
        searcher = prepareDateRangeFilter(searcher, filter, moment());
        expect(searcher.searchMeta.timeline).toBeUndefined();
        expect(searcher.searchMeta.start).toBeUndefined();
        expect(searcher.searchMeta.end).toBeUndefined();
      });

      test('when custom range', () => {
        filter = filter
          .setIn(['dateRange', 'custom'], true)
          .setIn(['dateRange', 'timeline'], 'updatedAt')
          .setIn(['dateRange', 'start'], '2017-09-02')
          .setIn(['dateRange', 'end'], '2017-09-05');
        searcher = prepareDateRangeFilter(searcher, filter, moment());
        expect(searcher.searchMeta.timeline).toBe('updatedAt');
        expect(searcher.searchMeta.start).toEqual('2017-09-02T05:00:00.000Z');
        expect(searcher.searchMeta.end).toEqual('2017-09-06T05:00:00.000Z');
      });

      test('when using presets', () => {
        filter = filter
          .setIn(['dateRange', 'timeline'], 'closedAt')
          .setIn(['dateRange', 'preset'], '3days');
        searcher = prepareDateRangeFilter(searcher, filter, moment('2017-09-08T15:30:00.000'));
        expect(searcher.searchMeta.timeline).toBe('closedAt');
        expect(searcher.searchMeta.start).toBe('2017-09-05T05:00:00.000Z');
        expect(searcher.searchMeta.end).toBe('2017-09-08T20:30:00.000Z');
      });

      test('when there is an invalid preset defaults to 7 days', () => {
        filter = filter
          .setIn(['dateRange', 'timeline'], 'closedAt')
          .setIn(['dateRange', 'preset'], 'foo');
        searcher = prepareDateRangeFilter(searcher, filter, moment('2017-09-08T15:30:00.000'));
        expect(searcher.searchMeta.timeline).toBe('closedAt');
        expect(searcher.searchMeta.start).toBe('2017-09-01T05:00:00.000Z');
        expect(searcher.searchMeta.end).toBe('2017-09-08T20:30:00.000Z');
      });
    });

    describe('#getSubmissionDate', () => {
      const submission = {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        closedAt: 'closedAt',
        values: {
          due: 'due',
        },
      };

      ['createdAt', 'updatedAt', 'closedAt'].forEach(timeline =>
        test(`gets timeline date '${timeline}'`, () => {
          expect(getSubmissionDate(submission, timeline)).toBe(timeline);
        }));
      test('gets value date', () => {
        expect(getSubmissionDate(submission, 'due')).toBe('due');
      });
    });

    describe('#sortSubmissions', () => {
      let submissions;

      const today = () => new Date().toISOString();
      const weekAgo = () => moment().subtract(7, 'days').toDate().toISOString();
      const fiveDaysAgo = () => moment().subtract(5, 'days').toDate().toISOString();

      beforeEach(() => {
        submissions = [
          {
            id: '1',
            createdAt: today(),
            values: { scheduled: today() },
          },
          {
            id: '2',
            createdAt: weekAgo(),
            values: { scheduled: fiveDaysAgo(), due: today() },
          },
          {
            id: '3',
            createdAt: fiveDaysAgo(),
            values: { scheduled: weekAgo() },
          },
        ];
      });

      describe('when sorting by a timeline', () => {
        test('createdAt ascending', () => {
          filter = filter.set('sortBy', 'createdAt');

          const sorted = sortSubmissions(submissions, filter).map(s => s.id);
          expect(sorted).toEqual(['2', '3', '1']);
        });
      });

      describe('when sorting by values', () => {
        describe('when all submissions have the value', () => {
          test('scheduled value ascending', () => {
            filter = filter.set('sortBy', 'scheduled');

            const sorted = sortSubmissions(submissions, filter).map(s => s.id);
            expect(sorted).toEqual(['3', '2', '1']);
          });
        });
      });

      describe('when only some submissions have the value', () => {
        test('due value ascending', () => {
          filter = filter.set('sortBy', 'due');

          const sorted = sortSubmissions(submissions, filter).map(s => s.id);
          expect(sorted).toEqual(['3', '1', '2']);
        });
      });

      describe('when none of the submissions have the value', () => {
        test('sorts by createdAt', () => {
          filter = filter.set('sortBy', 'fake');

          const sorted = sortSubmissions(submissions, filter).map(s => s.id);
          expect(sorted).toEqual(['2', '3', '1']);
        });
      });
    });
  });

  describe('#fetchCurrentFilterSaga', () => {
    let action;
    let appSettings;
    let search;
    let response;

    beforeEach(() => {
      action = { payload: { name: 'Filter Name' } };
      appSettings = {};
      search = {};
      response = { submissions: [] };
    });

    describe('when there are server errors', () => {
      test('it sets the list status to indicate an error', () => {
        const saga = fetchCurrentFilterTask(action);

        // First get the app settings out of the state.
        expect(saga.next().value).toEqual(select(getAppSettings));
        // Build the search criteria.
        expect(saga.next(appSettings).value)
          .toEqual(call(buildSearch, action.payload, appSettings));
        // Execute the search.
        expect(saga.next(search).value)
          .toEqual(call(CoreAPI.searchSubmissions, { search }));
        // Return an error.
        expect(saga.next({ serverError: 'some error' }).value)
          .toEqual(put(actions.setListStatus(ERROR_STATUS_STRING)));
      });
    });

    describe('when there are too many items', () => {
      test('it sets the list status to indicate an error', () => {
        const saga = fetchCurrentFilterTask(action);

        // First get the app settings out of the state.
        expect(saga.next().value).toEqual(select(getAppSettings));
        // Build the search criteria.
        expect(saga.next(appSettings).value)
          .toEqual(call(buildSearch, action.payload, appSettings));
        // Execute the search.
        expect(saga.next(search).value)
          .toEqual(call(CoreAPI.searchSubmissions, { search }));
        // Return an error.
        expect(saga.next({ nextPageToken: 'some token' }).value)
          .toEqual(put(actions.setListStatus(TOO_MANY_STATUS_STRING)));
      });
    });

    describe('when request is successful', () => {
      test('it sets the list items', () => {
        const saga = fetchCurrentFilterTask(action);

        // First get the app settings out of the state.
        expect(saga.next().value).toEqual(select(getAppSettings));
        // Build the search criteria.
        expect(saga.next(appSettings).value)
          .toEqual(call(buildSearch, action.payload, appSettings));
        // Execute the search.
        expect(saga.next(search).value)
          .toEqual(call(CoreAPI.searchSubmissions, { search }));
        // It sorts the submissions
        expect(saga.next(response).value)
          .toEqual(call(sortSubmissions, response.submissions, action.payload));
        expect(saga.next(response.submissions).value)
          .toEqual(put(actions.setListItems('Filter Name', response.submissions)));
      });
    });
  });

  describe('#fetchCurrentItemTask', () => {
    let action;
    let response;

    beforeEach(() => {
      action = { payload: 'abc' };
      response = { submission: {} };
    });

    describe('when request is successful', () => {
      test('it sets the list items', () => {
        const include = 'details,values,attributes,form,children,children.form,children.values';
        const saga = fetchCurrentItemTask(action);

        // Execute the search.
        expect(saga.next().value)
          .toEqual(call(CoreAPI.fetchSubmission, { id: action.payload, include }));
        expect(saga.next(response).value)
          .toEqual(put(actions.setCurrentItem(response.submission)));
      });
    });
  });
});
