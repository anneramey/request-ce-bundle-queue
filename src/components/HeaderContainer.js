import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Header } from './Header';
import { actions } from '../redux/modules/alerts';

export const mapStateToProps = state => ({
  alerts: state.alerts.data,
  profile: state.app.profile,
});

const mapDispatchToProps = {
  fetchAlerts: actions.fetchAlerts,
};

export const HeaderContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Header);
