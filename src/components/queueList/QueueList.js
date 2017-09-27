import React from 'react';
import SVGInline from 'react-svg-inline';
import refreshIcon from 'font-awesome-svg-png/white/svg/refresh.svg';
import filterIcon from '../../images/filter.svg';
import sortIcon from '../../images/sort.svg';
/* import { isItemComplete } from '../../redux/modules/queue'; */
import { QueueListItem } from './QueueListItem';
import { WorkItemMenuContainer } from '../WorkItemMenu';

export const QueueList = ({
  filter,
  queueItems,
  openFilterMenu,
  workMenuOpen,
  workItem,
  handleCompleted,
  openDropdownItem,
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
          <button type="button" className="btn btn-link">
            <SVGInline svg={refreshIcon} className="icon" />
          </button>
          <button type="button" className="btn btn-link">
            <SVGInline svg={sortIcon} className="icon" />
          </button>
          <button type="button" className="btn btn-link" onClick={openFilterMenu}>
            <SVGInline svg={filterIcon} className="icon" />
          </button>
        </div>
      </div>
      <div className="submissions">
        <ul className="list-group">
          {
            queueItems.map(queueItem =>
              <QueueListItem
                key={queueItem.id}
                queueItem={queueItem}
                openDropdownItem={openDropdownItem}
                toggleItemMenu={toggleItemMenu}
                toggleWorkMenu={toggleWorkMenu}
              />)
          }
        </ul>
      </div>
    </div>
    <div className="right-panel">
      <p>Preview Assignment</p>
    </div>
  </div>;
