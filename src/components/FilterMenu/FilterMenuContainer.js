import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { is } from 'immutable';
import { push } from 'connected-react-router';
import { FilterMenu } from './FilterMenu';
import { actions } from '../../redux/modules/filterMenu';
import { actions as queueActions } from '../../redux/modules/queue';

export const mapStateToProps = state => ({
  teams: state.app.myTeams,
  isOpen: state.filterMenu.get('isOpen'),
  activeSection: state.filterMenu.get('activeSection'),
  currentFilter: state.filterMenu.get('currentFilter'),
  isDirty: !is(
    state.filterMenu.get('currentFilter'),
    state.filterMenu.get('initialFilter'),
  ),
});

export const mapDispatchToProps = {
  close: actions.close,
  reset: actions.reset,
  showSection: actions.showSection,
  setAdhocFilter: queueActions.setAdhocFilter,
  push,
};

export const FilterMenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    applyFilterHandler: props => () => {
      props.setAdhocFilter(
        props.currentFilter.set('name', '').set('type', 'adhoc'),
      );
      props.push('/custom');
      props.close();
    },
  }),
)(FilterMenu);
