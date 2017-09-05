import { connect } from 'react-redux';
import { compose } from 'recompose';
import { is } from 'immutable';
import { FilterMenu } from './FilterMenu';
import { actions } from '../../redux/modules/filterMenu';

export const mapStateToProps = state => ({
  isOpen: state.filterMenu.get('isOpen'),
  activeSection: state.filterMenu.get('activeSection'),
  isDirty: !is(
    state.filterMenu.get('currentFilter'),
    state.filterMenu.get('initialFilter')),
});

export const mapDispatchToProps = {
  close: actions.close,
  showSection: actions.showSection,
};

export const FilterMenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(FilterMenu);
