import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import '../styles/scss/master.scss';

import { Home } from '../components/home/Home';
import { SystemErrorContainer } from '../components/systemError/SystemErrorContainer';

export const App = () =>
  <div className="layout">
    <ul>
      <li><Link to="/">Home</Link></li>
    </ul>
    <hr />
    <Route exact path="/" component={Home} />
    <Route path="/system-error" component={SystemErrorContainer} />
  </div>;

export const AppContainer = connect(null)(App);
