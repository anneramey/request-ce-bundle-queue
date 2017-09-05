/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { ModalBody } from 'reactstrap';

const handleClick = event => window.console.log(event.target.value);

export const DateRangeSection = () =>
  <ModalBody className="filter-section">
    <h5>Date Range</h5>
    <select value="">
      <option disabled value="">Sort Timeline</option>
      <option value="createdAt">Created At</option>
      <option value="updatedAt">Updated At</option>
      <option value="completedAt">Completed At</option>
    </select>
    <label>
      <input type="radio" value="7days" name="dateRangeSize" onChange={handleClick} />
      Last 7 Days
    </label>
    <label>
      <input type="radio" value="14days" name="dateRangeSize" onChange={handleClick} />
      Last 14 Days
    </label>
    <label>
      <input type="radio" value="30days" name="dateRangeSize" onChange={handleClick} />
      Last 30 Days
    </label>
    <label>
      <input type="radio" value="60days" name="dateRangeSize" onChange={handleClick} />
      Last 60 Days
    </label>
    <label>
      <input type="radio" value="90days" name="dateRangeSize" onChange={handleClick} />
      Last 90 Days
    </label>
    <label>
      <input type="radio" value="custom" name="dateRangeSize" onChange={handleClick} />
      Custom
    </label>
  </ModalBody>;
