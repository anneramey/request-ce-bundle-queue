import React from 'react';
import SVGInline from 'react-svg-inline';
import { UncontrolledTooltip } from 'reactstrap';
import solidCircle from 'font-awesome-svg-png/white/svg/circle.svg';
import emptyCircle from 'font-awesome-svg-png/white/svg/circle-o.svg';

const CLOSED_STATUSES = ['Cancelled', 'Complete'];

const getStatusClass = status =>
  `icon-wrapper status status-${status.toLowerCase().replace(/\s+/g, '-')}`;

const getStatusId = queueItem => `${queueItem.id}-status-paragraph`;

const getStatusReason = queueItem => {
  switch (queueItem.values.Status) {
    case 'Pending':
      return queueItem.values['Pending Reason'];
    case 'Cancelled':
      return queueItem.values['Cancellation Reason'];
    case 'Complete':
      return queueItem.values.Resolution;
    default:
      return null;
  }
};

export const StatusParagraph = ({ queueItem }) => (
  <p className={getStatusClass(queueItem.values.Status)}>
    <SVGInline
      svg={
        CLOSED_STATUSES.includes(queueItem.values.Status)
          ? solidCircle
          : emptyCircle
      }
      className="icon"
    />
    {queueItem.values.Status}
    <span className="status-reason" id={getStatusId(queueItem)}>
      {getStatusReason(queueItem)}
    </span>
    {queueItem.values.Status !== 'Open' && (
      <UncontrolledTooltip
        placement="top"
        target={getStatusId(queueItem)}
        delay={0}
      >
        {getStatusReason(queueItem)}
      </UncontrolledTooltip>
    )}
  </p>
);
