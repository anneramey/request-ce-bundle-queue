import React from 'react';
import { List } from 'immutable';
import { ModalBody } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';
import { SORT_OPTIONS } from '../FilterMenu/SortedBySection';

const ListSummary = ({ type, list }) =>
  list.size > 0 &&
  (list.size === 1 ? (
    <span>{list.get(0)}</span>
  ) : (
    <span>
      {list.size} {type}
    </span>
  ));

const AssignmentSummary = ({ assignments }) => {
  const appliedAssignments = List([
    assignments.mine && 'Mine',
    assignments.teammates && 'Teammates',
    assignments.unassigned && 'Unassigned'
  ]).filter(assignmentType => !!assignmentType);
  return (
    appliedAssignments.size > 0 &&
    (appliedAssignments.size === 1 ? (
      <span>{appliedAssignments.get(0)}</span>
    ) : (
      <span>{appliedAssignments.size} Presets</span>
    ))
  );
};

export const MainSection = ({ filter, showSection }) => (
  <ModalBody className="main-section">
    <ul className="list-group button-list">
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link icon-wrapper"
          onClick={() => showSection('teams')}
        >
          <span className="button-title">Teams</span>
          <ListSummary type="Teams" list={filter.teams} />
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link icon-wrapper"
          onClick={() => showSection('assignment')}
        >
          <span className="button-title">Assignment</span>
          <AssignmentSummary assignments={filter.assignments} />
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link icon-wrapper"
          onClick={() => showSection('status')}
        >
          <span className="button-title">Status</span>
          <ListSummary type="Statuses" list={filter.status} />
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link icon-wrapper"
          onClick={() => showSection('date')}
        >
          <span className="button-title">Date Range</span>
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link icon-wrapper"
          onClick={() => showSection('sort')}
        >
          <span className="button-title">Sorted By</span>
          <span>{SORT_OPTIONS.get(filter.sortBy).label}</span>
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
    </ul>
    <button type="button" className="btn btn-primary btn-inverse" disabled>
      Save
    </button>
  </ModalBody>
);
