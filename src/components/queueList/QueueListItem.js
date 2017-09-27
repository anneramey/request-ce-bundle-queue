import React from 'react';
import moment from 'moment';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SVGInline from 'react-svg-inline';
import solidCircle from 'font-awesome-svg-png/white/svg/circle.svg';
import emptyCircle from 'font-awesome-svg-png/white/svg/circle-o.svg';
import vEllipsisIcon from 'font-awesome-svg-png/white/svg/ellipsis-v.svg';


const OPEN_STATUSES = ['Open', 'Pending'];

const StatusParagraph = ({ status }) =>
  <p className="status">
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

const Timestamp = ({ label, value }) =>
  value &&
  <li className="list-group-item">
    {`${label} ${moment(value).fromNow()}`}
  </li>;

export const QueueListItem = (
  {
    queueItem,
    openDropdownItem,
    toggleItemMenu,
    toggleWorkMenu,
  },
) => {
  const { createdAt, updatedAt, id, values } = queueItem;
  return (
    <li
      key={id}
      className="submission list-group-item"
    >
      <div className="summary-group">
        <StatusParagraph status={values.Status} />
        <h1>{values.Summary}</h1>
        <p className="summary">{values.Details}</p>
        <AssignmentParagraph values={values} />
        <ul className="timestamps list-group">
          <Timestamp label="Due" value={values['Due Date']} />
          <Timestamp label="Updated" value={updatedAt} />
          <Timestamp label="Created" value={createdAt} />
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
