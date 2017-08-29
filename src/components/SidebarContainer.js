import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Sidebar } from './Sidebar';

const mapStateToProps = state => ({
  documentationUrl: state.app.documentationUrl,
  supportUrl: state.app.supportUrl,
  filters: state.app.filters,
  myFilters: state.app.myFilters,
});

export const SidebarContainer = compose(
  connect(mapStateToProps),
)(Sidebar);
