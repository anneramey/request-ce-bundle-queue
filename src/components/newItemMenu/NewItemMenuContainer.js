import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

import { selectMyTeamForms, selectAssignments } from '../../redux/modules/app';
import { actions } from '../../redux/modules/queue';
import { NewItemMenu } from './NewItemMenu';

const mapStateToProps = state => ({
  myTeamForms: !state.queue.newItemMenuOptions.get('parentId')
    ? selectMyTeamForms(state).filter(form => form.type === 'Task')
    : selectMyTeamForms(state).filter(
        form => form.type === 'Task' || form.type === 'Subtask',
      ),
  isOpen: state.queue.newItemMenuOpen,
  options: state.queue.newItemMenuOptions,
  assignments: selectAssignments(state).toJS(),
});

const mapDispatchToProps = {
  closeNewItemMenu: actions.closeNewItemMenu,
  fetchCurrentItem: actions.fetchCurrentItem,
};

const handleFormClick = ({ setCurrentForm }) => form => () =>
  setCurrentForm(form);
const handleAssignmentClick = ({ setAssignment }) => form => () =>
  setAssignment(form);
const handleSave = ({ kForm }) => () => kForm.submitPage();
const handleClosed = ({ setCurrentForm, setKForm, setAssignment }) => () => {
  setAssignment(null);
  setCurrentForm(null);
  setKForm(null);
};
const handleSelect = ({ setAssignment }) => (_value, state) =>
  setAssignment({
    'Assigned Individual': state.username,
    'Assigned Individual Display Name': state.displayName,
    'Assigned Team': state.team,
    'Assigned Team Display Name': state.team,
  });

const onFormLoaded = ({ setKForm }) => form => setKForm(form);

const onCreated = ({ options, fetchCurrentItem, closeNewItemMenu }) => (
  submission,
  actions,
) => {
  // Prevent loading the next page of the embedded form since we are just going
  // to close the dialog anyways.
  actions.stop();
  // If the new queue item that just was created has a parent we fetch the
  // parent again because we want its subtask list to contain this new queue
  // item.
  if (options.get('parentId')) {
    fetchCurrentItem(options.get('parentId'));
  }
  closeNewItemMenu();
};

export const NewItemMenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('currentAssignment', 'setAssignment', null),
  withState('currentForm', 'setCurrentForm', null),
  withState('kForm', 'setKForm', null),
  withHandlers({
    handleFormClick,
    handleAssignmentClick,
    handleSave,
    handleClosed,
    handleSelect,
    onFormLoaded,
    onCreated,
  }),
)(NewItemMenu);
