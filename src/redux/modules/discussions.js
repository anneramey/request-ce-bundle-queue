import { Record, List } from 'immutable';
import moment from 'moment';
import { namespace, withPayload, noPayload } from '../../utils';

export const types = {
  // API-based actions.
  JOIN_DISCUSSION: namespace('discussions', 'JOIN_DISCUSSION'),
  LEAVE_DISCUSSION: namespace('discussions', 'LEAVE_DISCUSSION'),
  FETCH_ISSUE: namespace('discussions', 'FETCH_ISSUE'),
  SET_ISSUE: namespace('discussions', 'SET_ISSUE'),
  FETCH_MORE_MESSAGES: namespace('discussions', 'FETCH_MORE_MESSAGES'),
  SET_MESSAGES: namespace('discussions', 'SET_MESSAGES'),
  SET_MORE_MESSAGES: namespace('discussions', 'SET_MORE_MESSAGES'),
  SET_HAS_MORE_MESSAGES: namespace('discussions', 'SET_HAS_MORE_MESSAGES'),
  SET_JOIN_ERROR: namespace('discussions', 'SET_JOIN_ERROR'),

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
  leaveDiscussion: noPayload(types.LEAVE_DISCUSSION),
  // API-bsased actions.
  fetchIssue: withPayload(types.FETCH_ISSUE),
  setIssue: withPayload(types.SET_ISSUE),
  loadMoreMessages: noPayload(types.FETCH_MORE_MESSAGES),
  setMessages: withPayload(types.SET_MESSAGES),
  setMoreMessages: withPayload(types.SET_MORE_MESSAGES),
  setHasMoreMessages: withPayload(types.SET_HAS_MORE_MESSAGES),
  setJoinError: withPayload(types.SET_JOIN_ERROR),

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
  messages: List(),
  badMessages: List(),
  messagesLoading: true,
  lastReceived: '2014-01-01',
  hasMoreMessages: true,
  issueLoading: false,
  loadingMoreMessages: false,
  joinError: '',
});

// Applies fn to each value in list, splitting it into a new list each time fn
// returns a different value.
export const partitionListBy = (fn, list) =>
  list.isEmpty()
    ? List()
    : list
        .rest()
        .reduce(
          (reduction, current) =>
            fn(reduction.last().last(), current)
              ? reduction.push(List([current]))
              : reduction.update(reduction.size - 1, list =>
                  list.push(current),
                ),
          List([List([list.first()])]),
        );

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

const getMessageDate = message =>
  moment(message.created_at).format('YYYY-MM-DD');
const differentDate = (m1, m2) => getMessageDate(m1) !== getMessageDate(m2);
const differentAuthor = (m1, m2) => m1.user.email !== m2.user.email;

export const formatMessages = messages =>
  partitionListBy(
    differentDate,
    messages.reverse().filterNot(isSystemMessage),
  ).map(dateList => partitionListBy(differentAuthor, dateList));

export const reducer = (state = State(), action) => {
  switch (action.type) {
    case types.JOIN_DISCUSSION:
      return state.set('issueGuid', action.payload);
    case types.LEAVE_DISCUSSION:
      return State();
    case types.FETCH_ISSUE:
      return state.set('issueLoading', true);
    case types.FETCH_MORE_MESSAGES:
      return state.set('loadingMoreMessages', true);
    case types.SET_ISSUE:
      return state.set('issue', action.payload).set('issueLoading', false);
    case types.SET_MESSAGES:
      return state
        .set('messagesLoading', false)
        .set('messages', List(action.payload))
        .set('lastReceived', new Date().toTimeString());
    case types.SET_MORE_MESSAGES:
      return state
        .set('messagesLoading', false)
        .set('loadingMoreMessages', false)
        .update('messages', messages => messages.concat(List(action.payload)))
        .set('lastReceived', new Date().toTimeString());
    case types.SET_HAS_MORE_MESSAGES:
      return state.set('hasMoreMessages', action.payload);
    case types.SET_JOIN_ERROR:
      return state.set('joinError', action.payload);
    case types.MESSAGE_UPDATE:
      return state;
    case types.MESSAGE_RX:
      return state
        .update('messages', messages => messages.unshift(action.payload))
        .set('lastReceived', new Date().toTimeString());
    case types.MESSAGE_BAD_RX:
      return state.update('badMessages', m => m.push(action.payload));
    default:
      return state;
  }
};
