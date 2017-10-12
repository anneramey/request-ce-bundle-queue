import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import { CoreForm } from 'react-kinetic-core';
import { AssignmentSelector } from '../QueueItem/AssignmentSelector';

const globals = import('../../globals');

const FormList = ({ myTeamForms, handleFormClick }) => (
  <ul className="list-group button-list">
    {myTeamForms.map(form => (
      <li key={form.slug} className="list-group-item">
        <button
          type="button"
          className="btn btn-link"
          onClick={handleFormClick(form)}
        >
          <span className="button-title">{form.name}</span>
          <SVGInline svg={chevronRightIcon} className="icon" />
        </button>
      </li>
    ))}
  </ul>
);

const AssignmentList = ({ assignments, handleSelect }) => (
  <AssignmentSelector assignments={assignments} onSelect={handleSelect} />
);

const FormsBackButton = ({ handleFormClick }) => (
  <button
    type="button"
    className="btn btn-link back-button icon-wrapper"
    onClick={handleFormClick(null)}
  >
    <SVGInline svg={chevronLeftIcon} className="icon" />
    Forms
  </button>
);

const AssignmentBackButton = ({ handleAssignmentClick }) => (
  <button
    type="button"
    className="btn btn-link back-button icon-wrapper"
    onClick={handleAssignmentClick(null)}
  >
    <SVGInline svg={chevronLeftIcon} className="icon" />
    Assignment
  </button>
);

export const NewItemMenu = ({
  isOpen,
  closeNewItemMenu,
  assignments,
  myTeamForms,
  currentAssignment,
  currentForm,
  kForm,
  onFormLoaded,
  handleFormClick,
  handleAssignmentClick,
  handleSave,
  handleClosed,
  handleSelect,
}) => (
  <Modal
    isOpen={isOpen}
    toggle={closeNewItemMenu}
    onExit={handleClosed}
    size="lg"
  >
    <div className="modal-header">
      <h4 className="modal-title">
        <button
          type="button"
          className="btn btn-link"
          onClick={closeNewItemMenu}
        >
          Cancel
        </button>
        <span>Forms</span>
        <span>&nbsp;</span>
      </h4>
      {currentForm !== null &&
        currentAssignment === null && (
          <FormsBackButton handleFormClick={handleFormClick} />
        )}
      {currentForm !== null &&
        currentAssignment !== null && (
          <AssignmentBackButton handleAssignmentClick={handleAssignmentClick} />
        )}
    </div>
    <ModalBody>
      {currentForm === null && (
        <FormList myTeamForms={myTeamForms} handleFormClick={handleFormClick} />
      )}
      {currentForm !== null &&
        currentAssignment === null && (
          <AssignmentList
            assignments={assignments}
            handleSelect={handleSelect}
          />
        )}
      {currentForm !== null &&
        currentAssignment !== null && (
          <div style={{ margin: '12px' }}>
            <CoreForm
              form={currentForm.slug}
              globals={globals}
              values={currentAssignment}
              onLoaded={onFormLoaded}
            />
          </div>
        )}
    </ModalBody>
    {currentForm !== null &&
      kForm !== null && (
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save {currentForm.name}
          </button>
        </ModalFooter>
      )}
  </Modal>
);
