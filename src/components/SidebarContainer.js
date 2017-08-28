import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Sidebar } from './Sidebar';

const mapStateToProps = state => ({
  documentationUrl: state.app.documentationUrl,
  supportUrl: state.app.supportUrl,
});

export const SidebarContainer = compose(
  connect(mapStateToProps),
)(Sidebar);
