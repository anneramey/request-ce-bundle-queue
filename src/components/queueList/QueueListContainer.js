import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import { connect } from 'react-redux';

import { getFilterByPath } from '../../redux/modules/app';
import { actions as queueActions } from '../../redux/modules/queue';
import { actions as filterMenuActions } from '../../redux/modules/filterMenu';

import { QueueList } from './QueueList';

const mapStateToProps = (state, props) => ({
  filter: getFilterByPath(state, state.router.location.pathname),
  queueItems: state.queue.lists.get(
    getFilterByPath(state, state.router.location.pathname),
  ),
  workMenuOpen: state.queue.workMenuOpen,
  previewItem: state.queue.previewItem,
  sortDirection: state.queue.sortDirection,
  profile: state.app.profile,
});

const mapDispatchToProps = {
  openPreview: queueActions.openPreview,
  closePreview: queueActions.closePreview,
  openFilterMenu: filterMenuActions.open,
  openWorkMenu: queueActions.openWorkMenu,
  closeWorkMenu: queueActions.closeWorkMenu,
  toggleSortDirection: queueActions.toggleSortDirection,
  fetchList: queueActions.fetchList,
  updateQueueItem: queueActions.updateQueueItem,
};

export const QueueListContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ sortDirection, queueItems }) => ({
    queueItems: sortDirection === 'DESC' ? queueItems.reverse() : queueItems,
  })),
  withState('openDropdownItem', 'setOpenDropdownItem', null),
  withState('workItem', 'setWorkItem', null),
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
    handleCompleted: ({ filter, fetchList, closeWorkMenu }) => () => {
      fetchList(filter);
      closeWorkMenu();
    },
    handleItemClick: ({ openPreview }) => item => () => openPreview(item),
    refresh: ({ filter, fetchList }) => () => fetchList(filter),
  }),
  lifecycle({
    componentWillMount() {
      this.props.closePreview();
      this.props.fetchList(this.props.filter);
    },
    componentWillReceiveProps(nextProps) {
      if (!this.props.filter.equals(nextProps.filter)) {
        this.props.closePreview();
        this.props.fetchList(nextProps.filter);
      }
    },
    componentWillUnmount() {
      this.props.closeWorkMenu();
      this.props.closePreview();
    },
  }),
)(QueueList);
