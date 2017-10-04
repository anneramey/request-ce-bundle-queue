import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import SVGInline from 'react-svg-inline';
import thinChevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';
import circleOpenIcon from 'font-awesome-svg-png/black/svg/circle-o.svg';
// import circleClosedIcon from 'font-awesome-svg-png/black/svg/circle.svg';
import plusIcon from 'font-awesome-svg-png/black/svg/plus.svg';
import { actions } from '../../redux/modules/queue';
import { originLink } from '../../utils';
import { AssignmentSelector } from './AssignmentSelector';
import { AssignmentBadge } from './AssignmentBadge';
import { TimeAgo } from '../TimeAgo';

export const QueueItemDetails = ({
  queueItem,
  isAssigning,
  toggleAssigning,
  setIsAssigning,
  setAssignment,
  assignments,
}) =>
  <div className="details">
    <div className="general">
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
    <a className="btn btn-primary btn-inverse request-button" href={originLink(queueItem)} target="_blank">
      View Original Request
    </a>
    <ul className="list-group timestamps">
      <li className="list-group-item timestamp">
        <span className="label">Due</span>
        <span className="value">
          <TimeAgo timestamp={queueItem.values['Due Date']} id="due-date" />
        </span>
      </li>
      <li className="list-group-item timestamp">
        <span className="label">Updated</span>
        <span className="value">
          <TimeAgo timestamp={queueItem.updatedAt} id="updated-at" />
        </span>
      </li>
      <li className="list-group-item timestamp">
        <span className="label">Created</span>
        <span className="value">
          <TimeAgo timestamp={queueItem.createdAt} id="created-at" />
        </span>
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
  </div>;

export const mapStateToProps = state => ({
  queueItem: state.queue.currentItem,
  assignments: state.app.allTeams
    .flatMap(t => t.memberships.map(m => {
      const user = m.user;
      user.team = t.name;
      return user;
    }))
    .toJS(),
});

export const mapDispatchToProps = {
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
)(QueueItemDetails);
