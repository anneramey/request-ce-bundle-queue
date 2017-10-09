import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

import { selectMyTeamForms, selectAssignments } from '../../redux/modules/app';
import { actions } from '../../redux/modules/queue';
import { NewItemMenu } from './NewItemMenu';

const mapStateToProps = state => ({
  myTeamForms: selectMyTeamForms(state)
    .filter(form => form.type === 'Task'),
  isOpen: state.queue.newItemMenuOpen,
  assignments: selectAssignments(state).toJS(),
});

const mapDispatchToProps = ({
  closeNewItemMenu: actions.closeNewItemMenu,
});

const handleFormClick = ({ setCurrentForm }) => form => () => setCurrentForm(form);
const handleSave = ({ kForm }) => () => kForm.submitPage();
const handleClosed = ({ setCurrentForm, setKForm }) => () => {
  setCurrentForm(null);
  setKForm(null);
};
const handleSelect = ({ setAssignment }) => (_value, state) => setAssignment({
  'Assigned Individual': state.username,
  'Assigned Individual Display Name': state.displayName,
  'Assigned Team': state.team,
  'Assigned Team Display Name': state.team,
});

const onFormLoaded = ({ setKForm }) => form => setKForm(form);

export const NewItemMenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('currentAssignment', 'setAssignment', null),
  withState('currentForm', 'setCurrentForm', null),
  withState('kForm', 'setKForm', null),
  withHandlers({
    handleFormClick,
    handleSave,
    handleClosed,
    handleSelect,
    onFormLoaded,
  }),
)(NewItemMenu);
