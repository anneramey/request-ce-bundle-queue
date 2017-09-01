import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Sidebar } from './Sidebar';

const mapStateToProps = state => ({
  documentationUrl: state.app.documentationUrl,
  supportUrl: state.app.supportUrl,
  filters: state.app.filters,
  myFilters: state.app.myFilters,
  // The route prop below is just a way to make sure this component updates when
  // the route changes, otherwise connect implicitly prevents the update.
  route: `${state.router.location.pathname} ${state.router.location.search}`,
});

export const SidebarContainer = compose(
  connect(mapStateToProps),
)(Sidebar);
