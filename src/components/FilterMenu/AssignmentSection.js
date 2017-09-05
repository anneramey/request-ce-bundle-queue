/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { ModalBody } from 'reactstrap';

const handleClick = event => window.console.log(event.target.value);

export const AssignmentSection = () =>
  <ModalBody className="filter-section">
    <h5>Assignment</h5>
    <label>
      <input type="checkbox" value="mine" onChange={handleClick} />
      Mine
    </label>
    <label>
      <input type="checkbox" value="teammates" onChange={handleClick} />
      Teammates
    </label>
    <label className="checked">
      <input type="checkbox" value="unassigned" onChange={handleClick} />
      Unassigned
    </label>
  </ModalBody>;
