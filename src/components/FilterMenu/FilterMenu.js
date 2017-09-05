import React from 'react';
import { Modal, ModalFooter } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import { MainSection } from './MainSection';
import { AssignmentSection } from './AssignmentSection';
import { TeamsSection } from './TeamsSection';
import { StatusSection } from './StatusSection';
import { DateRangeSection } from './DateRangeSection';
import { SortedBySection } from './SortedBySection';

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
    { activeSection === null && <MainSection showSection={showSection} />}
    { activeSection === 'assignment' && <AssignmentSection /> }
    { activeSection === 'teams' && <TeamsSection /> }
    { activeSection === 'status' && <StatusSection /> }
    { activeSection === 'date' && <DateRangeSection /> }
    { activeSection === 'sort' && <SortedBySection /> }
    {
      activeSection === null &&
      <ModalFooter>
        <button type="button" className="btn btn-primary" disabled>Apply Filter</button>
      </ModalFooter>
    }
  </Modal>;
