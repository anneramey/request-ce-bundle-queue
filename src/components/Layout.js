import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { actions } from '../redux/modules/app';
import Sidebar from 'react-sidebar';
import { HeaderContainer } from '../lib/react-kinops-components/src/components/Header/HeaderContainer';
import { Route, Redirect } from 'react-router-dom';
import { NotificationsContainer } from './notifications/NotificationsContainer';
import { FilterMenuContainer } from './FilterMenu/FilterMenuContainer';
import { QueueItemContainer } from './QueueItem/QueueItem';
import { QueueListContainer } from './queueList/QueueListContainer';
import { NewItemMenuContainer } from './newItemMenu/NewItemMenuContainer';
import { ModalFormContainer } from '../lib/react-kinops-components/src/components/Modals/ModalFormContainer';
import { WorkMenuContainer } from './WorkMenu';

export const Layout = ({
  sidebarOpen,
  isLarge,
  toggleSidebarOpen,
  setSidebarOpen,
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
      contentClassName="main-content"
    >
      <NotificationsContainer />
      <Route path="/" exact render={() => <Redirect to="/list/Mine" />} />
      <Route path="/list/:filter" component={QueueListContainer} />
      <Route path="/custom" component={QueueListContainer} />
      <Route path="/item/:id" component={QueueItemContainer} />
      <Route
        path="/queue/filter/__show__/details/:id/summary"
        render={({ match }) => <Redirect to={`/item/${match.params.id}`} />}
      />
      <FilterMenuContainer />
      <NewItemMenuContainer />
      <ModalFormContainer />
      <WorkMenuContainer />
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
