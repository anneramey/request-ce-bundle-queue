import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { actions } from '../redux/modules/app';

import { App } from './App';

const mapStateToProps = ({ app }) => ({
  loading: app.loading,
});

const mapDispatchToProps = {
  loadAppSettings: actions.loadAppSettings,
};

export const AppContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.loadAppSettings();
    },
  }),
)(App);
