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
  previewItem: state.queue.previewItem,
  sortDirection: state.queue.sortDirection,
  isSmallLayout: state.layout.get('size') === 'small',
});

const mapDispatchToProps = {
  openPreview: queueActions.openPreview,
  closePreview: queueActions.closePreview,
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
    handleGrabbed: props => updatedItem => {
      props.openPreview(updatedItem);
      props.fetchList(props.filter);
    },
    handleWorked: props => parameter => {
      props.fetchList(props.filter);
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
      if (this.props.pathname !== nextProps.pathname) {
        this.props.closePreview();
        this.props.fetchList(nextProps.filter);
      }
    },
    componentWillUnmount() {
      this.props.closePreview();
    },
  }),
)(QueueList);
