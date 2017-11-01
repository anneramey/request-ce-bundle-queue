import React from 'react';
import SVGInline from 'react-svg-inline';
import wallyHappyImage from '../../images/wally-happy.svg';
import wallyMissingImage from '../../images/wally-missing.svg';
import refreshIcon from 'font-awesome-svg-png/white/svg/refresh.svg';
import filterIcon from '../../images/filter.svg';
import sortAscIcon from '../../images/sort_asc.svg';
import sortDescIcon from '../../images/sort_desc.svg';
/* import { isItemComplete } from '../../redux/modules/queue'; */
import { QueueListItem } from './QueueListItem';
import { WorkItemMenuContainer } from '../WorkItemMenu';
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

export const QueueList = ({
  filter,
  queueItems,
  openFilterMenu,
  workMenuOpen,
  workItem,
  handleCompleted,
  openDropdownItem,
  handleItemClick,
  previewItem,
  closePreview,
  toggleItemMenu,
  toggleWorkMenu,
  profile,
  grabItem,
  sortDirection,
  toggleSortDirection,
  refresh,
}) => (
  <div className="two-panels">
    <div className="left-panel">
      {workItem && (
        <WorkItemMenuContainer
          close={toggleWorkMenu(null)}
          isOpen={workMenuOpen}
          queueItem={workItem}
          onCompleted={handleCompleted}
          review={workItem.coreState !== 'Draft'}
        />
      )}
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
            {queueItems.map(queueItem => (
              <QueueListItem
                key={queueItem.id}
                handleItemClick={handleItemClick}
                queueItem={queueItem}
                openDropdownItem={openDropdownItem}
                toggleItemMenu={toggleItemMenu}
                toggleWorkMenu={toggleWorkMenu}
                profile={profile}
                grabItem={grabItem}
              />
            ))}
          </ul>
        ) : (
          <WallyMessage filter={filter} />
        )}
      </div>
    </div>
    {previewItem && (
      <div className="right-panel">
        <QueueItemPreview
          queueItem={previewItem}
          closePreview={closePreview}
          toggleWorkMenu={toggleWorkMenu}
          profile={profile}
          grabItem={grabItem}
        />
      </div>
    )}
  </div>
);
