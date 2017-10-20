import { Record, List, Map } from 'immutable';
import { namespace, withPayload, noPayload } from '../../utils';

export const types = {
  // API-based actions.
  JOIN_DISCUSSION: namespace('discussions', 'JOIN_DISCUSSION'),
  FETCH_ISSUE: namespace('discussions', 'FETCH_ISSUE'),
  SET_ISSUE: namespace('discussions', 'SET_ISSUE'),
  FETCH_MORE_MESSAGES: namespace('discussions', 'FETCH_MORE_MESSAGES'),
  SET_MESSAGES: namespace('discussions', 'SET_MESSAGES'),
  SET_MORE_MESSAGES: namespace('discussions', 'SET_MORE_MESSAGES'),

  // Socket-based actions.
  CONNECT: namespace('discussions', 'CONNECT'),
  DISCONNECT: namespace('discussions', 'DISCONNECT'),
  RECONNECT: namespace('discussions', 'RECONNECT'),
  MESSAGE_RX: namespace('discussions', 'MESSAGE_RX'),
  MESSAGE_UPDATE: namespace('discussions', 'MESSAGE_UPDATE'),
  MESSAGE_TX: namespace('discussions', 'MESSAGE_TX'),
  MESSAGE_BAD_RX: namespace('discussions', 'MESSAGE_BAD_RX'),
};

export const actions = {
  joinDiscussion: withPayload(types.JOIN_DISCUSSION),
  // API-bsased actions.
  fetchIssue: withPayload(types.FETCH_ISSUE),
  setIssue: withPayload(types.SET_ISSUE),
  loadMoreMessages: noPayload(types.FETCH_MORE_MESSAGES),
  setMessages: withPayload(types.SET_MESSAGES),
  setMoreMessages: withPayload(types.SET_MORE_MESSAGES),

  // Socket-based actions.
  startConnection: withPayload(types.CONNECT),
  stopConnection: noPayload(types.DISCONNECT),
  reconnect: noPayload(types.RECONNECT),
  receiveMessage: withPayload(types.MESSAGE_RX),
  updateMessage: withPayload(types.MESSAGE_UPDATE),
  receiveBadMessage: withPayload(types.MESSAGE_BAD_RX),
  sendMessage: withPayload(types.MESSAGE_TX),
};

/**
 * Selects all messages from the 'discussions' store.
 * @param {} state
 * @returns [] messages
 */
export const selectAllMessages = state => state.discussions.messages;
export const selectIssue = state => state.discussions.issue;
export const selectLoading = state =>
  state.discussions.messagesLoading || state.discussions.issueLoading;

export const State = Record({
  issueGuid: '',
  issue: {},
  messages: Map(),
  badMessages: List(),
  messagesLoading: false,
  lastReceived: '2014-01-01',
  messageCount: 0,
  issueLoading: false,
});

const isSystemMessage = message => {
  let isSystemMessage = message.type === 'SystemMessage';
  if (
    isSystemMessage &&
    message.messageable_type === 'Upload' &&
    message.messageable.status !== 'Deleted'
  ) {
    isSystemMessage = false;
  }
  return isSystemMessage;
};

const messageGroupKey = message => new Date(message.created_at).toDateString();

const messageSorter = (m1, m2) =>
  new Date(m1.updated_at) - new Date(m2.updated_at);
const sortMessages = messagesByDate => messagesByDate.sort(messageSorter);

const formatMessages = messages =>
  List(messages)
    .filterNot(isSystemMessage)
    .groupBy(messageGroupKey)
    .map(sortMessages);

const insertMessage = message => messages =>
  messages ? messages.push(message) : List([message]);

const replaceMessage = message => messages => {
  return messages
    .filterNot(m => message.id === m.id)
    .push(message)
    .sort(messageSorter);
};

export const reducer = (state = State(), action) => {
  switch (action.type) {
    case types.JOIN_DISCUSSION:
      return state.set('issueGuid', action.payload);
    case types.FETCH_ISSUE:
      return state.set('issueLoading', true);
    case types.SET_ISSUE:
      return state.set('issue', action.payload).set('issueLoading', false);
    case types.SET_MESSAGES:
      return state
        .set('messagesLoading', false)
        .set('messageCount', action.payload.length)
        .set('messages', formatMessages(action.payload))
        .set('lastReceived', new Date().toTimeString());
    case types.SET_MORE_MESSAGES:
      return state
        .update(
          'messageCount',
          messageCount => (messageCount += action.payload.length),
        )
        .update('messages', messages =>
          List(action.payload).reduce(
            (msgs, message) =>
              msgs.update(messageGroupKey(message), insertMessage(message)),
            messages,
          ),
        );
    case types.MESSAGE_UPDATE:
      return state.updateIn(
        ['messages', messageGroupKey(action.payload)],
        replaceMessage(action.payload),
      );
    case types.MESSAGE_RX:
      return state
        .update('messageCount', messageCount => (messageCount += 1))
        .updateIn(
          ['messages', messageGroupKey(action.payload)],
          insertMessage(action.payload),
        )
        .update('messages', messages => messages.map(sortMessages))
        .set('lastReceived', new Date().toTimeString());
    case types.MESSAGE_BAD_RX:
      return state.update('badMessages', m => m.push(action.payload));
    default:
      return state;
  }
};
