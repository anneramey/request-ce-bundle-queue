import React from 'react';
import SVGInline from 'react-svg-inline';
import refreshIcon from 'font-awesome-svg-png/white/svg/refresh.svg';
import filterIcon from '../../images/filter.svg';
import sortIcon from '../../images/sort.svg';
/* import { isItemComplete } from '../../redux/modules/queue'; */
import { QueueListItem } from './QueueListItem';
import { WorkItemMenuContainer } from '../WorkItemMenu';
import { QueueItemPreview } from './QueueItemPreview';

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
}) =>
  <div className="two-panels">
    <div className="left-panel">
      {workItem && <WorkItemMenuContainer
        close={toggleWorkMenu(null)}
        isOpen={workMenuOpen}
        queueItem={workItem}
        onCompleted={handleCompleted}
      />}
      <div className="controls">
        <h6>
          {filter.name}
          <br />
          <small>by Due Date</small>
        </h6>
        <div className="buttons">
          <button type="button" className="btn btn-link icon-wrapper">
            <SVGInline svg={refreshIcon} className="icon" />
          </button>
          <button type="button" className="btn btn-link icon-wrapper">
            <SVGInline svg={sortIcon} className="icon" />
          </button>
          <button type="button" className="btn btn-link icon-wrapper" onClick={openFilterMenu}>
            <SVGInline svg={filterIcon} className="icon" />
          </button>
        </div>
      </div>
      <div className="submissions">
        {
          queueItems &&
          <ul className="list-group">
            {
              queueItems.map(queueItem =>
                <QueueListItem
                  key={queueItem.id}
                  handleItemClick={handleItemClick}
                  queueItem={queueItem}
                  openDropdownItem={openDropdownItem}
                  toggleItemMenu={toggleItemMenu}
                  toggleWorkMenu={toggleWorkMenu}
                />)
            }
          </ul>
        }
      </div>
    </div>
    {previewItem && <div className="right-panel">
      <QueueItemPreview queueItem={previewItem} closePreview={closePreview} />
    </div>}
  </div>;
