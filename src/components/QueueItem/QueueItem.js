import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import { Link, NavLink, Route } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import { actions, isItemComplete } from '../../redux/modules/queue';
import { QueueItemDetailsContainer } from './QueueItemDetails';
import { QueueItemDiscussions } from './QueueItemDiscussions';
import { WorkItemMenuContainer } from '../WorkItemMenu';

export const QueueItem = ({
  queueItem,
  handleCompleted,
  currentFilterName,
  workMenuOpen,
  openWorkMenu,
  closeWorkMenu,
}) =>
  queueItem !== null &&
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
        {
          currentFilterName !== '' &&
          <Link
            to={`/list/${encodeURIComponent(currentFilterName)}`}
            className="back-link"
          >
            <div className="icon-wrapper">
              <SVGInline svg={chevronLeftIcon} className="icon" />
              {currentFilterName}
            </div>
          </Link>
        }
        <Nav className="tabs">
          <NavItem>
            <NavLink exact to={`/item/${queueItem.id}`} className="nav-link" activeClassName="active">
              <div className="inner-wrapper">Details</div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`/item/${queueItem.id}/discussions`} className="nav-link" activeClassName="active">
              <div className="inner-wrapper">Discussions</div>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <Route exact path="/item/:id" component={QueueItemDetailsContainer} />
      <Route path="/item/:id/discussions" component={QueueItemDiscussions} />
    </div>
    <div className="right-panel">
      <button
        className="btn btn-primary work-grab-button"
        onClick={openWorkMenu}
      >
        Works / Grab It
      </button>
    </div>
  </div>;

export const mapStateToProps = (state, props) => ({
  queueItem: state.queue.currentItem,
  currentFilterName: state.queue.currentFilter.name,
  id: props.match.params.id,
  workMenuOpen: state.queue.workMenuOpen,
});

export const mapDispatchToProps = {
  fetchCurrentItem: actions.fetchCurrentItem,
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
  }),
)(QueueItem);
