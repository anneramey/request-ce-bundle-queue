import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import 'npm-font-open-sans/open-sans.scss';
import 'bootstrap/scss/bootstrap.scss';
import '../styles/master.scss';
import { LayoutContainer } from './Layout';

export const App = () =>
  <div className="app">
    <LayoutContainer />
  </div>;

export const AppContainer = compose(
  connect(null),
)(App);
