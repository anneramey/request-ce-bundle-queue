import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import { actions } from '../redux/modules/app';

import { App } from './App';

const mapDispatchToProps = {
  loadKappSettings: actions.loadKappSettings,
};

export const AppContainer = compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.loadKappSettings();
    },
  }),
)(App);
