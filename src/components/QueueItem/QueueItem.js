import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Link, NavLink, Route } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import { actions } from '../../redux/modules/queue';
import { QueueItemDetailsContainer } from './QueueItemDetails';
import { QueueItemDiscussions } from './QueueItemDiscussions';
import { WorkItemMenu } from './WorkItemMenu';

export const QueueItem = ({ queueItem, workMenuOpen, openWorkMenu, closeWorkMenu }) =>
  queueItem !== null &&
  <div className="queue-item-details two-panels">
    <WorkItemMenu close={closeWorkMenu} isOpen={workMenuOpen} queueItem={queueItem} />
    <div className="left-panel">
      <div className="controls">
        <Link to="/list/Mine" className="back-link">
          <div className="icon-wrapper">
            <SVGInline svg={chevronLeftIcon} className="icon" />
            Mine
          </div>
        </Link>
        <Nav horizontal className="tabs">
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
  lifecycle({
    componentWillMount() {
      this.props.fetchCurrentItem(this.props.id);
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.id !== nextProps.id) {
        this.props.fetchCurrentItem(nextProps.id);
      }
    },
  }),
)(QueueItem);
