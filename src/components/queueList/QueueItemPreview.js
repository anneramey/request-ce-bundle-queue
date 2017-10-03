import React from 'react';
import SVGInline from 'react-svg-inline';
import timesIcon from 'font-awesome-svg-png/white/svg/times.svg';
import solidCircle from 'font-awesome-svg-png/white/svg/circle.svg';
import emptyCircle from 'font-awesome-svg-png/white/svg/circle-o.svg';
import { TimeAgo } from '../TimeAgo';
import { AssignmentBadge } from '../QueueItem/AssignmentBadge';

const OPEN_STATUSES = ['Open', 'Pending'];

const StatusParagraph = ({ status }) =>
  <p className="status icon-wrapper">
    <SVGInline
      svg={OPEN_STATUSES.includes(status) ? emptyCircle : solidCircle}
      className="icon"
    />
    {status}
  </p>;

// const AssignmentParagraph = ({ values }) =>
//   <p className="assignment">
//     {
//       values['Assigned Team'] &&
//       (values['Assigned Team Display Name'] || values['Assigned Team'])
//     }
//     {
//       values['Assigned Individual'] && values['Assigned Team'] && ' > '
//     }
//     {
//       values['Assigned Individual'] &&
//       (values['Assigned Individual Display Name'] || values['Assigned Individual'])
//     }
//   </p>;

const Timestamp = ({ id, label, value }) =>
  value &&
  <li className="list-group-item">
    {label}
    &nbsp;
    <TimeAgo timestamp={value} id={`${id}-${label}`} />
  </li>;

export const QueueItemPreview = ({ queueItem, closePreview }) => {
  const { createdAt, updatedAt, id, values } = queueItem;

  return (
    <div className="item-preview">
      <div className="preview-close">
        <button type="button" className="btn btn-close" onClick={closePreview}>
          <SVGInline svg={timesIcon} className="icon" />
        </button>
      </div>
      <StatusParagraph status={values.Status} />
      <h1>{queueItem.form.name} ({queueItem.handle})</h1>
      <p className="summary">{queueItem.values.Summary}</p>
      <div className="details">{queueItem.values.Details}</div>
      <AssignmentBadge queueItem={queueItem} readOnly />
      <ul className="timestamps list-group">
        <Timestamp label="Due" value={values['Due Date']} id={id} />
        <Timestamp label="Updated" value={updatedAt} id={id} />
        <Timestamp label="Created" value={createdAt} id={id} />
      </ul>
    </div>);
};
