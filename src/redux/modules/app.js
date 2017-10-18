import { Record, List, Set } from 'immutable';
import { matchPath } from 'react-router-dom';
import { namespace, noPayload, withPayload } from '../../utils';
import { Profile, Filter, AssignmentCriteria } from '../../records';

export const DEFAULT_DOCUMENTATION_URL = 'https://kinops.io/docs';
export const DEFAULT_SUPPORT_URL = 'https://kinops.io/support';

export const types = {
  LOAD_APP_SETTINGS: namespace('app', 'LOAD_APP_SETTINGS'),
  SET_APP_SETTINGS: namespace('app', 'SET_APP_SETTINGS'),
  ADD_PERSONAL_FILTER: namespace('app', 'ADD_PERSONAL_FILTER'),
  REMOVE_PERSONAL_FILTER: namespace('app', 'REMOVE_PERSONAL_FILTER'),
};

export const actions = {
  loadAppSettings: noPayload(types.LOAD_APP_SETTINGS),
  setAppSettings: withPayload(types.SET_APP_SETTINGS),
  addPersonalFilter: withPayload(types.ADD_PERSONAL_FILTER),
  removePersonalFilter: withPayload(types.REMOVE_PERSONAL_FILTER),
};

export const getFilterByPath = (state, pathname) => {
  const findByName = name => filter => filter.name === name;
  const adhocMatch = matchPath(pathname, { path: '/custom', exact: true });
  const listMatch = matchPath(pathname, { path: '/:type/:name', exact: true });
  if (adhocMatch) {
    return state.queue.adhocFilter;
  } else if (listMatch) {
    if (listMatch.params.type === 'list') {
      return state.app.filters.find(findByName(listMatch.params.name));
    } else if (listMatch.params.type === 'custom') {
      return state.app.myFilters.find(findByName(listMatch.params.name));
    }
  }
};

export const selectMyTeamForms = state =>
  state.app.forms.filter(f => {
    const owningTeam = f.attributes['Owning Team'];
    return owningTeam
      ? state.app.myTeams
          .map(t => t.name)
          .toSet()
          .intersect(new Set(owningTeam)).size > 0
      : true;
  });

export const selectAssignments = state =>
  state.app.allTeams
    .flatMap(t =>
      t.memberships.map(m => {
        const user = m.user;
        user.team = t.name;
        return user;
      }),
    )
    .concat(
      state.app.allTeams.map(t => ({
        username: null,
        displayName: 'Unassigned',
        team: t.name,
      })),
    );

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
      assignments: AssignmentCriteria({
        mine: true,
      }),
    }),
    Filter({
      name: 'Teammates',
      assignments: AssignmentCriteria({
        teammates: true,
      }),
    }),
    Filter({
      name: 'Unassigned',
      assignments: AssignmentCriteria({
        unassigned: true,
      }),
    }),
  ]),
  documentationUrl: DEFAULT_DOCUMENTATION_URL,
  supportUrl: DEFAULT_SUPPORT_URL,
  allTeams: List(),
  myTeams: List(),
  myTeammates: List(),
  myFilters: List(),
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
        .set('allTeams', List(payload.allTeams))
        .set('myTeams', List(payload.myTeams))
        .set('myTeammates', payload.myTeammates)
        .set('myFilters', payload.myFilters)
        .set('forms', payload.forms)
        .set('loading', false);
    case types.ADD_PERSONAL_FILTER:
      return state.update('myFilters', filters => filters.push(payload));
    case types.REMOVE_PERSONAL_FILTER:
      return state.update(
        'myFilters',
        filters => filters.name === filters.payload,
      );
    default:
      return state;
  }
};
