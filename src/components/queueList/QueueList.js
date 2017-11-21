import React from 'react';
import SVGInline from 'react-svg-inline';
import wallyHappyImage from '../../images/wally-happy.svg';
import wallyMissingImage from '../../images/wally-missing.svg';
import refreshIcon from 'font-awesome-svg-png/white/svg/refresh.svg';
import filterIcon from '../../images/filter.svg';
import sortAscIcon from '../../images/sort_asc.svg';
import sortDescIcon from '../../images/sort_desc.svg';
import { QueueListItem, QueueListItemSmall } from './QueueListItem';
import { QueueItemPreview } from './QueueItemPreview';

const WallyMessage = ({ filter }) => {
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
  openFilterMenu,
  handleItemClick,
  previewItem,
  closePreview,
  sortDirection,
  toggleSortDirection,
  refresh,
  isSmallLayout,
  handleGrabbed,
  handleWorked,
}) => (
  <div className="two-panels">
    {!filter ? (
      <WallyBadFilter />
    ) : (
      <div className="left-panel">
        <div className="controls">
          <h6>
            {filter.name || 'Adhoc'}
            <br />
            <small>by Due Date</small>
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
        <div className="submissions">
          {queueItems && queueItems.size > 0 ? (
            <ul className="list-group">
              {queueItems.map(
                queueItem =>
                  isSmallLayout ? (
                    <QueueListItemSmall
                      queueItem={queueItem}
                      key={queueItem.id}
                    />
                  ) : (
                    <QueueListItem
                      key={queueItem.id}
                      handleItemClick={handleItemClick}
                      queueItem={queueItem}
                      handleGrabbed={handleGrabbed}
                      handleWorked={handleWorked}
                    />
                  ),
              )}
            </ul>
          ) : (
            <WallyMessage filter={filter} />
          )}
        </div>
      </div>
    )}
    {!isSmallLayout &&
      previewItem && (
        <div className="right-panel">
          <QueueItemPreview
            queueItem={previewItem}
            closePreview={closePreview}
            handleGrabbed={handleGrabbed}
            handleWorked={handleWorked}
          />
        </div>
      )}
  </div>
);
