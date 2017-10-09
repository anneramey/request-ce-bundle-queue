import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SVGInline from 'react-svg-inline';
import solidCircle from 'font-awesome-svg-png/white/svg/circle.svg';
import emptyCircle from 'font-awesome-svg-png/white/svg/circle-o.svg';
import vEllipsisIcon from 'font-awesome-svg-png/white/svg/ellipsis-v.svg';
import { TimeAgo } from '../TimeAgo';

const OPEN_STATUSES = ['Open', 'Pending'];

const StatusParagraph = ({ status }) =>
  <p className="status icon-wrapper">
    <SVGInline
      svg={OPEN_STATUSES.includes(status) ? emptyCircle : solidCircle}
      className="icon"
    />
    {status}
  </p>;

const AssignmentParagraph = ({ values }) =>
  <p className="assignment">
    {
      values['Assigned Team'] &&
      (values['Assigned Team Display Name'] || values['Assigned Team'])
    }
    {
      values['Assigned Individual'] && values['Assigned Team'] && ' > '
    }
    {
      values['Assigned Individual'] &&
      (values['Assigned Individual Display Name'] || values['Assigned Individual'])
    }
  </p>;

const Timestamp = ({ id, label, value }) =>
  value &&
  <li className="list-group-item">
    {label}
    &nbsp;
    <TimeAgo timestamp={value} id={`${id}-${label}`} />
  </li>;

const DueOrCloseDate = ({ queueItem }) => {
  if (queueItem.closedAt) {
    return <Timestamp label="Closed" value={queueItem.closedAt} id={queueItem.id} />;
  } else if (queueItem.values['Due Date']) {
    return <Timestamp label="Due" value={queueItem.values['Due Date']} id={queueItem.id} />;
  } else {
    return null;
  }
};

export const QueueListItem = ({
  queueItem,
  openDropdownItem,
  toggleItemMenu,
  toggleWorkMenu,
  handleItemClick,
}) => {
  const { createdAt, updatedAt, id, values } = queueItem;

  return (
    <li
      key={id}
      className="submission list-group-item"
    >
      <div
        className="summary-group"
        onClick={handleItemClick(queueItem)}
        role="button"
        tabIndex={0}
      >
        <StatusParagraph status={values.Status} />
        <h1>{queueItem.form.name} ({queueItem.handle})</h1>
        <p className="summary">{values.Summary}</p>
        <AssignmentParagraph values={values} />
        <ul className="timestamps list-group">
          <DueOrCloseDate queueItem={queueItem} />
          <Timestamp label="Updated" value={updatedAt} id={id} />
          <Timestamp label="Created" value={createdAt} id={id} />
        </ul>
      </div>
      <div className="actions">
        <Dropdown isOpen={id === openDropdownItem} toggle={toggleItemMenu(id)}>
          <DropdownToggle className="btn-ellipsis">
            <SVGInline svg={vEllipsisIcon} className="icon" />
          </DropdownToggle>
          <DropdownMenu>
            <LinkContainer to={`/item/${id}`}>
              <DropdownItem>More Details</DropdownItem>
            </LinkContainer>
            <DropdownItem onClick={toggleWorkMenu(queueItem)}>Work Task</DropdownItem>
            <DropdownItem>Discuss</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </li>
  );
};
