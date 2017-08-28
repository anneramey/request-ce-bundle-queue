import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import 'bootstrap/scss/bootstrap.scss';
import 'typeface-open-sans/index.css';
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
