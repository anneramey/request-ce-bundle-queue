import React from 'react';
import { Modal, ModalFooter } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import { MainSection } from './MainSection';
import { AssignmentSectionContainer } from './AssignmentSection';
import { TeamsSectionContainer } from './TeamsSection';
import { StatusSectionContainer } from './StatusSection';
import { DateRangeSectionContainer } from './DateRangeSection';
import { SortedBySectionContainer } from './SortedBySection';

export const FilterMenu = ({
  teams,
  isOpen,
  isDirty,
  close,
  reset,
  activeSection,
  applyFilterHandler,
  showSection,
  currentFilter,
}) =>
  <Modal isOpen={isOpen} toggle={close}>
    <div className="modal-header">
      <h4 className="modal-title">
        <button type="button" className="btn btn-link" onClick={close}>Cancel</button>
        <span>Filters</span>
        <button
          type="button"
          className="btn btn-link"
          disabled={!isDirty}
          onClick={reset}
        >
          Reset
        </button>
      </h4>
      {
        activeSection !== null &&
        <button
          type="button"
          className="btn btn-link back-button icon-wrapper"
          onClick={() => showSection(null)}
        >
          <SVGInline svg={chevronLeftIcon} className="icon" />
          Filters
        </button>
      }
    </div>
    { activeSection === null && <MainSection filter={currentFilter} showSection={showSection} />}
    { activeSection === 'teams' && <TeamsSectionContainer filter={currentFilter} teams={teams} /> }
    { activeSection === 'assignment' && <AssignmentSectionContainer filter={currentFilter} /> }
    { activeSection === 'status' && <StatusSectionContainer filter={currentFilter} /> }
    { activeSection === 'date' && <DateRangeSectionContainer filter={currentFilter} /> }
    { activeSection === 'sort' && <SortedBySectionContainer filter={currentFilter} /> }
    {
      activeSection === null &&
      <ModalFooter>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!isDirty}
          onClick={applyFilterHandler}
        >
          Apply Filter
        </button>
      </ModalFooter>
    }
  </Modal>;
