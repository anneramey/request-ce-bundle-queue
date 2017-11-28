import React from 'react';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import timesIcon from 'font-awesome-svg-png/white/svg/times.svg';
import { originLink } from '../../utils/links';
import { TimeAgo } from '../TimeAgo';
import { AssignmentBadge } from '../QueueItem/AssignmentBadge';
import { StatusParagraph } from '../StatusParagraph';
import { WallyButtonContainer } from '../WallyButton';

export const QueueItemPreview = ({
  queueItem,
  closePreview,
  handleGrabbed,
  handleWorked,
}) => {
  return (
    <div className="item-preview">
      <div className="preview-close">
        <button
          type="button"
          className="btn btn-close icon-wrapper"
          onClick={closePreview}
        >
          <SVGInline svg={timesIcon} className="icon" />
        </button>
      </div>
      <StatusParagraph queueItem={queueItem} />
      <h1>
        {queueItem.form.name} ({queueItem.handle})
      </h1>
      <p className="summary">{queueItem.values.Summary}</p>
      <div className="details">{queueItem.values.Details}</div>
      <AssignmentBadge queueItem={queueItem} readOnly />
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
      <div className="preview-actions">
        <WallyButtonContainer
          className="btn btn-primary work-grab-button"
          queueItem={queueItem}
          onGrabbed={handleGrabbed}
          onWorked={handleWorked}
        />
        <Link
          className="btn btn-primary work-grab-button"
          to={`/item/${queueItem.id}`}
        >
          More Details
        </Link>
        <Link
          className="btn btn-primary work-grab-button"
          to={`/item/${queueItem.id}/discussions`}
        >
          Discuss
        </Link>
      </div>
    </div>
  );
};
