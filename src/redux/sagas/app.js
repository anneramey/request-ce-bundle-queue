import { takeEvery } from 'redux-saga';
import { all, call, put } from 'redux-saga/effects';
import { CoreAPI } from 'react-kinetic-core';

import { getAttributeValue } from '../../utils';

import { actions, types, DEFAULT_DOCUMENTATION_URL, DEFAULT_SUPPORT_URL } from '../modules/app';

// We'll implicitly believe teams to be assignable.
export const isAssignable = team => {
  if (!team.attributes) {
    return true;
  }

  // Fetch the assignable attribute and determine if it is false.
  const assignable = team.attributes.find(a => a.name === 'Assignable');
  if (assignable && assignable.values[0].toUpperCase() === 'FALSE') {
    return false;
  }

  return true;
};

// TODO decide on error handling for these calls.
export function* fetchAppSettingsSaga() {
  const {
    space: { space },
    kapp: { kapp },
    profile: { profile },
    forms: { forms },
  } = yield all({
    kapp: call(CoreAPI.fetchKapp, { include: 'attributes' }),
    space: call(CoreAPI.fetchSpace, { include: 'attributes' }),
    profile: call(CoreAPI.fetchProfile, {
      include: 'attributes,profileAttributes,memberships,memberships.team,memberships.team.attributes,memberships.team.memberships,memberships.team.memberships.user',
    }),
    forms: call(CoreAPI.fetchForms, {
      include: 'details,attributes',
    }),
  });

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

  const appSettings = {
    documentationUrl: getAttributeValue(
      'Documentation Url',
      DEFAULT_DOCUMENTATION_URL,
      kapp, space,
    )[0],
    supportUrl: getAttributeValue(
      'Support Url',
      DEFAULT_SUPPORT_URL,
      kapp, space,
    )[0],
    profile,
    myTeams,
    myTeammates,
    forms,
  };

  yield put(actions.setAppSettings(appSettings));
}

export function* watchApp() {
  yield takeEvery(types.LOAD_APP_SETTINGS, fetchAppSettingsSaga);
}
