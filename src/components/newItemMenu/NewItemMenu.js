import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import { CoreForm } from 'react-kinetic-core';

const globals = import('../../globals');


const FormList = ({ myTeamForms, handleFormClick }) =>
  <ul className="list-group button-list">
    {
      myTeamForms.map(form =>
        <li
          key={form.slug}
          className="list-group-item"
        >
          <button
            type="button"
            className="btn btn-link"
            onClick={handleFormClick(form)}
          >
            <span className="button-title">
              {form.name}
            </span>
            <SVGInline svg={chevronRightIcon} className="icon" />
          </button>
        </li>)
    }
  </ul>;

export const NewItemMenu = ({
  isOpen,
  closeNewItemMenu,
  myTeamForms,
  currentForm,
  handleFormClick,
}) =>
  <Modal isOpen={isOpen} toggle={closeNewItemMenu}>
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
      {
        currentForm === null &&
        <button
          type="button"
          className="btn btn-link back-button"
          onClick={handleFormClick(null)}
        >
          <SVGInline svg={chevronLeftIcon} className="icon" />
          Forms
        </button>
      }
    </div>
    <ModalBody>
      {
        currentForm === null &&
        <FormList myTeamForms={myTeamForms} handleFormClick={handleFormClick} />
      }
      {
        currentForm !== null &&
        <div style={{ margin: '12px' }}>
          <CoreForm
            form={currentForm.slug}
            globals={globals}
          />
        </div>
      }
    </ModalBody>
  </Modal>;
