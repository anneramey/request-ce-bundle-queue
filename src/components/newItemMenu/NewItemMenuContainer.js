import { connect } from 'react-redux';
import { compose } from 'recompose';

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

export const NewItemMenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(NewItemMenu);
