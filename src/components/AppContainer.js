import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { actions } from '../redux/modules/app';

import { App } from './App';

const mapDispatchToProps = {
  loadAppSettings: actions.loadAppSettings,
};

export const AppContainer = compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.loadAppSettings();
    },
  }),
)(App);
