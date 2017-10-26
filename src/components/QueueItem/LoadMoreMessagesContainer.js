import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const LoadMoreMessages = ({ loading, hasMore, messagesLoading }) => {
  let title = 'Load More Messages';
  let subtitle = 'Scroll to the top to load more messages...';

  if (loading) {
    title = 'Loading More Messages';
    subtitle = 'Please wait while we load more messages...';
  } else if (!hasMore) {
    title = 'No More Messages';
    subtitle = 'There are no more messages to load, you are at the beginning.';
  }

  return messagesLoading ? null : (
    <div className="load-more-messages">
      <h5>{title}</h5>
      <h6>{subtitle}</h6>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.discussions.loadingMoreMessages,
  hasMore: state.discussions.hasMoreMessages,
  messagesLoading: state.discussions.messagesLoading,
});

export const LoadMoreMessagesContainer = compose(connect(mapStateToProps))(
  LoadMoreMessages,
);
