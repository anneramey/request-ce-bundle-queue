import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import Sidebar from 'react-sidebar';
import { HeaderContainer } from './HeaderContainer';

export const Layout = ({
  sidebarOpen,
  isLarge,
  toggleSidebarOpen,
  setSidebarOpen,
  mainContent,
  sidebarContent,
}) => (
  <div className="layout">
    <HeaderContainer toggleSidebarOpen={toggleSidebarOpen} />
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
  isLarge: state.layout.get('isLayoutLarge'),
});

export const LayoutContainer = compose(
  connect(mapStateToProps),
  withState('sidebarOpen', 'setSidebarOpen', ({ isLarge }) => isLarge),
  withHandlers({
    toggleSidebarOpen: props => () => props.setSidebarOpen(isOpen => !isOpen),
  }),
)(Layout);
