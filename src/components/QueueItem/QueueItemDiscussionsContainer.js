import { connect } from 'react-redux';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { List } from 'immutable';

import { actions, formatMessages } from '../../redux/modules/discussions';

import { QueueItemDiscussions } from './QueueItemDiscussions';

const mapStateToProps = state => ({
  queueItem: state.queue.currentItem,
  profile: state.app.profile,
  messages: state.discussions.messages,
});

const mapDispatchToProps = {
  joinDiscussion: actions.joinDiscussion,
  stopConnection: actions.stopConnection,
};

const handleScrollToTop = () => () => {
  console.log('scrolled to top!');
};

const handleScrollToBottom = () => () => {
  console.log('scrolled to bottom');
};

const handleScrollToMiddle = () => () => {
  console.log('scrolled to middle');
};

const handleScrolled = ({
  handleScrollToTop,
  handleScrollToMiddle,
  handleScrollToBottom,
}) => position => {
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

export const QueueItemDiscussionsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('formattedMessages', 'setFormattedMessages', List()),
  withHandlers({
    handleScrollToBottom,
    handleScrollToMiddle,
    handleScrollToTop,
  }),
  withHandlers({
    handleScrolled,
  }),
  lifecycle({
    componentWillMount() {
      this.props.setFormattedMessages(formatMessages(this.props.messages));
      // this.props.joinDiscussion('1a69ce8b-d1ac-4528-bf4b-1ed3de1e66a3');
      this.props.joinDiscussion('c25c4375-9037-4012-809d-561d3b4d1b54');
    },
    componentWillUnmount() {
      this.props.stopConnection();
    },
    componentWillReceiveProps(nextProps) {
      if (!this.props.messages.equals(nextProps.messages)) {
        this.props.setFormattedMessages(formatMessages(nextProps.messages));
      }
    },
  }),
)(QueueItemDiscussions);
