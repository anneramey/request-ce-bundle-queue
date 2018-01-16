import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { actions } from '../redux/modules/app';
import Sidebar from 'react-sidebar';
import { HeaderContainer } from '../lib/react-kinops-components/src/components/Header/HeaderContainer';

export const Layout = ({
  sidebarOpen,
  isLarge,
  toggleSidebarOpen,
  setSidebarOpen,
  mainContent,
  sidebarContent,
}) => (
  <div className="layout">
    <HeaderContainer hasSidebar toggleSidebarOpen={toggleSidebarOpen} />
    <Sidebar
      sidebar={sidebarContent}
      shadow={false}
      open={sidebarOpen && !isLarge}
      docked={sidebarOpen && isLarge}
      onSetOpen={setSidebarOpen}
      sidebarClassName={`sidebar-content ${isLarge ? 'drawer' : 'overlay'}`}
    >
      {mainContent}
    </Sidebar>
  </div>
);

export const mapStateToProps = state => ({
  isLarge: state.app.layoutSize !== 'small',
  sidebarOpen: state.app.sidebarOpen,
});

const mapDispatchToProps = {
  setSidebarOpen: actions.setSidebarOpen,
};

export const LayoutContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    toggleSidebarOpen: props => () => props.setSidebarOpen(!props.sidebarOpen),
  }),
)(Layout);
