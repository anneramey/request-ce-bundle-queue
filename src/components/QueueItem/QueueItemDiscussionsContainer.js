import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose';
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

export const QueueItemDiscussionsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('formattedMessages', 'setFormattedMessages', List()),
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
