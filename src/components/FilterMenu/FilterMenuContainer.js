import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { is } from 'immutable';
import { push } from 'connected-react-router';
import { FilterMenu } from './FilterMenu';
import { actions } from '../../redux/modules/filterMenu';
import { actions as queueActions } from '../../redux/modules/queue';
import { actions as appActions } from '../../redux/modules/app';

export const mapStateToProps = state => ({
  teams: state.app.myTeams,
  isOpen: state.filterMenu.get('isOpen'),
  activeSection: state.filterMenu.get('activeSection'),
  currentFilter: state.filterMenu.get('currentFilter'),
  isDirty: !is(
    state.filterMenu.get('currentFilter'),
    state.filterMenu.get('initialFilter'),
  ),
  filterName: state.filterMenu.get('filterName'),
});

export const mapDispatchToProps = {
  close: actions.close,
  reset: actions.reset,
  setFilterName: actions.setFilterName,
  showSection: actions.showSection,
  setAdhocFilter: queueActions.setAdhocFilter,
  fetchList: queueActions.fetchList,
  addPersonalFilter: appActions.addPersonalFilter,
  updatePersonalFilter: appActions.updatePersonalFilter,
  removePersonalFilter: appActions.removePersonalFilter,
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
    handleSaveFilter: ({
      addPersonalFilter,
      updatePersonalFilter,
      fetchList,
      currentFilter,
      filterName,
      push,
      close,
    }) => () => {
      if (
        currentFilter.type === 'custom' &&
        currentFilter.name === filterName
      ) {
        // Update Personal Filter
        updatePersonalFilter(currentFilter);
        fetchList(currentFilter);
      } else {
        addPersonalFilter(
          currentFilter.set('name', filterName).set('type', 'custom'),
        );
        push(`/custom/${filterName}`);
      }

      close();
    },
    handleChangeFilterName: ({ setFilterName }) => e =>
      setFilterName(e.target.value),
  }),
)(FilterMenu);
