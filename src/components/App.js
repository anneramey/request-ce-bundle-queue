import React from 'react';
import 'bootstrap/scss/bootstrap.scss';
import 'typeface-open-sans/index.css';
import '../styles/master.scss';
import { LayoutContainer } from './Layout';
import { Content } from './Content';
import { SidebarContainer } from './SidebarContainer';

export const App = ({ loading }) =>
  loading ? (
    <div />
  ) : (
    <div className="app">
      <LayoutContainer
        sidebarContent={<SidebarContainer />}
        mainContent={<Content />}
      />
    </div>
  );
