import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import commentsIcon from 'font-awesome-svg-png/black/svg/comments.svg';
import vEllipsisIcon from 'font-awesome-svg-png/white/svg/ellipsis-v.svg';
import { TimeAgo } from '../TimeAgo';
import { StatusParagraph } from '../StatusParagraph';
import { WallyButtonContainer } from '../WallyButton';

const AssignmentParagraph = ({ values }) => (
  <p className="assignment">
    {values['Assigned Team'] &&
      (values['Assigned Team Display Name'] || values['Assigned Team'])}
    {values['Assigned Individual'] && values['Assigned Team'] && ' > '}
    {values['Assigned Individual'] &&
      (values['Assigned Individual Display Name'] ||
        values['Assigned Individual'])}
  </p>
);

const Timestamp = ({ id, label, value }) =>
  value && (
    <li className="list-group-item">
      {label}
      &nbsp;
      <TimeAgo timestamp={value} id={`${id}-${label}`} />
    </li>
  );

const DueOrCloseDate = ({ queueItem }) => {
  if (queueItem.closedAt) {
    return (
      <Timestamp label="Closed" value={queueItem.closedAt} id={queueItem.id} />
    );
  } else if (queueItem.values['Due Date']) {
    return (
      <Timestamp
        label="Due"
        value={queueItem.values['Due Date']}
        id={queueItem.id}
      />
    );
  } else {
    return null;
  }
};

export const QueueListItem = ({
  queueItem,
  handleItemClick,
  handleGrabbed,
  handleWorked,
}) => {
  const { createdAt, updatedAt, id, values } = queueItem;

  return (
    <li key={id} className="submission list-group-item">
      <div
        className="summary-group"
        onClick={handleItemClick(queueItem)}
        role="button"
        tabIndex={0}
      >
        <StatusParagraph queueItem={queueItem} />
        <h6>
          {queueItem.form.name} ({queueItem.handle})
          {queueItem.values['Discussion Id'] && (
            <Link
              className="btn btn-link"
              to={`/item/${queueItem.id}/discussions`}
              title="Has discussions"
            >
              <SVGInline svg={commentsIcon} className="icon" />
            </Link>
          )}
        </h6>
        <p className="summary">{values.Summary}</p>
        <AssignmentParagraph values={values} />
        <ul className="timestamps list-group">
          <DueOrCloseDate queueItem={queueItem} />
          <Timestamp label="Updated" value={updatedAt} id={id} />
          <Timestamp label="Created" value={createdAt} id={id} />
        </ul>
      </div>
      <div className="actions">
        <UncontrolledDropdown>
          <DropdownToggle className="btn-ellipsis">
            <SVGInline svg={vEllipsisIcon} className="icon" />
          </DropdownToggle>
          <DropdownMenu>
            <Link to={`/item/${id}`} className="dropdown-item">
              More Details
            </Link>
            <WallyButtonContainer
              className="dropdown-item"
              queueItem={queueItem}
              onGrabbed={handleGrabbed}
              onWorked={handleWorked}
            />
            <Link to={`/item/${id}/discussions`} className="dropdown-item">
              Discuss
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </li>
  );
};

export const QueueListItemSmall = ({ queueItem }) => {
  const { createdAt, updatedAt, id, values } = queueItem;
  return (
    <li className="submission list-group-item">
      <Link to={`/item/${id}`} className="summary-group">
        <StatusParagraph queueItem={queueItem} />
        <h6>
          {queueItem.form.name} ({queueItem.handle})
          {queueItem.values['Discussion Id'] && (
            <Link
              className="btn btn-link"
              to={`/item/${queueItem.id}/discussions`}
            >
              <SVGInline svg={commentsIcon} className="icon" />
            </Link>
          )}
        </h6>
        <p className="summary">{values.Summary}</p>
        <AssignmentParagraph values={values} />
        <ul className="timestamps list-group">
          <DueOrCloseDate queueItem={queueItem} />
          <Timestamp label="Updated" value={updatedAt} id={id} />
          <Timestamp label="Created" value={createdAt} id={id} />
        </ul>
      </Link>
    </li>
  );
};
