import { Record, List } from 'immutable';
import { namespace, noPayload, withPayload } from '../../utils';

export const DEFAULT_DOCUMENTATION_URL = 'https://kinops.io/docs';
export const DEFAULT_SUPPORT_URL = 'https://kinops.io/support';

export const types = {
  LOAD_APP_SETTINGS: namespace('app', 'LOAD_APP_SETTINGS'),
  SET_APP_SETTINGS: namespace('app', 'SET_APP_SETTINGS'),
};

export const actions = {
  loadAppSettings: noPayload(types.LOAD_APP_SETTINGS),
  setAppSettings: withPayload(types.SET_APP_SETTINGS),
};

export const Profile = Record({
  displayName: '',
  username: '',
  email: '',
});

export const VALID_STATUSES = List([
  'Open',
  'Pending',
  'Canceled',
  'Completed',
]);

export const isActiveStatus = status => status !== 'Completed' && status !== 'Canceled';

export const AssignmentCriteria = Record({
  mine: false,
  teammates: false,
  unassigned: false,
  byIndividuals: false,
  individuals: List(),
});

export const DateRangeCriteria = Record({
  // createdAt, updatedAt, closedAt
  timeline: 'createdAt',
  // 7days, 30days, 60days, 90days
  preset: '',
  custom: false,
  start: new Date(),
  end: new Date(),
});

export const Filter = Record({
  name: '',
  slug: '',

  // Filter sort order: createdAt, updatedAt, Due Date.
  sortBy: 'createdAt',
  sortDir: 'ASC',

  // Search Criteria.
  status: VALID_STATUSES.filter(isActiveStatus),
  teams: List(),
  assignments: AssignmentCriteria(),
  dateRange: DateRangeCriteria(),
});

/*
 *
 * Mine (only assigned to me)
 * Teammates (members of all of my teams except me)
 * Unassigned (assigned to one of my teams but not to an individual)
 */

export const State = Record({
  profile: Profile(),
  filters: List([
    Filter({
      name: 'Mine',
      slug: 'mine',
      assignments: AssignmentCriteria({
        mine: true,
      }),
    }),
    Filter({
      name: 'Teammates',
      slug: 'teammates',
      assignments: AssignmentCriteria({
        teammates: true,
      }),
    }),
    Filter({
      name: 'Unassigned',
      slug: 'unassigned',
      assignments: AssignmentCriteria({
        unassigned: true,
      }),
    }),
  ]),
  documentationUrl: DEFAULT_DOCUMENTATION_URL,
  supportUrl: DEFAULT_SUPPORT_URL,
  myTeams: List(),
  myTeammates: List(),
  forms: List(),
  loading: true,
});

export const reducer = (state = State(), { type, payload }) => {
  switch (type) {
    case types.SET_APP_SETTINGS:
      return state
        .set('documentationUrl', payload.documentationUrl)
        .set('supportUrl', payload.supportUrl)
        .set('profile', payload.profile)
        .set('myTeams', List(payload.myTeams))
        .set('myTeammates', payload.myTeammates)
        .set('forms', payload.forms)
        .set('loading', false);
    default:
      return state;
  }
};
