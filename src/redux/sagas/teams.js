import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CoreAPI } from 'react-kinetic-core';

import { actions as allActions, types as allTypes } from '../modules/teams';
import { actions as currentActions, types as currentTypes } from '../modules/team';
import { actions as errorActions } from '../modules/errors';

export function* fetchTeamsSaga() {
  const { teams, errors, serverError } = yield call(CoreAPI.fetchTeams, {
    include: 'memberships,attributes',
    xlatAttributes: true,
  });

  if (serverError) {
    yield put(errorActions.setSystemError(serverError));
    yield put(push('/system-error'));
  } else if (errors) {
    yield put(allActions.setTeamsErrors(errors));
  } else {
    yield put(allActions.setTeams(teams));
  }
}

export function* fetchTeamSaga(action) {
  const response = yield call(CoreAPI.fetchTeam, {
    teamSlug: action.payload,
    include: 'memberships,attributes',
    xlatAttributes: true,
  });
  const { team, errors, serverError } = response;

  if (serverError) {
    yield put(errorActions.setSystemError(serverError));
    yield put(push('/system-error'));
  } else if (errors) {
    yield put(currentActions.setTeamErrors(errors));
  } else {
    yield put(currentActions.setTeam(team));
  }
}

export function* updateTeamSaga(action) {
  const { team, errors, serverError } = yield call(CoreAPI.updateTeam, {
    teamSlug: action.payload.teamSlug,
    team: action.payload.team,
  });

  if (serverError) {
    yield put(errorActions.setSystemError(serverError));
    yield put(push('/system-error'));
  } else if (errors) {
    yield put(currentActions.setTeamErrors(errors));
  } else {
    yield put(currentActions.setTeam(team));
  }
}

export function* createTeamSaga(action) {
  const { team, errors, serverError } = yield call(CoreAPI.createTeam, {
    team: action.payload,
  });

  if (serverError) {
    yield put(errorActions.setSystemError(serverError));
    yield put(push('/system-error'));
  } else if (errors) {
    yield put(currentActions.setTeamErrors(errors));
  } else {
    yield put(currentActions.setTeam(team));
    yield put(allActions.addTeam(team));
    yield put(push(`/teams/${team.slug}`));
  }
}

export function* deleteTeamSaga(action) {
  const teamSlug = action.payload;
  const { errors, serverError } = yield call(CoreAPI.deleteTeam, {
    teamSlug,
  });

  if (serverError) {
    yield put(errorActions.setSystemError(serverError));
    yield put(push('/system-error'));
  } else if (errors) {
    yield put(currentActions.setTeamErrors(errors));
  } else {
    yield put(allActions.removeTeam(teamSlug));
    yield put(push('/teams'));
  }
}


export function* watchTeams() {
  yield takeEvery(allTypes.FETCH_TEAMS, fetchTeamsSaga);
  yield takeEvery(currentTypes.FETCH_TEAM, fetchTeamSaga);
  yield takeEvery(currentTypes.UPDATE_TEAM, updateTeamSaga);
  yield takeEvery(currentTypes.CREATE_TEAM, createTeamSaga);
  yield takeEvery(currentTypes.DELETE_TEAM, deleteTeamSaga);
}
