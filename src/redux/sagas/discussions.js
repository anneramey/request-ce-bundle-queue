import { eventChannel, takeEvery } from 'redux-saga';

import { take, call, cancelled, put, race } from 'redux-saga/effects';
import axios from 'axios';

import { RESPONSE_BASE_PATH } from '../../index';

import { types, actions } from '../modules/discussions';


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

export function* watchDiscussionSocket() {
  // eslint-disable-next-line
  while(true) {
    const action = yield take(types.CONNECT);
    const guid = action.payload;
    const socket = new WebSocket(`ws://${RESPONSE_BASE_PATH}/${guid}/issue_socket`);
    const socketChannel = yield call(registerChannel, socket);

    const { cancel } = yield race({
      task: [
        call(incomingMessages, socketChannel),
        // call(outgoingMessages, socket),
      ],
      cancel: take(types.DISCONNECT),
    });

    if (cancel) {
      socketChannel.close();
    }
  }
}

const fetchIssue = guid =>
  axios.get(
    `http://${RESPONSE_BASE_PATH}/${guid}`,
    { withCredentials: true });

const fetchMessages = action => {
  const { guid, lastReceived } = action.payload;
  return axios.get(
    `http://${RESPONSE_BASE_PATH}/${guid}/messages`,
    {
      withCredentials: true,
      params: { last_received: lastReceived || '2014-01-01' },
    });
};

export function* fetchIssueSaga(action) {
  const { data } = yield call(fetchIssue, action.payload);
  if (data) {
    yield put(actions.setIssue(data));
  }
}

export function* fetchMessagesSaga(action) {
  const { data } = yield call(fetchMessages, action);

  if (data) {
    // Sort the fetched messages by updated_at, ascending.
    const sortedMessages = data.sort((a, b) => {
      const diff = new Date(a.updated_at) - new Date(b.updated_at);
      return diff;
    });
    yield put(actions.setMessages(sortedMessages));
  }
}

const sendMessage = action => {
  const { body, guid } = action.payload;
  return axios.post(
    `http://${RESPONSE_BASE_PATH}/${guid}/messages`,
    { body },
    { withCredentials: true },
  );
};

export function* sendMessageSaga(action) {
  yield call(sendMessage, action);
}

export function* watchDiscussion() {
  yield takeEvery(types.MESSAGE_TX, sendMessageSaga);
  yield takeEvery(types.FETCH_MESSAGES, fetchMessagesSaga);
  yield takeEvery(types.FETCH_ISSUE, fetchIssueSaga);
}
