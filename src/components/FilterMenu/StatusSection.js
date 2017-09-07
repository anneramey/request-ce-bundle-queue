import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { ModalBody } from 'reactstrap';
import { actions } from '../../redux/modules/filterMenu';

export const StatusSection = ({ filter, toggleStatusHandler }) =>
  <ModalBody className="filter-section">
    <h5>Status</h5>
    <label htmlFor="filter-status-open">
      <input
        type="checkbox"
        id="filter-status-open"
        value="Open"
        checked={filter.status.includes('Open')}
        onChange={toggleStatusHandler}
      />
      Open
    </label>
    <label htmlFor="filter-status-pending">
      <input
        type="checkbox"
        id="filter-status-pending"
        value="Pending"
        checked={filter.status.includes('Pending')}
        onChange={toggleStatusHandler}
      />
      Pending
    </label>
    <label htmlFor="filter-status-complete">
      <input
        type="checkbox"
        id="filter-status-complete"
        value="Complete"
        checked={filter.status.includes('Complete')}
        onChange={toggleStatusHandler}
      />
      Complete
    </label>
    <label htmlFor="filter-status-canceled">
      <input
        type="checkbox"
        id="filter-status-canceled"
        value="Canceled"
        checked={filter.status.includes('Canceled')}
        onChange={toggleStatusHandler}
      />
      Canceled
    </label>
  </ModalBody>;

export const StatusSectionContainer = compose(
  connect(null, {
    toggleStatus: actions.toggleStatus,
  }),
  withHandlers({
    toggleStatusHandler: props => event => props.toggleStatus(event.target.value),
  }),
)(StatusSection);
