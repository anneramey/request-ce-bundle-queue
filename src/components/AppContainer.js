import React from 'react';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/scss/master.scss';

import { actions } from '../redux/modules/profile';

import { CatalogContainer } from '../components/catalog/CatalogContainer';
import { CounterContainer } from '../components/counter/CounterContainer';
import { ProfileContainer } from '../components/profile/ProfileContainer';
import { Home } from '../components/home/Home';
import { FormSample } from '../components/FormSample';
import { TeamsContainer } from '../components/teams/TeamsContainer';
import { SystemErrorContainer } from '../components/systemError/SystemErrorContainer';
import { SubmissionsContainer } from '../components/submissions/SubmissionsContainer';

export const App = () =>
  <div className="layout">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/counter">Counter</Link></li>
      <li><Link to="/catalog">Catalog</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/form">Form Sample</Link></li>
      <li><Link to="/teams">Teams</Link></li>
      <li><Link to="/submissions">Submissions</Link></li>
    </ul>
    <hr />
    <Route exact path="/" component={Home} />
    <Route path="/system-error" component={SystemErrorContainer} />
    <Route path="/counter" component={CounterContainer} />
    <Route path="/catalog" component={CatalogContainer} />
    <Route path="/profile" component={ProfileContainer} />
    <Route path="/form" component={FormSample} />
    <Route path="/teams" component={TeamsContainer} />
    <Route path="/submissions" component={SubmissionsContainer} />
  </div>;

export const mapDispatchToProps = actions;

const hoc1 = lifecycle({
  componentWillMount() {
    this.props.fetchProfile();
  },
})(App);
const hoc2 = connect(null, mapDispatchToProps)(hoc1);
export const AppContainer = hoc2;
