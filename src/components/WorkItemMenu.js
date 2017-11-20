import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { CoreForm } from 'react-kinetic-core';

const globals = import('../globals');

/* eslint-disable */
export const WorkItemMenu = ({
  isOpen,
  closeModal,
  queueItem,
  handleSave,
  onFormLoaded,
  handleFormCompleted,
  completed,
  visible,
  review,
}) => (
  <Modal
    isOpen={isOpen}
    toggle={closeModal}
    style={{ display: visible ? '' : 'none' }}
    size="lg"
  >
    <div className="modal-header">
      <h4 className="modal-title">
        <button type="button" className="btn btn-link" onClick={closeModal}>
          Cancel
        </button>
        <span>{review ? 'Review' : 'Work'} It</span>
        <span />
      </h4>
    </div>
    <ModalBody>
      <div style={{ margin: '1em' }}>
        <CoreForm
          submission={queueItem.id}
          onLoaded={onFormLoaded}
          onCompleted={handleFormCompleted}
          review={review}
          globals={globals}
        />
      </div>
    </ModalBody>
    {!review &&
      !completed && (
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save {queueItem.form.name}
          </button>
        </ModalFooter>
      )}
  </Modal>
);

export const WorkItemMenuContainer = compose(
  withState('visible', 'setVisible', false),
  withState('form', 'setForm', null),
  withState('page', 'setPage', null),
  withState('completed', 'setCompleted', false),
  withHandlers({
    closeModal: ({ setPage, close, setVisible }) => () => {
      setPage(null);
      setVisible(false);
      close();
    },
  }),
  withHandlers({
    onFormLoaded: ({
      page,
      closeModal,
      setVisible,
      setForm,
      setPage,
    }) => form => {
      setVisible(true);
      setForm(form);

      if (page === null) {
        setPage(form.page().id());
      } else if (page === form.page().id()) {
        console.log('closing');

        closeModal();
      }
    },
    handleFormCompleted: ({ closeModal, onCompleted, setCompleted }) => (
      data,
      actions,
    ) => {
      // If a onCompleted handler was provided, call through to it.
      if (typeof onCompleted === 'function') {
        onCompleted(data, actions);
      }

      if (data.submission.currentPage === null) {
        closeModal();
      } else {
        setCompleted(true);
      }
    },
    handleSave: ({ form }) => () => {
      form.submitPage();
    },
  }),
)(WorkItemMenu);
