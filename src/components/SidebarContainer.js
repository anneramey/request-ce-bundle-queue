import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getFilterByPath } from '../redux/modules/app';
import { actions } from '../redux/modules/queue';
import { Sidebar } from './Sidebar';

const mapStateToProps = state => ({
  documentationUrl: state.app.documentationUrl,
  supportUrl: state.app.supportUrl,
  defaultFilters: state.app.filters,
  myFilters: state.app.myFilters,
  currentFilter: getFilterByPath(state, state.router.location.pathname),
  // The route prop below is just a way to make sure this component updates when
  // the route changes, otherwise connect implicitly prevents the update.
  route: `${state.router.location.pathname} ${state.router.location.search}`,
  counts: state.app.filters
    .toMap()
    .mapEntries(([_, filter]) => [
      filter.name,
      state.queue.getIn(['lists', filter], List()).size,
    ]),
});

const mapDispatchToProps = {
  fetchList: actions.fetchList,
  openNewItemMenu: actions.openNewItemMenu,
};

export const SidebarContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleOpenNewItemMenu: ({ openNewItemMenu }) => () => openNewItemMenu(),
  }),
  lifecycle({
    componentWillMount() {
      this.props.defaultFilters
        .filter(
          filter =>
            !this.props.currentFilter ||
            !filter.equals(this.props.currentFilter),
        )
        .forEach(this.props.fetchList);
    },
  }),
)(Sidebar);
