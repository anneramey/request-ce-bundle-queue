import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { kinopsModule } from 'react-kinops-common';
import { actions as toastActions } from 'react-kinops-common/toasts';
import { actions } from '../redux/modules/app';

import { App } from './App';

const mapStateToProps = state => ({
  loading: state.app.loading || state.kinops.loading,
});

const mapDispatchToProps = {
  loadApp: kinopsModule.actions.loadApp,
  loadAppSettings: actions.loadAppSettings,
  addError: toastActions.addError,
};

export const AppContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.loadApp();
      this.props.loadAppSettings();

      this.props.addError('sdflkjasdflkjsdflkjsdaflkjasdf');
    },
  }),
)(App);
