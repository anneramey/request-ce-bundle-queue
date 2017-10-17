import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import { connect } from 'react-redux';

import { actions as queueActions } from '../../redux/modules/queue';
import { actions as filterMenuActions } from '../../redux/modules/filterMenu';

import { QueueList } from './QueueList';

const mapStateToProps = (state, props) => ({
  filter: state.queue.currentFilter,
  filters: state.app.filters.concat(state.app.myFilters),
  queueItems: state.queue.lists.get(props.match.params.filter),
  workMenuOpen: state.queue.workMenuOpen,
  previewItem: state.queue.previewItem,
  sortDirection: state.queue.sortDirection,
  profile: state.app.profile,
});

const mapDispatchToProps = {
  setCurrentFilter: queueActions.setCurrentFilter,
  openPreview: queueActions.openPreview,
  closePreview: queueActions.closePreview,
  openFilterMenu: filterMenuActions.open,
  openWorkMenu: queueActions.openWorkMenu,
  closeWorkMenu: queueActions.closeWorkMenu,
  toggleSortDirection: queueActions.toggleSortDirection,
  fetchList: queueActions.fetchList,
  updateQueueItem: queueActions.updateQueueItem,
};

const selectFilter = (filters, filter) => filters.find(f => f.name === filter);

export const QueueListContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ sortDirection, queueItems }) => ({
    queueItems: sortDirection === 'DESC' ? queueItems.reverse() : queueItems,
  })),
  withState('openDropdownItem', 'setOpenDropdownItem', null),
  withState('workItem', 'setWorkItem', null),
  withHandlers({
    fetchCurrentFilter: ({ filters, match, setCurrentFilter }) => () => {
      const filter = selectFilter(filters, match.params.filter);
      if (filter) {
        setCurrentFilter(filter);
      }
    },
  }),
  withHandlers({
    openFilterMenu: props => () => props.openFilterMenu(props.filter),
    toggleItemMenu: ({
      openDropdownItem,
      setOpenDropdownItem,
    }) => item => () => {
      if (openDropdownItem) {
        setOpenDropdownItem(null);
      } else {
        setOpenDropdownItem(item);
      }
    },
    toggleWorkMenu: ({
      workItem,
      setWorkItem,
      openWorkMenu,
      closeWorkMenu,
    }) => item => () => {
      if (workItem) {
        setWorkItem(null);
        closeWorkMenu();
      } else {
        setWorkItem(item);
        openWorkMenu();
      }
    },
    grabItem: ({ filter, profile, updateQueueItem }) => item => () => {
      updateQueueItem({
        id: item.id,
        values: {
          'Assigned Individual': profile.username,
          'Assigned Individual Display Name': profile.displayName,
        },
        successAction: updatedItem => [
          queueActions.openPreview(updatedItem),
          queueActions.fetchList(filter),
        ],
      });
    },
    handleCompleted: ({ fetchCurrentFilter, closeWorkMenu }) => () => {
      fetchCurrentFilter();
      closeWorkMenu();
    },
    handleItemClick: ({ openPreview }) => item => () => openPreview(item),
    refresh: ({ filter, fetchList }) => () => fetchList(filter),
  }),
  lifecycle({
    componentWillMount() {
      this.props.closePreview();
      this.props.fetchCurrentFilter();
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.match.params.filter !== nextProps.match.params.filter) {
        const filter = selectFilter(
          this.props.filters,
          nextProps.match.params.filter,
        );
        if (filter) {
          this.props.closePreview();
          this.props.setCurrentFilter(filter);
        }
      }
    },
    componentWillUnmount() {
      this.props.closeWorkMenu();
      this.props.closePreview();
    },
  }),
)(QueueList);
