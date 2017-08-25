import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import 'bootstrap/scss/bootstrap.scss';
import '../styles/master.css';
import { Layout } from './Layout';

export const App = () =>
  <div className="app">
    <Layout />
  </div>;

export const AppContainer = compose(
  connect(null),
)(App);
