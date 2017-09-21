import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import moment from 'moment';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import thinChevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';
import circleOpenIcon from 'font-awesome-svg-png/black/svg/circle-o.svg';
// import circleClosedIcon from 'font-awesome-svg-png/black/svg/circle.svg';
import plusIcon from 'font-awesome-svg-png/black/svg/plus.svg';
import { actions } from '../../redux/modules/queue';
import { AssignmentSelector } from './AssignmentSelector';
import { AssignmentBadge } from './AssignmentBadge';

export const QueueItemDetails = ({
  queueItem,
  isAssigning,
  toggleAssigning,
  setIsAssigning,
  setAssignment,
  assignments,
}) =>
  queueItem !== null &&
  <div className="queue-item-details two-panels">
    <div className="left-panel">
      <div className="controls">
        <Link to="/list/mine" className="back-link">
          <div>
            <SVGInline svg={chevronLeftIcon} className="icon" />
            Back to Mine
          </div>
        </Link>
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
      {!isAssigning && <AssignmentBadge queueItem={queueItem} toggle={toggleAssigning} />}
      {isAssigning &&
        <AssignmentSelector
          toggle={setIsAssigning}
          onSelect={setAssignment}
          isAssigning={isAssigning}
          assignments={assignments}
        />}
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
  assignments: state.app.allTeams
    .flatMap(t => t.memberships.map(m => {
      const user = m.user;
      user.team = t.name;
      return user;
    }))
    .toJS(),
});

export const mapDispatchToProps = {
  fetchCurrentItem: actions.fetchCurrentItem,
  updateCurrentItem: actions.updateCurrentItem,
};

export const QueueItemDetailsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('isAssigning', 'setIsAssigning', false),
  withHandlers({
    toggleAssigning: ({ setIsAssigning, isAssigning }) => () =>
      setIsAssigning(!isAssigning),
    setAssignment: ({ updateCurrentItem }) => (_v, assignment) => {
      const teamParts = assignment.team.split('::');
      const values = {
        'Assigned Individual': assignment.username,
        'Assigned Individual Display Name': assignment.displayName,
        'Assigned Team': assignment.team,
        'Assigned Team Display Name': teamParts[teamParts.length - 1],
      };

      updateCurrentItem(values);
    },
  }),
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
)(QueueItemDetails);
