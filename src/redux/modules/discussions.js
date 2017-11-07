import { Record, List } from 'immutable';
import moment from 'moment';
import { namespace, withPayload, noPayload } from '../../utils';

export const types = {
  // API-based actions.
  JOIN_DISCUSSION: namespace('discussions', 'JOIN_DISCUSSION'),
  LEAVE_DISCUSSION: namespace('discussions', 'LEAVE_DISCUSSION'),
  SET_ISSUE: namespace('discussions', 'SET_ISSUE'),
  CREATE_ISSUE: namespace('discussion', 'CREATE_ISSUE'),
  FETCH_INVITES: namespace('discussions', 'FETCH_INVITES'),
  CREATE_INVITE: namespace('discussions', 'CREATE_INVITE'),
  SET_INVITE_SENDING: namespace('discussions', 'SET_INVITE_SENDING'),
  ADD_INVITE: namespace('discussions', 'ADD_INVITE'),
  DELETE_INVITE: namespace('discussions', 'REMOVE_INVITE'),
  SET_INVITES: namespace('discussions', 'SET_INVITES'),
  REMOVE_INVITE: namespace('discussions', 'REMOVE_INVITE'),
  RESEND_INVITE: namespace('discussions', 'RESEND_INVITE'),
  FETCH_MORE_MESSAGES: namespace('discussions', 'FETCH_MORE_MESSAGES'),
  SET_MESSAGES: namespace('discussions', 'SET_MESSAGES'),
  SET_MORE_MESSAGES: namespace('discussions', 'SET_MORE_MESSAGES'),
  SET_HAS_MORE_MESSAGES: namespace('discussions', 'SET_HAS_MORE_MESSAGES'),
  SET_JOIN_ERROR: namespace('discussions', 'SET_JOIN_ERROR'),
  SET_PARTICIPANTS: namespace('discussions', 'SET_PARTICIPANTS'),
  ADD_PRESENCE: namespace('discissons', 'ADD_PRESENCE'),
  REMOVE_PRESENCE: namespace('discissons', 'REMOVE_PRESENCE'),
  ADD_PARTICIPANT: namespace('discussions', 'ADD_PARTICIPANT'),
  REMOVE_PARTICIPANT: namespace('discussions', 'REMOVE_PARTICIPANT'),

  // Socket-based actions.
  CONNECT: namespace('discussions', 'CONNECT'),
  DISCONNECT: namespace('discussions', 'DISCONNECT'),
  RECONNECT: namespace('discussions', 'RECONNECT'),
  SET_CONNECTED: namespace('discussions', 'SET_CONNECTED'),
  MESSAGE_RX: namespace('discussions', 'MESSAGE_RX'),
  MESSAGE_UPDATE: namespace('discussions', 'MESSAGE_UPDATE'),
  MESSAGE_TX: namespace('discussions', 'MESSAGE_TX'),
  MESSAGE_BAD_RX: namespace('discussions', 'MESSAGE_BAD_RX'),

  // Modal dialog state.
  OPEN_MODAL: namespace('discussions', 'OPEN_MODAL'),
  CLOSE_MODAL: namespace('discussions', 'CLOSE_MODAL'),
};

export const actions = {
  joinDiscussion: withPayload(types.JOIN_DISCUSSION),
  leaveDiscussion: noPayload(types.LEAVE_DISCUSSION),
  // API-bsased actions.
  setIssue: withPayload(types.SET_ISSUE),
  createIssue: (name, description = '', submission, onSuccess) => ({
    type: types.CREATE_ISSUE,
    payload: { name, description, submission, onSuccess },
  }),
  loadMoreMessages: noPayload(types.FETCH_MORE_MESSAGES),
  setMessages: withPayload(types.SET_MESSAGES),
  setMoreMessages: withPayload(types.SET_MORE_MESSAGES),
  setHasMoreMessages: withPayload(types.SET_HAS_MORE_MESSAGES),
  setJoinError: withPayload(types.SET_JOIN_ERROR),
  setParticipants: withPayload(types.SET_PARTICIPANTS),
  addPresence: withPayload(types.ADD_PRESENCE),
  removePresence: withPayload(types.REMOVE_PRESENCE),
  addParticipant: withPayload(types.ADD_PARTICIPANT),
  removeParticipant: withPayload(types.REMOVE_PARTICIPANT),

  // Invitation API calls
  fetchInvites: withPayload(types.FETCH_INVITES),
  createInvite: (guid, email, note) => ({
    type: types.CREATE_INVITE,
    payload: { guid, email, note },
  }),
  // API call to remove one.
  deleteInvite: (guid, inviteId) => ({
    type: types.REMOVE_INVITE,
    payload: { guid, inviteId },
  }),

  // Invitation data management.
  setInvites: withPayload(types.SET_INVITES),
  setInviteSending: withPayload(types.SET_INVITE_SENDING),
  addInvite: withPayload(types.ADD_INVITE),
  removeInvite: withPayload(types.REMOVE_INVITE),

  // Socket-based actions.
  startConnection: withPayload(types.CONNECT),
  stopConnection: noPayload(types.DISCONNECT),
  reconnect: noPayload(types.RECONNECT),
  setConnected: withPayload(types.SET_CONNECTED),
  receiveMessage: withPayload(types.MESSAGE_RX),
  updateMessage: withPayload(types.MESSAGE_UPDATE),
  receiveBadMessage: withPayload(types.MESSAGE_BAD_RX),
  sendMessage: withPayload(types.MESSAGE_TX),

  // Modal dialog state.
  openModal: withPayload(types.OPEN_MODAL),
  closeModal: withPayload(types.CLOSE_MODAL),
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
  connected: false,
  reconnecting: false,
  participants: List(),
  inviteSending: false,
  invites: List(),
  currentOpenModals: List(),
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
    case types.SET_PARTICIPANTS:
      return state.set('participants', List(action.payload));
    case types.ADD_PRESENCE:
      return state.update('participants', participants =>
        participants.update(
          participants.findIndex(p => p.guid === action.payload),
          p => ({ ...p, present: true }),
        ),
      );
    case types.REMOVE_PRESENCE:
      return state.update('participants', participants =>
        participants.update(
          participants.findIndex(p => p.guid === action.payload),
          p => ({ ...p, present: false }),
        ),
      );
    case types.ADD_PARTICIPANT:
      return state.update('participants', participants =>
        participants.push(action.payload),
      );
    case types.REMOVE_PARTICIPANT:
      return state.update('participants', participants =>
        participants.delete(
          participants.findIndex(p => p.guid === action.payload.guid),
        ),
      );
    case types.SET_INVITES:
      return state.set('invites', List(action.payload));
    case types.CREATE_INVITE:
      return state.set('inviteSending', true);
    case types.ADD_INVITE:
      return state.update('invites', invites => invites.push(action.payload));
    case types.REMOVE_INVITE:
      return state.update('invites', invites =>
        invites.delete(invites.findIndex(i => i.guid === action.payload.guid)),
      );
    case types.SET_INVITE_SENDING:
      return state.set('inviteSending', action.payload);
    case types.MESSAGE_UPDATE:
      return state;
    case types.MESSAGE_RX:
      return state
        .update('messages', messages => messages.unshift(action.payload))
        .set('lastReceived', new Date().toTimeString());
    case types.MESSAGE_BAD_RX:
      return state.update('badMessages', m => m.push(action.payload));
    case types.RECONNECT:
      return state.set('reconnecting', true).set('connected', false);
    case types.SET_CONNECTED:
      return state.set('connected', action.payload);
    case types.OPEN_MODAL:
      return state.update('currentOpenModals', list =>
        list.push(action.payload),
      );
    case types.CLOSE_MODAL:
      return action.payload
        ? state.update('currentOpenModals', list =>
            list.filter(item => item !== action.payload),
          )
        : state.delete('currentOpenModals');
      return state.delete('currentModal');
    default:
      return state;
  }
};
