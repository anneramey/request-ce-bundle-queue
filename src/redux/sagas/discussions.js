import { eventChannel, takeLatest } from 'redux-saga';
import {
  take,
  call,
  cancelled,
  put,
  race,
  all,
  select,
  takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';

import { types, actions } from '../modules/discussions';

export const RESPONSE_BASE_PATH =
  'localhost:3000/6607478/kinetic-response/api/v1/issues';
export const MESSAGE_LIMIT = 10;

// Supporting documentation:
// * https://medium.com/@ebakhtarov/bidirectional-websockets-with-redux-saga-bfd5b677c7e7
// * https://github.com/redux-saga/redux-saga/issues/51#issuecomment-230083283

// Register socket events to the Saga event channel.
function registerChannel(socket) {
  /* eslint-disable no-param-reassign */
  return eventChannel(emit => {
    socket.onopen = () => {
      window.console.log('Connected!');
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
        case 'reconnect':
          yield put(actions.reconnect());
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

// Turned this off because the Rails impl doesn't handle incoming messages.
// function* outgoingMessages(socket) {}
//   // eslint-disable-next-line
//   while (true) {
//     const action = yield take(types.MESSAGE_TX);
//     socket.send(JSON.stringify(actions.receiveMessage(action.payload)));
//   }
// }

const openWebSocket = guid =>
  new WebSocket(`ws://${RESPONSE_BASE_PATH}/${guid}/issue_socket`);

export function* watchDiscussionSocket() {
  // eslint-disable-next-line
  while (true) {
    const action = yield take(types.CONNECT);
    const guid = action.payload;
    let socket = openWebSocket(guid);
    let socketChannel = yield call(registerChannel, socket);

    const { cancel, reconnect } = yield race({
      task: [
        call(incomingMessages, socketChannel),
        // call(outgoingMessages, socket),
      ],
      reconnect: take(types.RECONNECT),
      cancel: take(types.DISCONNECT),
    });

    if (reconnect) {
      socket = openWebSocket(guid);
      socketChannel = yield call(registerChannel, socket);
    }
    if (cancel) {
      socketChannel.close();
    }
  }
}

const fetchIssue = guid =>
  axios
    .get(`http://${RESPONSE_BASE_PATH}/${guid}`, { withCredentials: true })
    .then(response => ({ issue: response.data }))
    .catch(response => ({ error: response }));

const fetchMessages = ({ guid, lastReceived, offset }) => {
  return axios
    .get(`http://${RESPONSE_BASE_PATH}/${guid}/messages`, {
      withCredentials: true,
      params: {
        last_received: lastReceived || '2014-01-01',
        limit: MESSAGE_LIMIT,
        offset: offset ? offset : 0,
      },
    })
    .then(response => ({ messages: response.data }))
    .catch(response => ({ error: response }));
};

export function* fetchIssueSaga(action) {
  const { data } = yield call(fetchIssue, action.payload);
  if (data) {
    yield put(actions.setIssue(data));
  }
}

export function* fetchMessagesTask(action) {
  const { data } = yield call(fetchMessages, action);

  if (data) {
    yield put(actions.setMessages(data));
  }
}

const selectFetchMessageSettings = state => ({
  guid: state.discussions.issueGuid,
  offset: state.discussions.messageCount,
  lastReceived: state.discussions.lastReceived,
});

export function* fetchMoreMessagesTask(action) {
  console.log('fetching more messages');
  const params = yield select(selectFetchMessageSettings);
  const { messages } = yield call(fetchMessages, {
    ...params,
    lastReceived: '',
  });

  if (messages) {
    yield put(actions.setMoreMessages(messages));
  }
}

const sendMessage = params => {
  const { body, guid } = params;
  return axios.post(
    `http://${RESPONSE_BASE_PATH}/${guid}/messages`,
    { body },
    { withCredentials: true },
  );
};

export function* sendMessageTask(action) {
  const guid = yield select(state => state.discussions.issueGuid);
  yield call(sendMessage, { guid, body: action.payload });
}

export function* joinDiscussionTask(action) {
  const params = yield select(selectFetchMessageSettings);
  const {
    issue: { issue, error: issueError },
    messages: { messages, error: messagesError },
  } = yield all({
    issue: call(fetchIssue, params.guid),
    messages: call(fetchMessages, params),
  });

  if (issueError || messagesError) {
    window.console.log('there was a problem fetching the issue and messages');
  } else {
    yield all([
      put(actions.setIssue(issue)),
      put(actions.setMessages(messages)),
      put(actions.startConnection(params.guid)),
    ]);
  }
}

export function* watchDiscussion() {
  yield takeEvery(types.MESSAGE_TX, sendMessageTask);
  yield takeEvery(types.FETCH_MORE_MESSAGES, fetchMoreMessagesTask);
  yield takeEvery(types.FETCH_ISSUE, fetchIssueSaga);
  yield takeLatest(types.JOIN_DISCUSSION, joinDiscussionTask);
}
