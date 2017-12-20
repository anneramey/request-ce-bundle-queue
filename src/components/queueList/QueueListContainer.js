import { compose, lifecycle, withHandlers, withProps } from 'recompose';
import { connect } from 'react-redux';
import { getFilterByPath } from '../../redux/modules/app';
import { actions as queueActions } from '../../redux/modules/queue';
import { actions as filterMenuActions } from '../../redux/modules/filterMenu';
import { QueueList } from './QueueList';

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  filter: getFilterByPath(state, state.router.location.pathname),
  queueItems: state.queue.lists.get(
    getFilterByPath(state, state.router.location.pathname),
  ),
  sortDirection: state.queue.sortDirection,
});

const mapDispatchToProps = {
  openFilterMenu: filterMenuActions.open,
  toggleSortDirection: queueActions.toggleSortDirection,
  fetchList: queueActions.fetchList,
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
