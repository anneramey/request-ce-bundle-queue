import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

import { selectMyTeamForms } from '../../redux/modules/app';
import { actions } from '../../redux/modules/queue';
import { NewItemMenu } from './NewItemMenu';

const mapStateToProps = state => ({
  myTeamForms: selectMyTeamForms(state)
    .filter(form => form.type === 'Task'),
  isOpen: state.queue.newItemMenuOpen,
});

const mapDispatchToProps = ({
  closeNewItemMenu: actions.closeNewItemMenu,
});

const handleFormClick = ({ setCurrentForm }) => form => () => setCurrentForm(form);
const handleSave = ({ kForm }) => () => kForm.submitPage();
const onFormLoaded = ({ setKForm }) => form => setKForm(form);

export const NewItemMenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('currentForm', 'setCurrentForm', null),
  withState('kForm', 'setKForm', null),
  withHandlers({
    handleFormClick,
    handleSave,
    onFormLoaded,
  }),
)(NewItemMenu);
