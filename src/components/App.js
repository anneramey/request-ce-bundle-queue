import React from 'react';
import 'npm-font-open-sans/open-sans.scss';
import 'bootstrap/scss/bootstrap.scss';
import '../styles/master.scss';
import { LayoutContainer } from './Layout';
import { Content } from './Content';
import { SidebarContainer } from './SidebarContainer';

export const App = () =>
  <div className="app">
    <LayoutContainer
      sidebarContent={<SidebarContainer />}
      mainContent={<Content />}
    />
  </div>;
