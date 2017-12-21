import { connect } from 'react-redux';
import {
  compose,
  lifecycle,
  withState,
  withHandlers,
  withProps,
} from 'recompose';
import { List } from 'immutable';

import { actions, formatMessages } from '../../redux/modules/discussions';
import { actions as notificationActions } from '../../redux/modules/errors';
import { actions as queueActions } from '../../redux/modules/queue';

import { QueueItemDiscussions } from './QueueItemDiscussions';

const mapStateToProps = state => {
  const discussionId = state.queue.currentItem
    ? state.queue.currentItem.values['Discussion Id']
    : null;

  const discussion =
    discussionId && state.discussions.discussions.get(discussionId);

  return {
    queueItem: state.queue.currentItem,
    // discussionGuid: discussionId,
    profile: state.app.profile,
    discussionId,
    discussion,
    messages: discussion ? discussion.messages : List(),
    hasMoreMessages: discussion && discussion.hasMoreMessages,
    loadingMoreMessages: discussion && discussion.loadingMoreMessages,
    currentOpenModals: state.discussions.currentOpenModals,
    invitationFields: state.discussions.invitationFields,
    invitationPending: state.discussions.invitationPending,
    isSmallLayout: state.layout.get('size') === 'small',
  };
};

const mapDispatchToProps = {
  setCurrentItem: queueActions.setCurrentItem,
  joinDiscussion: actions.joinDiscussion,
  leaveDiscussion: actions.leaveDiscussion,
  stopConnection: actions.stopConnection,
  fetchMoreMessages: actions.fetchMoreMessages,
  addWarn: notificationActions.addWarn,
  createDiscussion: actions.createIssue,
  openModal: actions.openModal,
  closeModal: actions.closeModal,
  createInvite: actions.createInvite,
  createInviteDone: actions.createInviteDone,
};

const closeCurrent = props => () => {
  props.closeModal(props.currentOpenModals.last());
  props.createInviteDone();
};
const closeAll = props => () => {
  props.closeModal();
  props.createInviteDone();
};

const createInvitation = props => () => {
  props.createInvite(
    props.discussion.issue.guid,
    props.invitationFields.get('email'),
    props.invitationFields.get('notes'),
  );
};

const handleScrollToTop = ({
  discussion,
  hasMoreMessages,
  loadingMoreMessages,
  fetchMoreMessages,
}) => () => {
  // If there are more messages to retrieve and a message fetch
  // is not currently in progress.
  if (hasMoreMessages && !loadingMoreMessages) {
    fetchMoreMessages(discussion.issue.guid);
  }
};

const handleScrollToBottom = props => () => {
  props.setUnreadMessages(false);
};

const handleScrollToMiddle = () => () => {
  console.log('scrolled to middle');
};

const handleScrolled = ({
  handleScrollToTop,
  handleScrollToMiddle,
  handleScrollToBottom,
  setScrollPosition,
}) => position => {
  setScrollPosition(position);
  switch (position) {
    case 'top':
      handleScrollToTop();
      break;
    case 'middle':
      handleScrollToMiddle();
      break;
    case 'bottom':
      handleScrollToBottom();
      break;
    default:
      console.error('Invalid scroll position from ScrollHelper!');
  }
};

const createDiscussion = props => () => {
  props.createDiscussion(
    props.queueItem.label || 'Queue Discussion',
    props.queueItem.values['Details'] || '',
    props.queueItem,
    (issue, submission) => {
      props.setCurrentItem(submission);
      props.joinDiscussion(issue.guid);
    },
  );
};

export const QueueItemDiscussionsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    invitationButtonEnabled:
      !props.invitationPending &&
      props.invitationFields.get('email') &&
      props.invitationFields.get('email') !== '' &&
      props.invitationFields.get('notes') &&
      props.invitationFields.get('notes') !== '',
  })),
  withState('formattedMessages', 'setFormattedMessages', List()),
  withState('unreadMessages', 'setUnreadMessages', false),
  withState('scrollPosition', 'setScrollPosition', 'bottom'),
  withHandlers(() => {
    let ref;
    return {
      registerScrollHelper: () => element => (ref = element),
      scrollToBottom: () => () => ref.scrollToBottom(),
    };
  }),
  withHandlers({
    createDiscussion,
    handleScrollToBottom,
    handleScrollToMiddle,
    handleScrollToTop,
    closeCurrent,
    closeAll,
    createInvitation,
  }),
  withHandlers({
    handleScrolled,
  }),
  lifecycle({
    componentWillMount() {
      this.props.setFormattedMessages(formatMessages(this.props.messages));
      if (this.props.discussionId) {
        this.props.joinDiscussion(this.props.discussionId);
      }
    },
    componentWillUnmount() {
      if (this.props.discussionId) {
        this.props.stopConnection(this.props.discussionId);
        this.props.leaveDiscussion(this.props.discussionId);
      }
    },
    componentWillReceiveProps(nextProps) {
      // Join a different discussion if the discussion ID has changed.
      if (this.props.discussionId !== nextProps.discussionId) {
        if (this.props.discussionId) {
          this.props.stopConnection(this.props.discussionId);
          this.props.leaveDiscussion(this.props.discussionId);
        }
        if (nextProps.discussionId) {
          this.props.joinDiscussion(nextProps.discussionId);
        }
      }
      // Process the messages if the contents have changed.
      if (!this.props.messages.equals(nextProps.messages)) {
        this.props.setFormattedMessages(formatMessages(nextProps.messages));
        if (
          this.props.scrollPosition !== 'bottom' &&
          nextProps.messages
            // get the messages that are newer than the messages we previously
            // had, we do not care about older messages being loaded above only
            // new messages below
            .slice(0, nextProps.messages.indexOf(this.props.messages.first()))
            // if any of the new messages were not sent by the current user we
            // consider them to be unread
            .some(message => message.user.email !== this.props.profile.email)
        ) {
          this.props.setUnreadMessages(true);
        }
      }
    },
  }),
)(QueueItemDiscussions);
