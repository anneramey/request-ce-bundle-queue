import { compose, lifecycle, withHandlers, withProps } from 'recompose';
import { connect } from 'react-redux';
import { getFilterByPath } from '../../redux/modules/app';
import {
  actions as queueActions,
  selectQueueItemPage,
} from '../../redux/modules/queue';
import { actions as filterMenuActions } from '../../redux/modules/filterMenu';
import { QueueList } from './QueueList';

const mapStateToProps = state => {
  const filter = getFilterByPath(state, state.router.location.pathname);
  const queueItems = selectQueueItemPage(state);
  const currentList = state.queue.lists.get(filter);
  const totalItems = currentList ? currentList.size : 0;

  return {
    pathname: state.router.location.pathname,
    filter,
    queueItems,
    totalItems,
    hasPrevPage: state.queue.offset !== 0,
    hasNextPage: totalItems > state.queue.limit + state.queue.offset,
    statusMessage: state.queue.statuses.get(filter),
    sortDirection: state.queue.sortDirection,
    sortBy: filter.sortBy,
  };
};

const mapDispatchToProps = {
  openFilterMenu: filterMenuActions.open,
  toggleSortDirection: queueActions.toggleSortDirection,
  fetchList: queueActions.fetchList,
  gotoPrevPage: queueActions.gotoPrevPage,
  gotoNextPage: queueActions.gotoNextPage,
};

export const QueueListContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ sortDirection, queueItems }) => ({
    queueItems: sortDirection === 'DESC' ? queueItems.reverse() : queueItems,
  })),
  withHandlers({
    openFilterMenu: props => () => props.openFilterMenu(props.filter),
    refresh: ({ filter, fetchList }) => () => fetchList(filter),
  }),
  lifecycle({
    componentWillMount() {
      this.props.fetchList(this.props.filter);
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.pathname !== nextProps.pathname) {
        this.props.fetchList(nextProps.filter);
      }
    },
  }),
)(QueueList);
