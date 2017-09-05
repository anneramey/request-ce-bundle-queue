/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { ModalBody } from 'reactstrap';

const handleClick = event => window.console.log(event.target.value);

export const StatusSection = () =>
  <ModalBody className="filter-section">
    <h5>Status</h5>
    <label>
      <input type="checkbox" value="Open" onChange={handleClick} />
      Open
    </label>
    <label>
      <input type="checkbox" value="Pending" onChange={handleClick} />
      Pending
    </label>
    <label className="checked">
      <input type="checkbox" value="Complete" onChange={handleClick} />
      Complete
    </label>
    <label className="checked">
      <input type="checkbox" value="Canceled" onChange={handleClick} />
      Canceled
    </label>
  </ModalBody>;
