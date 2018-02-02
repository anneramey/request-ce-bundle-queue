import React from 'react';
import SVGInline from 'react-svg-inline';
import { UncontrolledTooltip, ButtonGroup, Button } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import solidCircle from 'font-awesome-svg-png/white/svg/circle.svg';
import emptyCircle from 'font-awesome-svg-png/white/svg/circle-o.svg';
import caretLeft from 'font-awesome-svg-png/white/svg/caret-left.svg';
import caretRight from 'font-awesome-svg-png/white/svg/caret-right.svg';

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

const PrevAndNextGroup = ({ prevAndNext }) => (
  <ButtonGroup className="queue-details-nav btn-group-xs">
    <LinkContainer to={prevAndNext.prev || ''}>
      <Button color="secondary" outline disabled={!prevAndNext.prev}>
        <SVGInline svg={caretLeft} className="icon" />
      </Button>
    </LinkContainer>
    <LinkContainer to={prevAndNext.next || ''}>
      <Button color="secondary" outline disabled={!prevAndNext.next}>
        <SVGInline svg={caretRight} className="icon" />
      </Button>
    </LinkContainer>
  </ButtonGroup>
);

export const StatusParagraph = ({ queueItem, prevAndNext }) => (
  <div className="status-paragraph">
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
    {prevAndNext && <PrevAndNextGroup prevAndNext={prevAndNext} />}
  </div>
);
