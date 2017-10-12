import { Record, List } from 'immutable';
import { namespace, withPayload } from '../../utils';

export const types = {
  // API-based actions.
  FETCH_ISSUE: namespace('discussions', 'FETCH_ISSUE'),
  SET_ISSUE: namespace('discussions', 'SET_ISSUE'),
  FETCH_MESSAGES: namespace('discussions', 'FETCH_MESSAGES'),
  SET_MESSAGES: namespace('discussions', 'SET_MESSAGES'),

  // Socket-based actions.
  CONNECT: namespace('discussions/socket/CONNECT'),
  DISCONNECT: namespace('discussions', 'DISCONNECT'),
  MESSAGE_RX: namespace('discussions', 'MESSAGE_RX'),
  MESSAGE_TX: namespace('discussions', 'MESSAGE_TX'),
  MESSAGE_BAD_RX: namespace('discussions', 'MESSAGE_BAD_RX'),
};

export const actions = {
  // API-bsased actions.
  fetchIssue: guid => ({ type: types.FETCH_ISSUE, payload: guid }),
  setIssue: issue => ({ type: types.SET_ISSUE, payload: issue }),
  fetchMessages: (guid, lastReceived = '2014-01-01') => ({
    type: types.FETCH_MESSAGES,
    payload: { guid, lastReceived },
  }),
  setMessages: messages => ({ type: types.SET_MESSAGES, payload: messages }),

  // Socket-based actions.
  startConnection: guid => ({ type: types.CONNECT, payload: guid }),
  stopConnection: () => ({ type: types.DISCONNECT }),
  receiveMessage: message => ({ type: types.MESSAGE_RX, payload: message }),
  receiveBadMessage: message => ({
    type: types.MESSAGE_BAD_RX,
    payload: message,
  }),
  sendMessage: (body, guid) => ({
    type: types.MESSAGE_TX,
    payload: { body, guid },
  }),
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
  issue: {},
  messages: List(),
  badMessages: List(),
  messagesLoading: false,
  issueLoading: false,
});

export default function(state = State(), action) {
  switch (action.type) {
    case types.FETCH_ISSUE:
      return { ...state, issueLoading: true };
    case types.SET_ISSUE:
      return { ...state, issue: action.payload, issueLoading: false };
    case types.FETCH_MESSAGES:
      return { ...state, messagesLoading: true };
    case types.SET_MESSAGES:
      return { ...state, messages: action.payload, messagesLoading: false };
    case types.MESSAGE_RX:
      return { ...state, messages: [...state.messages, action.payload] };
    case types.MESSAGE_BAD_RX:
      return { ...state, badMessages: [...state.badMessages, action.payload] };
    default:
      return state;
  }
}
