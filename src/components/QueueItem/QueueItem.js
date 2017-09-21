import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Link, NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import moment from 'moment';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import chevronRightIcon from 'font-awesome-svg-png/black/svg/chevron-right.svg';
import thinChevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';
import circleOpenIcon from 'font-awesome-svg-png/black/svg/circle-o.svg';
// import circleClosedIcon from 'font-awesome-svg-png/black/svg/circle.svg';
import plusIcon from 'font-awesome-svg-png/black/svg/plus.svg';
import { actions } from '../../redux/modules/queue';

export const QueueItem = ({ queueItem }) =>
  queueItem !== null &&
  <div className="queue-item-details two-panels">
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
              Details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`/item/${queueItem.id}/discussions`} className="nav-link" activeClassName="active">
              Discussions
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div className="details">
        <p className="status">
          <SVGInline svg={circleOpenIcon} className="icon" />
          {queueItem.values.Status}
        </p>
        <h1>{queueItem.form.name} ({queueItem.handle})</h1>
        <p className="summary">{queueItem.values.Summary}</p>
        <pre>{queueItem.values.Details}</pre>
      </div>
      <div className="assignment">
        <span className="assignment-badge">
          {queueItem.values['Assigned Team Display Name'].charAt(0)}
        </span>
        <div>
          <div className="team">{queueItem.values['Assigned Team Display Name']}</div>
          <div className="individual">{queueItem.values['Assigned Individual Display Name']}</div>
        </div>
        <SVGInline svg={chevronRightIcon} className="icon" />
      </div>
      <button className="btn btn-primary btn-inverse request-button">
        View Original Request
      </button>
      <ul className="list-group timestamps">
        <li className="list-group-item timestamp">
          <span className="label">Due</span>
          <span className="value">{moment(queueItem.values['Due Date']).fromNow()}</span>
        </li>
        <li className="list-group-item timestamp">
          <span className="label">Updated</span>
          <span className="value">{moment(queueItem.updatedAt).fromNow()}</span>
        </li>
        <li className="list-group-item timestamp">
          <span className="label">Created</span>
          <span className="value">{moment(queueItem.createdAt).fromNow()}</span>
        </li>
      </ul>
      <div className="subtasks-section">
        <hr />
        <h2>
          <span>Subtasks</span>
          <button className="btn btn-link">
            <SVGInline svg={plusIcon} className="icon" />
          </button>
        </h2>
        <ul className="list-group subtasks">
          {
            queueItem.children.map(child =>
              <li key={child.id} className="list-group-item subtask">
                <span className="handle">{child.form.name} ({child.handle})</span>
                <span className="summary">{child.values.Summary}</span>
                <SVGInline svg={thinChevronRightIcon} className="icon" />
              </li>,
            )
          }
        </ul>
      </div>
      <div className="discussion-section">
        <hr />
        <h2>
          <span>Discussion</span>
        </h2>
      </div>
    </div>
    <div className="right-panel">
      <button className="btn btn-primary work-grab-button">
        Work / Grab It
      </button>
    </div>
  </div>;

export const mapStateToProps = (state, props) => ({
  queueItem: state.queue.currentItem,
  id: props.match.params.id,
});

export const mapDispatchToProps = {
  fetchCurrentItem: actions.fetchCurrentItem,
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
