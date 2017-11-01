import React from 'react';
import SVGInline from 'react-svg-inline';
import classNames from 'classnames';
import chevronRightIcon from 'font-awesome-svg-png/black/svg/chevron-right.svg';

export const AssignmentBadge = ({ queueItem, toggle, readOnly }) => (
  <div
    className={classNames('assignment-badge icon-wrapper', {
      'read-only': readOnly,
    })}
  >
    <span className="badge" onClick={toggle} role="button" tabIndex={0}>
      {queueItem.values['Assigned Team Display Name'].charAt(0)}
    </span>
    <div onClick={toggle} role="button" tabIndex={-1}>
      <div className="team">
        {queueItem.values['Assigned Team Display Name']}
      </div>
      <div className="individual">
        {queueItem.values['Assigned Individual Display Name']}
      </div>
    </div>
    {!readOnly && (
      <SVGInline
        svg={chevronRightIcon}
        className="icon"
        onClick={toggle}
        role="button"
        tabIndex={0}
      />
    )}
  </div>
);
