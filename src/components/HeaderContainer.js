import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { List } from 'immutable';
import moment from 'moment';
import { Header } from './Header';
import { actions } from '../redux/modules/alerts';
import { actions as modalFormActions } from '../redux/modules/modalForm';

const HELP_FORM_CONFIG = {
  formSlug: 'help',
  kappSlug: 'admin',
  title: 'Get Help',
  confirmationMessage: "We'll get you a response as soon as possible."
};

const FEEDBACK_FORM_CONFIG = {
  formSlug: 'feedback',
  kappSlug: 'admin',
  title: 'Give Feedback',
  confirmationMessage:
    "Thanks for your feedback. We'll get that routed to the right team."
};

const INVITE_OTHERS_FORM_CONFIG = {
  formSlug: 'kinops-invite-others',
  kappSlug: 'admin',
  title: 'Invite Others',
  confirmationMessage: "We'll send those invitations out right away."
};

const KITCHEN_SINK_FORM_CONFIG = {
  formSlug: 'kitchen-sink-form',
  kappSlug: 'queue',
  title: 'Kitchen Sink',
  confirmationMessage: 'That was the kitchen sink, how fun.'
};

export const mapStateToProps = state => ({
  alerts: List(state.alerts.data)
    .filter(
      alert =>
        !alert.values['End Date Time'] ||
        moment(alert.values['End Date Time']).isAfter()
    )
    .filter(
      alert =>
        !alert.values['Start Date Time'] ||
        moment(alert.values['Start Date Time']).isBefore()
    )
    .sortBy(alert =>
      moment(alert.values['Start Date Time'] || alert.createdAt).unix()
    )
    .reverse(),
  profile: state.app.profile
});

const mapDispatchToProps = {
  fetchAlerts: actions.fetchAlerts,
  openForm: modalFormActions.openForm
};

export const HeaderContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    openHelpForm: props => () => props.openForm(HELP_FORM_CONFIG),
    openFeedbackForm: props => () => props.openForm(FEEDBACK_FORM_CONFIG),
    openInviteOthersForm: props => () =>
      props.openForm(INVITE_OTHERS_FORM_CONFIG),
    openKitchenSinkForm: props => () => props.openForm(KITCHEN_SINK_FORM_CONFIG)
  })
)(Header);
