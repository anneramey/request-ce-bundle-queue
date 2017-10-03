import { compose, lifecycle, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';

import { actions as queueActions } from '../../redux/modules/queue';
import { actions as filterMenuActions } from '../../redux/modules/filterMenu';

import { QueueList } from './QueueList';

const mapStateToProps = (state, props) => ({
  filter: state.queue.currentFilter,
  filters: state.app.filters.merge(state.app.myFilters),
  queueItems: state.queue.lists.get(props.match.params.filter),
  workMenuOpen: state.queue.workMenuOpen,
  previewItem: state.queue.previewItem,
});

const mapDispatchToProps = {
  setCurrentFilter: queueActions.setCurrentFilter,
  openPreview: queueActions.openPreview,
  closePreview: queueActions.closePreview,
  openFilterMenu: filterMenuActions.open,
  openWorkMenu: queueActions.openWorkMenu,
  closeWorkMenu: queueActions.closeWorkMenu,
};

const selectFilter = (filters, filter) => filters.find(f => f.name === filter);

export const QueueListContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('openDropdownItem', 'setOpenDropdownItem', null),
  withState('workItem', 'setWorkItem', null),
  withHandlers({
    fetchCurrentFilter: ({ filters, match, setCurrentFilter }) => () => {
      const filter = selectFilter(filters, match.params.filter);
      if (filter) {
        setCurrentFilter(filter);
      }
    },
    openFilterMenu: props => () => props.openFilterMenu(props.filter),
    toggleItemMenu: ({ openDropdownItem, setOpenDropdownItem }) => item => () => {
      if (openDropdownItem) {
        setOpenDropdownItem(null);
      } else {
        setOpenDropdownItem(item);
      }
    },
    toggleWorkMenu: ({ workItem, setWorkItem, openWorkMenu, closeWorkMenu }) => item => () => {
      window.console.log('toggling work menu');
      if (workItem) {
        setWorkItem(null);
        closeWorkMenu();
      } else {
        window.console.log(item);
        setWorkItem(item);
        openWorkMenu();
      }
    },
    handleCompleted: ({ fetchCurrentFilter, closeWorkMenu }) => () => {
      fetchCurrentFilter();
      closeWorkMenu();
    },
    handleItemClick: ({ openPreview }) => item => () => openPreview(item),
  }),
  lifecycle({
    componentWillMount() {
      this.props.fetchCurrentFilter();
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.match.params.filter !== nextProps.match.params.filter) {
        const filter = selectFilter(this.props.filters, nextProps.match.params.filter);
        if (filter) {
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
