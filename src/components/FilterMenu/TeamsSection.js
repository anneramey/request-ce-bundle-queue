/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { ModalBody } from 'reactstrap';

const handleClick = event => window.console.log(event.target.value);

export const TeamsSection = () =>
  <ModalBody className="filter-section">
    <h5>Teams</h5>
    <label>
      <input type="checkbox" value="IT" onChange={handleClick} />
      IT
    </label>
    <label>
      <input type="checkbox" value="IT" onChange={handleClick} />
      HR
    </label>
    <label className="checked">
      <input type="checkbox" value="IT" onChange={handleClick} />
      Facilities
    </label>
  </ModalBody>;
