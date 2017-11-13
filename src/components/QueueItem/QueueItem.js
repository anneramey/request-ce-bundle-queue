import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import { Link, NavLink, Route } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import { actions, isItemComplete } from '../../redux/modules/queue';
import { QueueItemDetailsContainer } from './QueueItemDetails';
import { QueueItemDiscussionsContainer } from './QueueItemDiscussionsContainer';
import { WorkItemMenuContainer } from '../WorkItemMenu';

export const QueueItem = ({
  lastFilterPath,
  lastFilterName,
  queueItem,
  handleCompleted,
  workMenuOpen,
  openWorkMenu,
  closeWorkMenu,
  assignedToMe,
  grabIt,
}) =>
  queueItem !== null && (
    <div className="queue-item-details two-panels">
      <WorkItemMenuContainer
        close={closeWorkMenu}
        isOpen={workMenuOpen}
        queueItem={queueItem}
        onCompleted={handleCompleted}
        review={isItemComplete(queueItem)}
      />
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
      </div>
      <div className="right-panel hidden-sm-down">
        <button
          className="btn btn-primary work-grab-button"
          onClick={
            assignedToMe || queueItem.coreState !== 'Draft'
              ? openWorkMenu
              : grabIt
          }
        >
          {queueItem.coreState !== 'Draft'
            ? 'Review It'
            : assignedToMe ? 'Work It' : 'Grab It'}
        </button>
      </div>
    </div>
  );

export const mapStateToProps = (state, props) => ({
  queueItem: state.queue.currentItem,
  lastFilterPath: state.app.lastFilterPath,
  lastFilterName: state.app.lastFilterName,
  id: props.match.params.id,
  workMenuOpen: state.queue.workMenuOpen,
  profile: state.app.profile,
  assignedToMe:
    state.queue.currentItem &&
    state.queue.currentItem.values['Assigned Individual'] ===
      state.app.profile.username,
});

export const mapDispatchToProps = {
  fetchCurrentItem: actions.fetchCurrentItem,
  setCurrentItem: actions.setCurrentItem,
  updateQueueItem: actions.updateQueueItem,
  openWorkMenu: actions.openWorkMenu,
  closeWorkMenu: actions.closeWorkMenu,
};

export const QueueItemContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    refreshItem: ({ id, fetchCurrentItem }) => () => fetchCurrentItem(id),
    handleCompleted: ({ refreshItem, closeWorkMenu }) => () => {
      refreshItem();
      closeWorkMenu();
    },
    grabIt: ({ queueItem, updateQueueItem, profile }) => () =>
      updateQueueItem({
        id: queueItem.id,
        values: {
          'Assigned Individual': profile.username,
          'Assigned Individual Display Name': profile.displayName,
        },
        successAction: actions.setCurrentItem,
      }),
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
