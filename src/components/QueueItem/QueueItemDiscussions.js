import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import downArrow from 'font-awesome-svg-png/black/svg/arrow-down.svg';
import SVGInline from 'react-svg-inline';
import { LoadMoreMessagesContainer } from './LoadMoreMessagesContainer';
import { MessagesDateContainer } from './MessagesDate';
import { ChatInputForm } from './ChatInputForm';
import { ScrollHelper } from './ScrollHelper';
import { ParticipantsHeaderContainer } from './ParticipantsHeader';
import { ParticipantsDialogContainer } from './ParticipantsDialog';
import { InvitationDialogContainer } from './InvitationDialog';

export const QueueItemDiscussions = ({
  handleScrolled,
  profile,
  formattedMessages,
  unreadMessages,
  registerScrollHelper,
  scrollToBottom,
  currentOpenModals,
  openParticipants,
  closeCurrent,
  closeAll,
  createInvitation,
  invitationButtonEnabled,
}) => (
  <div className="discussions">
    <div className="messages">
      <ScrollHelper ref={registerScrollHelper} onScrollTo={handleScrolled}>
        <LoadMoreMessagesContainer />
        {formattedMessages.map(messagesForDate => (
          <MessagesDateContainer
            key={messagesForDate.first().first().created_at}
            messages={messagesForDate}
            profile={profile}
          />
        ))}
      </ScrollHelper>
      <ParticipantsHeaderContainer />
      {unreadMessages && (
        <button
          type="button"
          className="btn btn-primary icon-wrapper more-messages"
          onClick={scrollToBottom}
        >
          New messages
          <SVGInline svg={downArrow} className="icon" />
        </button>
      )}
    </div>
    <ChatInputForm />
    <Modal isOpen={!currentOpenModals.isEmpty()} toggle={closeAll} size="md">
      <div className="modal-header">
        <h4 className="modal-title">
          <button type="button" className="btn btn-link" onClick={closeCurrent}>
            {currentOpenModals.last() === 'invitation' ? 'Cancel' : 'Close'}
          </button>
          <span>
            {currentOpenModals.last() === 'participants'
              ? 'All Participants'
              : 'Invite Participants'}
          </span>
        </h4>
      </div>
      <ModalBody>
        {currentOpenModals.last() === 'participants' ? (
          <ParticipantsDialogContainer />
        ) : currentOpenModals.last() === 'invitation' ? (
          <InvitationDialogContainer createInvitation={createInvitation} />
        ) : (
          <div>Nothing to display</div>
        )}
      </ModalBody>
      {currentOpenModals.last() === 'invitation' && (
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary"
            disabled={false}
            onClick={createInvitation}
            disabled={!invitationButtonEnabled}
          >
            Send Invite
          </button>
        </ModalFooter>
      )}
    </Modal>
  </div>
);
