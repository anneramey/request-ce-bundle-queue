import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { CoreForm } from 'react-kinetic-core';

const globals = import('../../globals');

export const WorkItemMenu = ({ isOpen, close, queueItem, handleSave }) =>
  <Modal isOpen={isOpen} toggle={close}>
    <div className="modal-header">
      <h4 className="modal-title">
        <button type="button" className="btn btn-link" onClick={close}>Cancel</button>
        <span>Work It</span>
        <span />
      </h4>
    </div>
    <ModalBody>
      <CoreForm submission={queueItem.id} loaded={this.onFormLoaded} globals={globals} />
    </ModalBody>
    <ModalFooter>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSave}
      >
        Save Thing
      </button>
    </ModalFooter>
  </Modal>;

export const WorkItemMenuContainer = compose(
  withState('visible', 'setVisible', false),
  withState('form', 'setForm', null),
  withHandlers({
    onFormLoaded: ({ setVisible, setForm }) => form => {
      setVisible(true);
      setForm(form);
    },
    handleSave: ({ form }) => () => {
      form.submitPage();
    },
  }),
)(WorkItemMenu);
