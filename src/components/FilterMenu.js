/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import checkIcon from 'font-awesome-svg-png/black/svg/check.svg';

export const DefaultSection = ({ showSection }) =>
  <ModalBody>
    <ul className="list-group button-list">
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
          onClick={() => showSection('teams')}
        >
          Teams
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
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => showSection('date')}
        >
          Date
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

export const AssignmentSection = () =>
  <ModalBody>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia
      suscipit felis non interdum. Suspendisse potenti. Duis id ex non odio
      venenatis venenatis. Fusce non eros leo. Nulla porttitor dolor sit amet nibh
      ornare, ut efficitur nunc sagittis. Nulla nisi magna, eleifend at orci sed,
      lacinia mollis diam. Praesent tempor cursus massa id porttitor. Fusce ac
      odio consequat justo congue volutpat vitae eu ipsum. Integer at metus nec
      arcu vehicula ultricies. Suspendisse non egestas elit. Aliquam a ligula orci.
      <hr />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia
      suscipit felis non interdum. Suspendisse potenti. Duis id ex non odio
      venenatis venenatis. Fusce non eros leo. Nulla porttitor dolor sit amet nibh
      ornare, ut efficitur nunc sagittis. Nulla nisi magna, eleifend at orci sed,
      lacinia mollis diam. Praesent tempor cursus massa id porttitor. Fusce ac
      odio consequat justo congue volutpat vitae eu ipsum. Integer at metus nec
      arcu vehicula ultricies. Suspendisse non egestas elit. Aliquam a ligula orci.
      <hr />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia
      suscipit felis non interdum. Suspendisse potenti. Duis id ex non odio
      venenatis venenatis. Fusce non eros leo. Nulla porttitor dolor sit amet nibh
      ornare, ut efficitur nunc sagittis. Nulla nisi magna, eleifend at orci sed,
      lacinia mollis diam. Praesent tempor cursus massa id porttitor. Fusce ac
      odio consequat justo congue volutpat vitae eu ipsum. Integer at metus nec
      arcu vehicula ultricies. Suspendisse non egestas elit. Aliquam a ligula orci.
      <hr />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia
      suscipit felis non interdum. Suspendisse potenti. Duis id ex non odio
      venenatis venenatis. Fusce non eros leo. Nulla porttitor dolor sit amet nibh
      ornare, ut efficitur nunc sagittis. Nulla nisi magna, eleifend at orci sed,
      lacinia mollis diam. Praesent tempor cursus massa id porttitor. Fusce ac
      odio consequat justo congue volutpat vitae eu ipsum. Integer at metus nec
      arcu vehicula ultricies. Suspendisse non egestas elit. Aliquam a ligula orci.
    </p>
  </ModalBody>;

const handleClick = event => window.console.log(event.target.value);

export const TeamsSection = () =>
  <ModalBody className="teams-filter">
    <h5>Teams</h5>
    <label>
      <SVGInline svg={checkIcon} className="icon" />
      IT
      <input type="checkbox" value="IT" onChange={handleClick} />
    </label>
    <label>
      <SVGInline svg={checkIcon} className="icon" />
      HR
      <input type="checkbox" value="IT" onChange={handleClick} />
    </label>
    <label className="checked">
      <SVGInline svg={checkIcon} className="icon" />
      Facilities
      <input type="checkbox" value="IT" onChange={handleClick} />
    </label>
  </ModalBody>;

export const StatusSection = () =>
  <ModalBody>
    Status Section
  </ModalBody>;

export const DateSection = () =>
  <ModalBody>
    Date Section
  </ModalBody>;

export const SortedBySection = () =>
  <ModalBody>
    Sorted By Section
  </ModalBody>;

export const FilterMenu = ({ isOpen, close, activeSection, showSection }) =>
  <Modal isOpen={isOpen} toggle={close}>
    <div className="modal-header">
      <h4 className="modal-title">
        <button type="button" className="btn btn-link" onClick={close}>Cancel</button>
        <span>Filters</span>
        <button type="button" className="btn btn-link disabled">Reset</button>
      </h4>
      {
        activeSection !== null &&
        <button
          type="button"
          className="btn btn-link back-button"
          onClick={() => showSection(null)}
        >
          <SVGInline svg={chevronLeftIcon} className="icon" />
          Filters
        </button>
      }
    </div>
    { activeSection === null && <DefaultSection showSection={showSection} />}
    { activeSection === 'assignment' && <AssignmentSection /> }
    { activeSection === 'teams' && <TeamsSection /> }
    { activeSection === 'status' && <StatusSection /> }
    { activeSection === 'date' && <DateSection /> }
    { activeSection === 'sort' && <SortedBySection /> }
    {
      activeSection === null &&
      <ModalFooter>
        <button type="button" className="btn btn-primary" disabled>Apply Filter</button>
      </ModalFooter>
    }
  </Modal>;
