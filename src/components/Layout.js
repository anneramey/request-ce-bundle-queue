import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import Sidebar from 'react-sidebar';
import { Header } from './Header';

export const Layout = ({
  sidebarOpen,
  isLarge,
  toggleSidebarOpen,
  setSidebarOpen,
  mainContent,
  sidebarContent,
}) =>
  <div className="layout">
    <Header toggleSidebarOpen={toggleSidebarOpen} />
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
  </div>;

export const mapStateToProps = state => ({
  isLarge: state.layout.get('isLayoutLarge'),
});

export const LayoutContainer = compose(
  connect(mapStateToProps),
  withState('sidebarOpen', 'setSidebarOpen', false),
  withHandlers({
    toggleSidebarOpen: props => () => props.setSidebarOpen(isOpen => !isOpen),
  }),
)(Layout);
