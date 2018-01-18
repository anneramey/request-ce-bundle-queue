import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { actions as kinopsActions } from 'react-kinops-common/kinops';
import { actions } from '../redux/modules/app';

import { App } from './App';

const mapStateToProps = state => ({
  loading: state.app.loading || state.kinops.loading,
});

const mapDispatchToProps = {
  loadApp: kinopsActions.loadApp,
  loadAppSettings: actions.loadAppSettings,
};

export const AppContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.loadApp();
      this.props.loadAppSettings();
    },
  }),
)(App);
