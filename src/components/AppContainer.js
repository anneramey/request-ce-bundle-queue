import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { actions as appActions } from '../lib/react-kinops-components';
import { actions } from '../redux/modules/app';
import { actions as alertsActions } from '../redux/modules/alerts';

import { App } from './App';

const mapStateToProps = state  => ({
  loading: state.app.loading || state.kinops.loading,
});

const mapDispatchToProps = {
  loadApp: appActions.loadApp,
  loadAppSettings: actions.loadAppSettings,
  fetchAlerts: alertsActions.fetchAlerts,
};

export const AppContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.loadApp();
      this.props.loadAppSettings();
      this.props.fetchAlerts();
    },
  }),
)(App);
