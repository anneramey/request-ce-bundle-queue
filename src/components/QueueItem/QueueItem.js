import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import { Link, NavLink, Route } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import { actions } from '../../redux/modules/queue';
import { QueueItemDetailsContainer } from './QueueItemDetails';
import { QueueItemDiscussionsContainer } from './QueueItemDiscussionsContainer';
import { WallyButtonContainer } from '../WallyButton';

export const QueueItem = ({
  lastFilterPath,
  lastFilterName,
  queueItem,
  handleGrabbed,
  refreshItem,
}) =>
  queueItem !== null && (
    <div className="queue-item-details two-panels">
      <div className="left-panel">
        <div className="controls">
          {lastFilterName && (
            <Link to={lastFilterPath} className="back-link">
              <div className="icon-wrapper">
                <SVGInline svg={chevronLeftIcon} className="icon" />
                {lastFilterName}
              </div>
            </Link>
          )}
          <Nav className="tabs hidden-sm-down">
            <NavItem>
              <NavLink
                exact
                to={`/item/${queueItem.id}`}
                className="nav-link"
                activeClassName="active"
              >
                <div className="inner-wrapper">Details</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to={`/item/${queueItem.id}/discussions`}
                className="nav-link"
                activeClassName="active"
              >
                <div className="inner-wrapper">Discussions</div>
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <Route exact path="/item/:id" component={QueueItemDetailsContainer} />
        <Route
          path="/item/:id/discussions"
          component={QueueItemDiscussionsContainer}
        />
        <WallyButtonContainer
          className="btn btn-primary work-grab-button hidden-md-up wally-button"
          queueItem={queueItem}
          onGrabbed={handleGrabbed}
          onWorked={refreshItem}
        />
      </div>
      <div className="right-panel hidden-sm-down">
        <WallyButtonContainer
          className="btn btn-primary work-grab-button"
          queueItem={queueItem}
          onGrabbed={handleGrabbed}
          onWorked={refreshItem}
        />
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
  withHandlers({
    refreshItem: ({ id, fetchCurrentItem }) => () => fetchCurrentItem(id),
    handleGrabbed: props => updatedItem => {
      props.setCurrentItem(updatedItem);
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.refreshItem();
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
