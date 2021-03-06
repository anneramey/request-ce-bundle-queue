import React from 'react';
import { Modal, ModalFooter } from 'reactstrap';
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
  filterName,
  handleChangeFilterName,
  handleSaveFilter,
  handleRemoveFilter,
  activeSection,
  applyFilterHandler,
  showSection,
  currentFilter,
  appliedAssignments,
  errors,
}) => (
  <Modal isOpen={isOpen} toggle={close}>
    <div className="modal-header">
      <h4 className="modal-title">
        <button type="button" className="btn btn-link" onClick={close}>
          Cancel
        </button>
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
      {activeSection !== null && (
        <button
          type="button"
          className="btn btn-link back-button icon-wrapper"
          onClick={() => showSection(null)}
        >
          <span className="icon">
            <span
              className="fa fa-chevron-left"
              style={{ color: '#7e8083', fontSize: '16px' }}
            />
          </span>
          Filters
        </button>
      )}
    </div>
    {activeSection === null && (
      <MainSection
        filter={currentFilter}
        showSection={showSection}
        filterName={filterName}
        handleChangeFilterName={handleChangeFilterName}
        handleSaveFilter={handleSaveFilter}
        handleRemoveFilter={handleRemoveFilter}
        appliedAssignments={appliedAssignments}
        errors={errors}
      />
    )}
    {activeSection === 'teams' && (
      <TeamsSectionContainer filter={currentFilter} teams={teams} />
    )}
    {activeSection === 'assignment' && (
      <AssignmentSectionContainer
        filter={currentFilter}
        errors={errors}
        appliedAssignments={appliedAssignments}
      />
    )}
    {activeSection === 'status' && (
      <StatusSectionContainer filter={currentFilter} />
    )}
    {activeSection === 'date' && (
      <DateRangeSectionContainer errors={errors} filter={currentFilter} />
    )}
    {activeSection === 'sort' && (
      <SortedBySectionContainer filter={currentFilter} />
    )}
    <ModalFooter>
      <button
        type="button"
        className="btn btn-primary"
        disabled={!isDirty || !errors.isEmpty()}
        onClick={applyFilterHandler}
      >
        Apply Filter
      </button>
    </ModalFooter>
  </Modal>
);
