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
  fetchCurrentFilterSaga,
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
        filter = filter.updateIn(['assignments', 'unassigned'], () => true);
        searcher = prepareAssignmentFilter(searcher, filter, appSettings);
        const query = findQuery(searcher, 'values[Assigned Individual]');
        expect(query.op).toBe('in');
        expect(query.rvalue).toContain(null);
        expect(query.rvalue).toHaveLength(1);
      });

      test('when "mine" is checked', () => {
        filter = filter.updateIn(['assignments', 'mine'], () => true);
        searcher = prepareAssignmentFilter(searcher, filter, appSettings);
        const query = findQuery(searcher, 'values[Assigned Individual]');
        expect(query.op).toBe('in');
        expect(query.rvalue).toContain('me@mine.com');
        expect(query.rvalue).toHaveLength(1);
      });

      test('when "teammates" is checked', () => {
        filter = filter.updateIn(['assignments', 'teammates'], () => true);
        searcher = prepareAssignmentFilter(searcher, filter, appSettings);
        const query = findQuery(searcher, 'values[Assigned Individual]');
        expect(query.op).toBe('in');
        expect(query.rvalue).toContain('you@yours.com');
        expect(query.rvalue).toHaveLength(1);
      });

      // All combinations:
      // 1. Mine + Teammates
      // 2. Unassigned + Mine
      // 3. Unassigned + Teammates
      // 4. Unassigned + Mine + Teammates
      describe('when a combination is checked', () => {
        test('mine and teammates', () => {
          filter = filter
            .updateIn(['assignments', 'mine'], () => true)
            .updateIn(['assignments', 'teammates'], () => true);
          searcher = prepareAssignmentFilter(searcher, filter, appSettings);
          const query = findQuery(searcher, 'values[Assigned Individual]');
          expect(query.op).toBe('in');
          expect(query.rvalue).toContain('me@mine.com');
          expect(query.rvalue).toContain('you@yours.com');
          expect(query.rvalue).toHaveLength(2);
        });

        test('unassigned and teammates', () => {
          filter = filter
            .updateIn(['assignments', 'unassigned'], () => true)
            .updateIn(['assignments', 'teammates'], () => true);
          searcher = prepareAssignmentFilter(searcher, filter, appSettings);
          const query = findQuery(searcher, 'values[Assigned Individual]');
          expect(query.op).toBe('in');
          expect(query.rvalue).toContain(null);
          expect(query.rvalue).toContain('you@yours.com');
          expect(query.rvalue).toHaveLength(2);
        });

        test('unassigned and mine', () => {
          filter = filter
            .updateIn(['assignments', 'unassigned'], () => true)
            .updateIn(['assignments', 'mine'], () => true);
          searcher = prepareAssignmentFilter(searcher, filter, appSettings);
          const query = findQuery(searcher, 'values[Assigned Individual]');
          expect(query.op).toBe('in');
          expect(query.rvalue).toContain(null);
          expect(query.rvalue).toContain('me@mine.com');
          expect(query.rvalue).toHaveLength(2);
        });

        test('unassigned, teammates, and mine', () => {
          filter = filter
            .updateIn(['assignments', 'unassigned'], () => true)
            .updateIn(['assignments', 'teammates'], () => true)
            .updateIn(['assignments', 'mine'], () => true);
          searcher = prepareAssignmentFilter(searcher, filter, appSettings);
          const query = findQuery(searcher, 'values[Assigned Individual]');
          expect(query.op).toBe('in');
          expect(query.rvalue).toContain(null);
          expect(query.rvalue).toContain('me@mine.com');
          expect(query.rvalue).toContain('you@yours.com');
          expect(query.rvalue).toHaveLength(3);
        });
      });
    });

    describe('#prepareDateRangeFilter', () => {
      test('when custom range', () => {
        const startDate = moment().subtract(7, 'days').toDate();
        const endDate = new Date();
        filter = filter
          .updateIn(['dateRange', 'custom'], () => true)
          .updateIn(['dateRange', 'timeline'], () => 'updatedAt')
          .updateIn(['dateRange', 'start'], () => startDate)
          .updateIn(['dateRange', 'end'], () => endDate);
        searcher = prepareDateRangeFilter(searcher, filter);
        expect(searcher.searchMeta.timeline).toBe('updatedAt');
        expect(searcher.searchMeta.start).toEqual(startDate.toISOString());
        expect(searcher.searchMeta.end).toEqual(endDate.toISOString());
      });

      describe('when using presents', () => {
        test('end date is automatically set', () => {
          filter = filter
            .updateIn(['dateRange', 'preset'], () => '7days');
          expect(searcher.searchMeta.end).toBeUndefined();
          searcher = prepareDateRangeFilter(searcher, filter);
          expect(searcher.searchMeta.end).toBeDefined();
        });
        test('timeline to be set', () => {
          filter = filter
            .updateIn(['dateRange', 'timeline'], () => 'closedAt')
            .updateIn(['dateRange', 'preset'], () => '7days');
          searcher = prepareDateRangeFilter(searcher, filter);
          expect(searcher.searchMeta.timeline).toBe('closedAt');
        });
        [
          { label: '7days', num: 7 },
          { label: '30days', num: 30 },
          { label: '60days', num: 60 },
          { label: '90days', num: 90 },
          { label: 'default/catchall', num: 7 }, // test the default.
        ].forEach(preset => {
          test(preset.label, () => {
            filter = filter
              .updateIn(['dateRange', 'preset'], () => preset.label);
            searcher = prepareDateRangeFilter(searcher, filter);
            expect(typeof searcher.searchMeta.start).toBe('string');
            const startDate = moment(searcher.searchMeta.start);
            const daysAgo = moment().subtract(preset.num, 'days');
            expect(startDate.isSame(daysAgo, 'day')).toBe(true);
          });
        });
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
          filter = filter.set('sortBy', 'createdAt').set('sortDir', 'ASC');

          const sorted = sortSubmissions(submissions, filter).map(s => s.id);
          expect(sorted).toEqual(['2', '3', '1']);
        });

        test('createdAt descending', () => {
          filter = filter.set('sortBy', 'createdAt').set('sortDir', 'DESC');

          const sorted = sortSubmissions(submissions, filter).map(s => s.id);
          expect(sorted).toEqual(['1', '3', '2']);
        });
      });

      describe('when sorting by values', () => {
        describe('when all submissions have the value', () => {
          test('scheduled value ascending', () => {
            filter = filter.set('sortBy', 'scheduled').set('sortDir', 'ASC');

            const sorted = sortSubmissions(submissions, filter).map(s => s.id);
            expect(sorted).toEqual(['3', '2', '1']);
          });

          test('scheduled value descending', () => {
            filter = filter.set('sortBy', 'scheduled').set('sortDir', 'DESC');

            const sorted = sortSubmissions(submissions, filter).map(s => s.id);
            expect(sorted).toEqual(['1', '2', '3']);
          });
        });
      });

      describe('when only some submissions have the value', () => {
        test('due value ascending', () => {
          filter = filter.set('sortBy', 'due').set('sortDir', 'ASC');

          const sorted = sortSubmissions(submissions, filter).map(s => s.id);
          expect(sorted).toEqual(['3', '1', '2']);
        });

        test('due value descending', () => {
          filter = filter.set('sortBy', 'due').set('sortDir', 'DESC');

          const sorted = sortSubmissions(submissions, filter).map(s => s.id);
          expect(sorted).toEqual(['2', '1', '3']);
        });
      });

      describe('when none of the submissions have the value', () => {
        test('sorts by createdAt', () => {
          filter = filter.set('sortBy', 'fake').set('sortDir', 'DESC');

          const sorted = sortSubmissions(submissions, filter).map(s => s.id);
          expect(sorted).toEqual(['1', '3', '2']);
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
      action = { payload: {} };
      appSettings = {};
      search = {};
      response = { submissions: [] };
    });

    describe('when there are server errors', () => {
      test('it sets the list status to indicate an error', () => {
        const saga = fetchCurrentFilterSaga(action);

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
        const saga = fetchCurrentFilterSaga(action);

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
      test('it sets the list status to indicate an error', () => {
        const saga = fetchCurrentFilterSaga(action);

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
          .toEqual(put(actions.setListItems(response.submissions)));
      });
    });
  });
});
