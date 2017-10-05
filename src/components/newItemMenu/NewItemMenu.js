import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';


export const NewItemMenu = ({ isOpen, closeNewItemMenu, myTeamForms }) =>
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
    </div>
    <ModalBody>
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
              >
                <span className="button-title">
                  {form.name}
                </span>
                <SVGInline svg={chevronRightIcon} className="icon" />
              </button>
            </li>)
        }
      </ul>
    </ModalBody>
  </Modal>;
