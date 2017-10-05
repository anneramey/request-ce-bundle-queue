import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

import { selectMyTeamForms } from '../../redux/modules/app';
import { actions } from '../../redux/modules/queue';
import { NewItemMenu } from './NewItemMenu';

const mapStateToProps = state => ({
  myTeamForms: selectMyTeamForms(state),
  isOpen: state.queue.newItemMenuOpen,
});

const mapDispatchToProps = ({
  closeNewItemMenu: actions.closeNewItemMenu,
});

const handleFormClick = ({ setCurrentForm }) => form => () => setCurrentForm(form);

export const NewItemMenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('currentForm', 'setCurrentForm', null),
  withHandlers({
    handleFormClick,
  }),
)(NewItemMenu);
