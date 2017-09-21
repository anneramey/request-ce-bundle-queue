import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { CoreForm } from 'react-kinetic-core';

export const WorkItemMenu = ({ isOpen, close, queueItem }) =>
  <Modal isOpen={isOpen} toggle={close}>
    <div className="modal-header">
      <h4 className="modal-title">
        <button type="button" className="btn btn-link" onClick={close}>Cancel</button>
        <span>Work It</span>
        <span />
      </h4>
    </div>
    <ModalBody>
      <CoreForm submission={queueItem.id} loaded={this.onFormLoaded} />
    </ModalBody>
    <ModalFooter>
      <button
        type="button"
        className="btn btn-primary"
      >
        Save Thing
      </button>
    </ModalFooter>
  </Modal>;

export const WorkItemMenuContainer = compose(
  withState('visible', 'setVisible', false),
  withHandlers({
    onFormLoaded: ({ setVisible }) => () => {
      setVisible(true);
    },
  }),
)(WorkItemMenu);
