import React from 'react';
import SVGInline from 'react-svg-inline';
import wallyHappyImage from '../../images/wally-happy.svg';
import wallyMissingImage from '../../images/wally-missing.svg';
import refreshIcon from 'font-awesome-svg-png/white/svg/refresh.svg';
import filterIcon from '../../images/filter.svg';
import sortAscIcon from '../../images/sort_asc.svg';
import sortDescIcon from '../../images/sort_desc.svg';
import { QueueListItemSmall } from './QueueListItem';
import { TOO_MANY_STATUS_STRING } from '../../redux/sagas/queue';
import { PageTitle } from '../PageTitle';

const SORT_NAMES = {
  createdAt: 'Created At',
  updatedAt: 'Updated At',
  closedAt: 'Closed At',
  'Due Date': 'Due Date',
};

const WallyEmptyMessage = ({ filter }) => {
  if (filter.type === 'adhoc') {
    return (
      <div className="wally">
        <h5>No Results</h5>
        <SVGInline svg={wallyMissingImage} />
        <h6>Try a less specific filter.</h6>
        <h5>Try again</h5>
      </div>
    );
  }

  return (
    <div className="wally">
      <h5>No Assignments</h5>
      <SVGInline svg={wallyHappyImage} />
      <h6>An empty queue is a happy queue.</h6>
    </div>
  );
};

const WallyErrorMessage = ({ message }) => {
  return (
    <div className="wally">
      <h5>{message === TOO_MANY_STATUS_STRING ? 'Too Many Items' : 'Error'}</h5>
      <SVGInline svg={wallyMissingImage} />
      <h6>{message}</h6>
      <h5>Try again</h5>
    </div>
  );
};

const WallyBadFilter = () => (
  <div className="wally">
    <h5>Invalid List</h5>
    <SVGInline svg={wallyMissingImage} />
    <h6>Invalid list, please choose a valid list from the left side.</h6>
  </div>
);

export const QueueList = ({
  filter,
  queueItems,
  statusMessage,
  openFilterMenu,
  sortDirection,
  sortBy,
  toggleSortDirection,
  refresh,
}) =>
  !filter ? (
    <WallyBadFilter />
  ) : (
    <div className="queue-list">
      <PageTitle parts={[filter.name || 'Adhoc']} />
      <div className="controls">
        <h6>
          {filter.name || 'Adhoc'}
          <br />
          <small>by {SORT_NAMES[sortBy]}</small>
        </h6>
        <div className="buttons">
          <button
            type="button"
            className="btn btn-link icon-wrapper"
            onClick={refresh}
          >
            <SVGInline svg={refreshIcon} className="icon" />
          </button>
          <button
            type="button"
            className="btn btn-link icon-wrapper"
            onClick={toggleSortDirection}
          >
            <SVGInline
              className="icon"
              svg={sortDirection === 'ASC' ? sortAscIcon : sortDescIcon}
            />
          </button>
          <button
            type="button"
            className="btn btn-link icon-wrapper"
            onClick={openFilterMenu}
          >
            <SVGInline svg={filterIcon} className="icon" />
          </button>
        </div>
      </div>
      <div className="queue-list-content submissions">
        {statusMessage ? (
          <WallyErrorMessage message={statusMessage} />
        ) : queueItems && queueItems.size > 0 ? (
          <ul className="list-group">
            {queueItems.map(queueItem => (
              <QueueListItemSmall queueItem={queueItem} key={queueItem.id} />
            ))}
          </ul>
        ) : (
          <WallyEmptyMessage filter={filter} />
        )}
      </div>
    </div>
  );
