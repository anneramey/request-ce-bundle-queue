import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { actions } from '../../redux/modules/discussions';

import { QueueItemDiscussions } from './QueueItemDiscussions';

const mapStateToProps = state => ({
  queueItem: state.queue.currentItem,
});

const mapDispatchToProps = {
  joinDiscussion: actions.joinDiscussion,
  stopConnection: actions.stopConnection,
};

export const QueueItemDiscussionsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      // this.props.joinDiscussion('1a69ce8b-d1ac-4528-bf4b-1ed3de1e66a3');
      this.props.joinDiscussion('c25c4375-9037-4012-809d-561d3b4d1b54');
    },
    componentWillUnmount() {
      this.props.stopConnection();
    },
  }),
)(QueueItemDiscussions);
