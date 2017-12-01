import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import SVGInline from 'react-svg-inline';
import Avatar from 'react-avatar';
import plusIcon from 'font-awesome-svg-png/black/svg/plus.svg';
import { actions } from '../../redux/modules/discussions';

export const ParticipantsDialog = props => (
  <div className="discussion-dialog participants-dialog">
    <h4 className="header">
      Participants
      <button
        type="button"
        className="btn btn-link icon-wrapper"
        onClick={props.openInvitation}
      >
        <SVGInline svg={plusIcon} className="icon" />
      </button>
    </h4>
    <ul className="participants-list">
      {props.discussion.participants
        .toList()
        .sortBy(p => p.name)
        .map(p => (
          <li className={`${p.present ? 'present' : ''}`} key={p.email}>
            <Avatar size={26} src={p.avatar_url} name={p.name} round />
            {p.name}
          </li>
        ))}
      {props.discussion.invites.map(invite => (
        <li key={invite.email}>
          <Avatar size={26} round name={invite.email} />
          {invite.email} <span className="subtext">invited</span>
        </li>
      ))}
    </ul>
  </div>
);

export const mapDispatchToProps = {
  openModal: actions.openModal,
};

export const ParticipantsDialogContainer = compose(
  connect(null, mapDispatchToProps),
  withHandlers({
    openInvitation: props => () =>
      props.openModal(props.discussion.issue.guid, 'invitation'),
  }),
)(ParticipantsDialog);
