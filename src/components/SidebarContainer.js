import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { Map } from 'immutable';
import { actions } from '../redux/modules/queue';
import { Sidebar } from './Sidebar';

const DEFAULT_FILTERS = ['Mine', 'Teammates', 'Unassigned'];
const isDefaultFilter = filter => DEFAULT_FILTERS.includes(filter.name);

const mapStateToProps = state => ({
  documentationUrl: state.app.documentationUrl,
  supportUrl: state.app.supportUrl,
  filters: state.app.filters,
  myFilters: state.app.myFilters,
  // The route prop below is just a way to make sure this component updates when
  // the route changes, otherwise connect implicitly prevents the update.
  route: `${state.router.location.pathname} ${state.router.location.search}`,
  defaultFilters: state.app.filters.filter(isDefaultFilter),
  pathname: state.router.location.pathname,
  counts: DEFAULT_FILTERS.reduce(
    (acc, filterName) => acc.set(filterName, state.queue.lists.get(filterName, []).size),
    Map(),
  ),
});

const mapDispatchToProps = {
  fetchList: actions.fetchList,
  openNewItemMenu: actions.openNewItemMenu,
};

export const SidebarContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      const match = matchPath(this.props.pathname, { path: '/list/:name' });
      this.props.defaultFilters
        .filter(filter => !match || filter.name !== match.params.name)
        .forEach(this.props.fetchList);
    },
  }),
)(Sidebar);
