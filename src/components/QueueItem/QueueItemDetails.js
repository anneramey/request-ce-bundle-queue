import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers, withProps } from 'recompose';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import thinChevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';
import plusIcon from 'font-awesome-svg-png/black/svg/plus.svg';
import commentsIcon from 'font-awesome-svg-png/black/svg/comments.svg';
import { selectAssignments } from '../../redux/modules/app';
import { actions } from '../../redux/modules/queue';
import { originLink } from '../../utils/links';
import { AssignmentSelector } from './AssignmentSelector';
import { AssignmentBadge } from './AssignmentBadge';
import { TimeAgo } from '../TimeAgo';
import { StatusParagraph } from '../StatusParagraph';

export const QueueItemDetails = ({
  queueItem,
  isAssigning,
  toggleAssigning,
  setIsAssigning,
  setAssignment,
  assignments,
  openNewItemMenu,
  prohibitSubtasks,
}) => (
  <div className="details">
    <div className="general">
      <Link
        to={`/item/${queueItem.id}/discussions`}
        className="btn btn-primary btn-inverse discussion-button icon-wrapper hidden-md-up"
      >
        <SVGInline svg={commentsIcon} className="icon" />
        View Discussion
      </Link>
      <StatusParagraph queueItem={queueItem} />
      <h1>
        {queueItem.form.name} ({queueItem.handle})
      </h1>
      <p className="summary">{queueItem.values.Summary}</p>
      <pre>{queueItem.values.Details}</pre>
      {!isAssigning && (
        <AssignmentBadge
          queueItem={queueItem}
          toggle={queueItem.coreState === 'Draft' ? toggleAssigning : undefined}
          readOnly={queueItem.coreState !== 'Draft'}
        />
      )}
      {isAssigning && (
        <AssignmentSelector
          toggle={setIsAssigning}
          onSelect={setAssignment}
          isAssigning={isAssigning}
          assignments={assignments}
        />
      )}
      {queueItem.origin && (
        <a
          className="btn btn-primary btn-inverse request-button"
          href={originLink(queueItem)}
          target="_blank"
        >
          View Original Request
        </a>
      )}
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
    </div>

    {!prohibitSubtasks && (
      <div className="subtasks-section">
        <h2>
          <span>Subtasks</span>
          {queueItem.coreState === 'Draft' && (
            <button className="btn btn-link" onClick={openNewItemMenu}>
              <SVGInline svg={plusIcon} className="icon" />
            </button>
          )}
        </h2>
        <ul className="list-group subtasks">
          {queueItem.children.map(child => (
            <li key={child.id} className="list-group-item subtask">
              <Link to={`/item/${child.id}`}>
                <span className="handle">
                  {child.form.name} ({child.handle})
                </span>
                <span className="summary">{child.values.Summary}</span>
                <SVGInline svg={thinChevronRightIcon} className="icon" />
              </Link>
            </li>
          ))}
        </ul>
        {queueItem.children.length < 1 && (
          <div className="empty-subtasks">
            <h5>No Subtasks to display</h5>
            <h6>
              Subtasks are an easy way to create smaller and/or related tasks to
              parent task.
            </h6>
          </div>
        )}
      </div>
    )}
  </div>
);

const getAttr = (form, attrName) => {
  const attrConfig =
    form.attributes &&
    form.attributes.find(attribute => attribute.name === attrName);
  return attrConfig && attrConfig.values[0];
};

export const mapStateToProps = state => ({
  queueItem: state.queue.currentItem,
  assignments: selectAssignments(state).toJS(),
});

export const mapDispatchToProps = {
  updateQueueItem: actions.updateQueueItem,
  openNewItemMenu: actions.openNewItemMenu,
};

export const QueueItemDetailsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ queueItem }) => {
    const prohibit = getAttr(queueItem.form, 'Prohibit Subtasks');
    const permitted = getAttr(queueItem.form, 'Permitted Subtasks');
    return {
      prohibitSubtasks: ['True', 'Yes'].includes(prohibit),
      permittedSubtasks: permitted && permitted.split(/\s*,\s*/),
    };
  }),
  withState('isAssigning', 'setIsAssigning', false),
  withHandlers({
    toggleAssigning: ({ setIsAssigning, isAssigning }) => () =>
      setIsAssigning(!isAssigning),
    setAssignment: ({ queueItem, updateQueueItem }) => (_v, assignment) => {
      const teamParts = assignment.team.split('::');
      const values = {
        'Assigned Individual': assignment.username,
        'Assigned Individual Display Name': assignment.displayName,
        'Assigned Team': assignment.team,
        'Assigned Team Display Name': teamParts[teamParts.length - 1],
      };

      updateQueueItem({
        id: queueItem.id,
        values,
        successAction: actions.setCurrentItem,
      });
    },
    openNewItemMenu: ({
      openNewItemMenu,
      queueItem,
      permittedSubtasks,
    }) => () => {
      openNewItemMenu({
        permittedSubtasks,
        parentId: queueItem.id,
        originId: queueItem.origin ? queueItem.origin.id : queueItem.id,
      });
    },
  }),
)(QueueItemDetails);
