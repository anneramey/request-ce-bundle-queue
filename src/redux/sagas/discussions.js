import { eventChannel, delay } from 'redux-saga';
import {
  take,
  call,
  cancelled,
  put,
  race,
  all,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';
import { CoreAPI } from 'react-kinetic-core';

import { SUBMISSION_INCLUDES } from './queue';
import { actions as errorActions } from '../modules/errors';
import { types, actions } from '../modules/discussions';

export const MESSAGE_LIMIT = 25;

// Supporting documentation:
// * https://medium.com/@ebakhtarov/bidirectional-websockets-with-redux-saga-bfd5b677c7e7
// * https://github.com/redux-saga/redux-saga/issues/51#issuecomment-230083283

// Register socket events to the Saga event channel.
function registerChannel(socket) {
  /* eslint-disable no-param-reassign */
  return eventChannel(emit => {
    socket.onopen = () => {
      window.console.log('Connected!');
      emit({ action: 'connected' });
    };

    socket.onerror = event => {
      window.console.log('there was a socket error', event);
    };

    socket.onmessage = event => {
      const msg = JSON.parse(event.data);
      emit(msg);
    };

    socket.onclose = event => {
      window.console.log('socket closed!', event);
      emit({ action: 'reconnect' });
    };

    return () => {
      socket.close();
    };
  });
}

function* incomingMessages(socketChannel) {
  try {
    // eslint-disable-next-line
    while (true) {
      const data = yield take(socketChannel);
      switch (data.action) {
        case 'message:create':
          yield put(actions.receiveMessage(data.message));
          break;
        case 'message:update':
          yield put(actions.updateMessage(data.message));
          break;
        case 'presence:add':
          yield put(actions.addPresence(data.user));
          break;
        case 'presence:remove':
          yield put(actions.removePresence(data.user));
          break;
        case 'participant:create':
          yield put(actions.addParticipant(data.participant));
          break;
        case 'participant:delete':
          yield put(actions.removeParticipant(data.participant));
          break;
        case 'invite:create':
          yield put(actions.addInvite(data.invite));
          break;
        case 'invite:delete':
          yield put(actions.removeInvite(data.invite));
          break;
        case 'reconnect':
          yield put(actions.reconnect());
          break;
        case 'connected':
          yield put(actions.setConnected(true));
          break;
        default:
          yield put(actions.receiveBadMessage(data));
      }
    }
  } finally {
    if (yield cancelled()) {
      socketChannel.close();
    }
  }
}

const touchIssuePresence = (guid, responseUrl) =>
  axios.request({
    url: `${responseUrl}/api/v1/issues/${guid}/present`,
    withCredentials: true,
  });

function* presenceKeepAlive(guid, responseUrl) {
  while (true) {
    yield call(touchIssuePresence, guid, responseUrl);
    yield delay(3000);
  }
}
// Turned this off because the Rails impl doesn't handle incoming messages.
// function* outgoingMessages(socket) {}
//   // eslint-disable-next-line
//   while (true) {
//     const action = yield take(types.MESSAGE_TX);
//     socket.send(JSON.stringify(actions.receiveMessage(action.payload)));
//   }
// }

const openWebSocket = (guid, responseUrl) =>
  new WebSocket(
    `${window.location.protocol === 'http:' ? 'ws' : 'wss'}://${window.location
      .host}${responseUrl}/api/v1/issues/${guid}/issue_socket`,
  );

export function* watchDiscussionSocket() {
  // eslint-disable-next-line
  while (true) {
    const action = yield take(types.CONNECT);
    const responseUrl = yield select(state => state.app.discussionServerUrl);
    const guid = action.payload;
    let socket = openWebSocket(guid, responseUrl);
    let socketChannel = yield call(registerChannel, socket);

    const { cancel, reconnect } = yield race({
      task: [
        call(incomingMessages, socketChannel),
        call(presenceKeepAlive, guid, responseUrl),
        // call(outgoingMessages, socket),
      ],
      reconnect: take(types.RECONNECT),
      cancel: take(types.DISCONNECT),
    });

    if (reconnect) {
      socket = openWebSocket(guid, responseUrl);
      socketChannel = yield call(registerChannel, socket);
    }
    if (cancel) {
      socketChannel.close();
    }
  }
}

const fetchIssue = (guid, responseUrl) =>
  axios
    .get(`${responseUrl}/api/v1/issues/${guid}`, { withCredentials: true })
    .then(response => ({ issue: response.data }))
    .catch(response => ({ error: response }));

const createIssue = (issue, responseUrl) =>
  axios
    .post(`${responseUrl}/api/v1/issues`, issue, { withCredentials: true })
    .then(response => ({ issue: response.data }))
    .catch(response => ({ error: response }));

const fetchInvites = (guid, responseUrl) =>
  axios
    .request({
      url: `${responseUrl}/api/v1/issues/${guid}/invites`,
      method: 'get',
      withCredentials: true,
    })
    .then(response => ({ invites: response.data }))
    .catch(response => ({ error: response }));

const createInvite = (guid, email, note, responseUrl) =>
  axios
    .request({
      url: `${responseUrl}/api/v1/issues/${guid}/invites`,
      method: 'post',
      withCredentials: true,
      data: { email, note, group_invite: false },
    })
    .then(response => ({ invite: response.data }))
    .catch(response => ({ error: response }));

const resendInvite = (guid, inviteId, note, responseUrl) =>
  axios
    .request({
      url: `${responseUrl}/api/v1/issues/${guid}/invites/${inviteId}`,
      method: 'post',
      withCredentials: true,
    })
    .then(response => ({ invite: response.data }))
    .catch(response => ({ error: response }));

const removeInvite = (guid, inviteId, note, responseUrl) =>
  axios
    .request({
      url: `${responseUrl}/api/v1/issues/${guid}/invites/${inviteId}`,
      method: 'delete',
      withCredentials: true,
    })
    .then(response => ({ invite: response.data }))
    .catch(response => ({ error: response }));

export function* createInviteTask({ payload }) {
  const { errors } = yield call(
    createInvite,
    payload.guid,
    payload.email,
    payload.note,
  );

  if (errors) {
    yield put(errorActions.addError('Failed to create invitation!'));
  }
}

const updateSubmissionDiscussionId = ({ id, guid }) =>
  CoreAPI.updateSubmission({
    id,
    values: { 'Discussion Id': guid },
    include: SUBMISSION_INCLUDES,
  });

// Step 1: Fetch the settings (response server URL)
// Step 2: Call the API to create the issue.
// Step 3: If a submission is provided, update its "Discussion Id"
export function* createIssueTask({ payload }) {
  const responseUrl = yield select(state => state.app.discussionServerUrl);
  const { name, description, submission, onSuccess } = payload;
  const { issue, error } = yield call(
    createIssue,
    { name, description },
    responseUrl,
  );

  if (error) {
    // yield a toast
  } else {
    let error;
    let updatedSubmission;

    // In a successful scenario we should toast a success, join the discussion
    // and if a submission was passed we should update its "Discussion Id" value.
    if (submission) {
      const response = yield call(updateSubmissionDiscussionId, {
        id: submission.id,
        guid: issue.guid,
      });

      error = response.serverError;
      updatedSubmission = response.submission;
    }

    if (!error && typeof onSuccess === 'function') {
      onSuccess(issue, updatedSubmission);
    }
  }
}

const fetchParticipants = (guid, responseUrl) =>
  axios
    .request({
      url: `${responseUrl}/api/v1/issues/${guid}/participants`,
      withCredentials: true,
    })
    .then(response => ({ participants: response.data }))
    .catch(response => ({ error: response }));

const fetchMessages = ({ guid, lastReceived, offset, responseUrl }) =>
  axios
    .get(`${responseUrl}/api/v1/issues/${guid}/messages`, {
      withCredentials: true,
      params: {
        last_received: lastReceived || '2014-01-01',
        limit: MESSAGE_LIMIT,
        offset: offset ? offset : 0,
      },
    })
    .then(response => ({ messages: response.data }))
    .catch(response => ({ error: response }));

const selectFetchMessageSettings = state => ({
  guid: state.discussions.issueGuid,
  offset: state.discussions.messages.size,
  lastReceived: state.discussions.lastReceived,
  responseUrl: state.app.discussionServerUrl,
});

export function* fetchMoreMessagesTask(action) {
  const params = yield select(selectFetchMessageSettings);
  const { messages } = yield call(fetchMessages, {
    ...params,
    lastReceived: '',
  });

  if (messages) {
    yield all([
      put(actions.setHasMoreMessages(messages.length === MESSAGE_LIMIT)),
      put(actions.setMoreMessages(messages)),
    ]);
  }
}

const sendMessage = params => {
  const { body, guid, responseUrl } = params;
  return axios.post(
    `${responseUrl}/api/v1/issues/${guid}/messages`,
    { body },
    { withCredentials: true },
  );
};

export function* sendMessageTask(action) {
  const { guid, responseUrl } = yield select(state => ({
    guid: state.discussions.issueGuid,
    responseUrl: state.app.discussionServerUrl,
  }));
  yield call(sendMessage, { guid, responseUrl, body: action.payload });
}

export const fetchResponseProfile = responseUrl =>
  axios
    .get(`${responseUrl}/api/v1/me`, { withCredentials: true })
    .then(response => ({ profile: response.data }))
    .catch(response => ({ error: response }));

export const getResponseAuthentication = responseUrl =>
  axios
    .get(`${responseUrl}/users/auth/kinetic_core`, {
      withCredentials: true,
    })
    .then(response => ({ profile: response.data }))
    .catch(response => ({ error: response }));

export function* joinDiscussionTask(action) {
  const responseUrl = yield select(state => state.app.discussionServerUrl);
  // First we need to determine if the user is authenticated in Response.
  const { error } = yield call(fetchResponseProfile, responseUrl);
  if (error) {
    yield call(getResponseAuthentication, responseUrl);
  }

  const params = yield select(selectFetchMessageSettings);

  const {
    issue: { issue, error: issueError },
    messages: { messages, error: messagesError },
    participants: { participants, error: participantsError },
    invites: { invites, error: invitesErrors },
  } = yield all({
    issue: call(fetchIssue, params.guid, responseUrl),
    participants: call(fetchParticipants, params.guid, responseUrl),
    invites: call(fetchInvites, params.guid, responseUrl),
    messages: call(fetchMessages, params),
  });

  if (issueError || messagesError || participantsError || invitesErrors) {
    window.console.log('there was a problem fetching the issue and messages');
  } else {
    yield all([
      put(actions.setIssue(issue)),
      put(actions.setMessages(messages)),
      put(actions.setHasMoreMessages(messages.length === MESSAGE_LIMIT)),
      put(actions.setParticipants(participants)),
      put(actions.startConnection(params.guid)),
    ]);
  }
}

export function* watchDiscussion() {
  yield all([
    takeEvery(types.MESSAGE_TX, sendMessageTask),
    takeEvery(types.FETCH_MORE_MESSAGES, fetchMoreMessagesTask),
    takeLatest(types.JOIN_DISCUSSION, joinDiscussionTask),
    takeLatest(types.CREATE_ISSUE, createIssueTask),
    takeEvery(types.CREATE_INVITE, createInviteTask),
  ]);
}
