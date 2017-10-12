import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { actions } from '../redux/modules/app';
import { actions as alertsActions } from '../redux/modules/alerts';

import { App } from './App';

const mapStateToProps = ({ app }) => ({
  loading: app.loading,
});

const mapDispatchToProps = {
  loadAppSettings: actions.loadAppSettings,
  fetchAlerts: alertsActions.fetchAlerts,
};

export const AppContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.loadAppSettings();
      this.props.fetchAlerts();
    },
  }),
)(App);
