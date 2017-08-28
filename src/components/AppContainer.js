import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import 'npm-font-open-sans/open-sans.scss';
import 'bootstrap/scss/bootstrap.scss';
import '../styles/master.scss';
import { LayoutContainer } from './Layout';
import { Content } from './Content';
import { Sidebar } from './Sidebar';

export const App = () =>
  <div className="app">
    <LayoutContainer
      sidebarContent={<Sidebar />}
      mainContent={<Content />}
    />
  </div>;

export const AppContainer = compose(
  connect(null),
)(App);
