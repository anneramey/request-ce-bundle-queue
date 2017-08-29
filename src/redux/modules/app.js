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
});

export const VALID_STATUSES = List([
  'Open',
  'Pending',
  'Completed',
]);

export const isActiveStatus = status => status !== 'Completed';

export const Filter = Record({
  name: '',
  slug: '',

  // Filter sort order.
  sortBy: 'createdAt',
  sortDir: 'ASC',

  // Search Criteria.
  status: List([VALID_STATUSES.filter(isActiveStatus)]),
  assignment: List(),
  teams: List(),
});

export const State = Record({
  profile: Profile(),
  filters: List([
    Filter({
      name: 'Mine',
      slug: 'mine',
    }),
    Filter({
      name: 'Teammates',
      slug: 'teammates',
    }),
    Filter({
      name: 'Unassigned',
      slug: 'unassigned',
    }),
  ]),
  documentationUrl: DEFAULT_DOCUMENTATION_URL,
  supportUrl: DEFAULT_SUPPORT_URL,
  myTeams: List(),
  teams: List(),
  forms: List(),
  loading: true,
});

export const reducer = (state = State(), { type, payload }) => {
  switch (type) {
    case types.LOAD_APP_SETTINGS:
      return state.set('loading', true);
    case types.SET_APP_SETTINGS:
      return state
        .set('documentationUrl', payload.documentationUrl)
        .set('supportUrl', payload.supportUrl)
        .set('profile', payload.profile)
        .set('teams', payload.teams)
        .set('forms', payload.forms)
        .set('loading', false)
        // We're going to map all of the prefined filters to my teams and then
        // we're going to set the 'mine' filter to be for me.
        .update('filters', filters =>
          filters.map(
            f => f.set('teams', payload.myTeams.map(t => t.slug)),
          ).update(
            // Update the Mine filter to be for me.
            filters.findIndex(f => f.slug === 'mine'),
            f => f.set('assignment', List([payload.profile.username])),
          ),
        );
    default:
      return state;
  }
};
