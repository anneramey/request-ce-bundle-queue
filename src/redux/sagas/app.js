import { takeEvery } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { List } from 'immutable';
import { CoreAPI } from 'react-kinetic-core';

import { getAttributeValue } from '../../utils';

import {
  actions,
  types,
  DEFAULT_DOCUMENTATION_URL,
  DEFAULT_SUPPORT_URL,
  defaultDiscussionServerUrl,
} from '../modules/app';

export const selectPersonalFilters = ({ app }) => app.myFilters;
export const selectProfile = ({ app }) => app.profile;

// We'll implicitly believe teams to be assignable.
export const isAssignable = team => {
  if (!team.attributes) {
    return true;
  }

  // Fetch the assignable attribute and determine if it is false.
  if (team.attributes instanceof Array) {
    // When we're dealing with sub-elements they're not "translated" for us.
    const assignable = team.attributes.find(a => a.name === 'Assignable');
    if (assignable && assignable.values[0].toUpperCase() === 'FALSE') {
      return false;
    }
  } else if (
    team.attributes.Assignable &&
    team.attributes.Assignable[0].toUpperCase() === 'FALSE'
  ) {
    return false;
  }

  return true;
};

// TODO decide on error handling for these calls.
export function* fetchAppSettingsTask() {
  const {
    space: { space },
    kapp: { kapp },
    profile: { profile },
    forms: { forms },
    teams: { teams },
  } = yield all({
    kapp: call(CoreAPI.fetchKapp, { include: 'attributes' }),
    space: call(CoreAPI.fetchSpace, { include: 'attributes' }),
    profile: call(CoreAPI.fetchProfile, {
      include:
        'attributes,profileAttributes,memberships,memberships.team,memberships.team.attributes,memberships.team.memberships,memberships.team.memberships.user',
    }),
    forms: call(CoreAPI.fetchForms, {
      include: 'details,attributes',
    }),
    teams: call(CoreAPI.fetchTeams, {
      include:
        'details,attributes,memberships.memberships.user,memberships.user.details',
    }),
  });

  const allTeams = teams.filter(isAssignable);
  const myTeams = profile.memberships
    .map(membership => membership.team)
    .filter(isAssignable);
  const myTeammates = myTeams
    // Get all of the users from all of the teams.
    .flatMap(t => t.memberships)
    // Clean up the odd 'memberships' wrapper on user.
    .map(u => u.user)
    // Ditch any of those users that are me.
    .filter(u => u.username !== profile.username);
  const myFilters = profile.profileAttributes['Queue Personal Filters']
    ? profile.profileAttributes['Queue Personal Filters'].map(f => f)
    : List();

  const appSettings = {
    documentationUrl: getAttributeValue(
      'Documentation Url',
      DEFAULT_DOCUMENTATION_URL,
      kapp,
      space,
    )[0],
    supportUrl: getAttributeValue(
      'Support Url',
      DEFAULT_SUPPORT_URL,
      kapp,
      space,
    )[0],
    discussionServerUrl: getAttributeValue(
      'Discussion Server Url',
      defaultDiscussionServerUrl(space.slug),
      kapp,
      space,
    )[0],
    profile,
    myTeams,
    myTeammates,
    myFilters,
    forms,
    allTeams,
  };

  yield put(actions.setAppSettings(appSettings));
}

export function* updatePersonalFilterTask() {
  const myFilters = yield select(selectPersonalFilters);
  const profile = yield select(selectProfile);

  profile.profileAttributes['Queue Personal Filters'] = myFilters.toJS();

  const { profile: newProfile, serverError } = yield call(
    CoreAPI.updateProfile,
    { profile },
  );
  if (!serverError) {
    const newFilters = newProfile.profileAttributes['Queue Personal Filters']
      ? newProfile.profileAttributes['Queue Personal Filters'].values.map(
          f => f,
        )
      : List();
    window.console.log(newFilters);
  }
}

export function* watchApp() {
  yield takeEvery(types.LOAD_APP_SETTINGS, fetchAppSettingsTask);
  yield takeLatest(
    [types.ADD_PERSONAL_FILTER, types.REMOVE_PERSONAL_FILTER],
    updatePersonalFilterTask,
  );
}
