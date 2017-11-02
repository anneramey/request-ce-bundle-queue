import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import Avatar from 'react-avatar';

const participantComparator = (p1, p2) =>
  p1.message_count !== p2.message_count
    ? p2.message_count - p1.message_count
    : p1.name.localeCompare(p2.name);

export const ParticipantsHeader = ({ participants, openParticipantsModal }) =>
  !participants.isEmpty() && (
    <div className="participants-preview">
      {participants.sort(participantComparator).map(p => (
        <div className={`${p.present ? 'present' : ''}`} key={p.id}>
          <Avatar size={26} src={p.avatar_url} name={p.name} round />
        </div>
      ))}
      <button
        type="button"
        className="btn btn-link view-all"
        onClick={openParticipantsModal}
      >
        View All
      </button>
    </div>
  );

const mapStateToProps = state => ({
  participants: state.discussions.participants,
});

export const ParticipantsHeaderContainer = compose(
  connect(mapStateToProps),
  withHandlers({
    openParticipantsModal: () => () =>
      console.log('should open participants modal'),
  }),
)(ParticipantsHeader);
