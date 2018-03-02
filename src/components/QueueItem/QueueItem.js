import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import { actions } from '../../redux/modules/queue';
import { QueueItemDetailsContainer } from './QueueItemDetails';
import { QueueItemDiscussionsContainer } from './QueueItemDiscussionsContainer';
import { PageTitle } from '../PageTitle';

export const QueueItem = ({ lastFilterPath, lastFilterName, queueItem }) =>
  queueItem !== null && (
    <div className="queue-item">
      {lastFilterName && (
        <Link to={lastFilterPath} className="back-link">
          <div className="icon-wrapper">
            <span className="icon">
              <span
                className="fa fa-fw fa-chevron-left"
                style={{ fontSize: '16px' }}
              />
            </span>
            {lastFilterName}
          </div>
        </Link>
      )}
      <div className="queue-item-content">
        <PageTitle
          parts={[
            queueItem ? queueItem.handle : '',
            lastFilterName ? lastFilterName : '',
          ]}
        />
        <QueueItemDetailsContainer />
        <QueueItemDiscussionsContainer />
      </div>
    </div>
  );

export const mapStateToProps = (state, props) => ({
  queueItem: state.queue.currentItem,
  lastFilterPath: state.app.lastFilterPath,
  lastFilterName: state.app.lastFilterName,
  id: props.match.params.id,
});

export const mapDispatchToProps = {
  fetchCurrentItem: actions.fetchCurrentItem,
  setCurrentItem: actions.setCurrentItem,
};

export const QueueItemContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.fetchCurrentItem(this.props.id);
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.id !== nextProps.id) {
        this.props.fetchCurrentItem(nextProps.id);
      }
    },
    componentWillUnmount() {
      this.props.setCurrentItem(null);
    },
  }),
)(QueueItem);
