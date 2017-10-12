import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { CoreForm } from 'react-kinetic-core';

const globals = import('../globals');

/* eslint-disable */
export const WorkItemMenu = ({
  isOpen,
  close,
  queueItem,
  handleSave,
  onFormLoaded,
  onCompleted,
  visible,
  review
}) => (
  <Modal
    isOpen={isOpen}
    toggle={close}
    style={{ display: visible ? '' : 'none' }}
    size="lg"
  >
    <div className="modal-header">
      <h4 className="modal-title">
        <button type="button" className="btn btn-link" onClick={close}>
          Cancel
        </button>
        <span>Work It</span>
        <span />
      </h4>
    </div>
    <ModalBody>
      <div style={{ margin: '1em' }}>
        <CoreForm
          submission={queueItem.id}
          onLoaded={onFormLoaded}
          onCompleted={onCompleted}
          review={review}
          globals={globals}
        />
      </div>
    </ModalBody>
    <ModalFooter>
      <button type="button" className="btn btn-primary" onClick={handleSave}>
        Save {queueItem.form.name}
      </button>
    </ModalFooter>
  </Modal>
);

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
    }
  })
)(WorkItemMenu);
