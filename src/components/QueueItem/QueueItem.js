import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import { actions } from '../../redux/modules/queue';
import { QueueItemDetailsContainer } from './QueueItemDetails';
import { QueueItemDiscussionsContainer } from './QueueItemDiscussionsContainer';

export const QueueItem = ({ lastFilterPath, lastFilterName, queueItem }) =>
  queueItem !== null && (
    <div className="queue-item">
      {lastFilterName && (
        <Link to={lastFilterPath} className="back-link">
          <div className="icon-wrapper">
            <SVGInline svg={chevronLeftIcon} className="icon" />
            {lastFilterName}
          </div>
        </Link>
      )}
      <div className="queue-item-content">
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
