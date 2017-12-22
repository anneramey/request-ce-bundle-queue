import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers, withProps } from 'recompose';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import plusIcon from 'font-awesome-svg-png/black/svg/plus.svg';
import commentsIcon from 'font-awesome-svg-png/black/svg/comments.svg';
import { selectAssignments } from '../../redux/modules/app';
import { actions } from '../../redux/modules/queue';
import { actions as discussionActions } from '../../redux/modules/discussions';
import { originLink } from '../../utils/links';
import { AssignmentSelector } from './AssignmentSelector';
import { AssignmentBadge } from './AssignmentBadge';
import { TimeAgo } from '../TimeAgo';
import { StatusParagraph } from '../StatusParagraph';
import { QueueListItemSmall } from '../queueList/QueueListItem';
import { WallyButtonContainer } from '../WallyButton';

const showOriginLink = queueItem =>
  queueItem.parent &&
  queueItem.origin &&
  queueItem.parent.id === queueItem.origin.id;

const showParentLink = queueItem =>
  queueItem.parent &&
  ((queueItem.origin && queueItem.origin.id !== queueItem.parent.id) ||
    queueItem.origin === null);

export const QueueItemDetails = ({
  queueItem,
  isAssigning,
  toggleAssigning,
  setIsAssigning,
  setAssignment,
  assignments,
  openNewItemMenu,
  prohibitSubtasks,
  refreshQueueItem,
  openDiscussion,
  createDiscussion,
}) => (
  <div className="queue-item-details">
    <div className="scrollable-content">
      <div className="general">
        <button
          onClick={
            queueItem.values['Discussion Id'] === null
              ? createDiscussion
              : openDiscussion
          }
          className="btn btn-primary btn-inverse discussion-button icon-wrapper hidden-md-up"
        >
          <SVGInline svg={commentsIcon} className="icon" />
          {queueItem.values['Discussion Id'] === null
            ? 'Create Discussion'
            : 'View Discussion'}
        </button>
        <StatusParagraph queueItem={queueItem} />
        <h1>
          {queueItem.form.name} ({queueItem.handle})
        </h1>
        <p className="summary">{queueItem.values.Summary}</p>
        <pre>{queueItem.values.Details}</pre>
        <div className="actions">
          {!isAssigning && (
            <AssignmentBadge
              queueItem={queueItem}
              toggle={
                queueItem.coreState === 'Draft' ? toggleAssigning : undefined
              }
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
          <WallyButtonContainer
            className="btn btn-primary wally-button"
            queueItem={queueItem}
            onWorked={refreshQueueItem}
            onGrabbed={refreshQueueItem}
          />
        </div>
        {showOriginLink(queueItem) && (
          <a
            className="btn btn-primary btn-inverse request-button"
            href={originLink(queueItem)}
            target="_blank"
          >
            View Original Request
          </a>
        )}
        {showParentLink(queueItem) && (
          <Link
            to={`/item/${queueItem.parent.id}`}
            className="btn btn-primary btn-inverse request-button"
          >
            View Parent
          </Link>
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
          <ul className="list-group submissions">
            {queueItem.children.map(child => (
              <QueueListItemSmall key={child.id} queueItem={child} />
            ))}
          </ul>
          {queueItem.children.length < 1 && (
            <div className="empty-subtasks">
              <h5>No Subtasks to display</h5>
              <h6>
                Subtasks are an easy way to create smaller and/or related tasks
                to parent task.
              </h6>
            </div>
          )}
        </div>
      )}
    </div>
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
  fetchCurrentItem: actions.fetchCurrentItem,
  setCurrentItem: actions.setCurrentItem,
  openModal: discussionActions.openModal,
  createDiscussion: discussionActions.createIssue,
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
    refreshQueueItem: props => () => props.fetchCurrentItem(props.queueItem.id),
    openDiscussion: props => () =>
      props.openModal(props.queueItem.values['Discussion Id'], 'discussion'),
    createDiscussion: props => () =>
      props.createDiscussion(
        props.queueItem.label || 'Queue Discussion',
        props.queueItem.values['Details'] || '',
        props.queueItem,
        (issue, submission) => {
          props.setCurrentItem(submission);
          props.openModal(issue.guid, 'discussion');
        },
      ),
  }),
)(QueueItemDetails);
