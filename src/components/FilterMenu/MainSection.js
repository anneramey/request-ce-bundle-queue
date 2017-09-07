import React from 'react';
import { ModalBody } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';

const ListSummary = ({ type, list }) =>
  list.size > 0 &&
  (
    list.size === 1
      ? <span>{list.get(0)}</span>
      : <span>{list.size} {type}</span>
  );

export const MainSection = ({ filter, showSection }) =>
  <ModalBody className="main-section">
    <ul className="list-group button-list">
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => showSection('teams')}
        >
          Teams
          <ListSummary type="Teams" list={filter.teams} />
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => showSection('assignment')}
        >
          Assignment
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => showSection('status')}
        >
          Status
          <ListSummary type="Statuses" list={filter.status} />
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => showSection('date')}
        >
          Date Range
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => showSection('sort')}
        >
          Sorted By
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
    </ul>
    <button type="button" className="btn btn-primary btn-inverse" disabled>
      Save
    </button>
  </ModalBody>;
