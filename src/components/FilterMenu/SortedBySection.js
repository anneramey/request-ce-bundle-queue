/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { ModalBody } from 'reactstrap';

const handleClick = event => window.console.log(event.target.value);

export const SortedBySection = () =>
  <ModalBody className="filter-section">
    <h5>Sorted By</h5>
    <label>
      <input type="radio" value="createdAt" name="sortedBy" onChange={handleClick} />
      Created At
    </label>
    <label>
      <input type="radio" value="updatedAt" name="sortedBy" onChange={handleClick} />
      Updated At
    </label>
    <label>
      <input type="radio" value="closedAt" name="sortedBy" onChange={handleClick} />
      Closed At
    </label>
    <label>
      <input type="radio" value="dueDate" name="sortedBy" onChange={handleClick} />
      Due Date
    </label>
  </ModalBody>;
