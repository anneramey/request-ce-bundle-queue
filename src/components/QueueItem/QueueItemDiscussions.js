import React from 'react';
import { Link } from 'react-router-dom';
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

const Messages = ({
  handleScrolled,
  profile,
  formattedMessages,
  unreadMessages,
  registerScrollHelper,
  scrollToBottom,
}) => (
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
);

export const QueueItemDiscussions = props => {
  const {
    queueItem,
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
    isSmallLayout,
  } = props;
  return (
    <div className="discussions">
      {!isSmallLayout && <Messages {...props} />}
      {!isSmallLayout && <ChatInputForm />}
      <Modal
        isOpen={isSmallLayout || !currentOpenModals.isEmpty()}
        toggle={closeAll}
        size="md"
      >
        <div className="modal-header">
          <h4 className="modal-title">
            {currentOpenModals.isEmpty() ? (
              <Link to={`/item/${queueItem.id}`} className="btn btn-link">
                Close
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-link"
                onClick={closeCurrent}
              >
                {currentOpenModals.last() === 'invitation' ? 'Cancel' : 'Close'}
              </button>
            )}
            <span>
              {currentOpenModals.isEmpty()
                ? 'Discussion'
                : currentOpenModals.last() === 'participants'
                  ? 'All Participants'
                  : 'Invite Participants'}
            </span>
          </h4>
        </div>
        {currentOpenModals.last() === 'participants' ? (
          <ModalBody>
            <ParticipantsDialogContainer />
          </ModalBody>
        ) : currentOpenModals.last() === 'invitation' ? (
          <ModalBody>
            <InvitationDialogContainer createInvitation={createInvitation} />
          </ModalBody>
        ) : isSmallLayout ? (
          <ModalBody>
            <Messages {...props} />
            <ChatInputForm />
          </ModalBody>
        ) : (
          <div>Nothing to display</div>
        )}
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
};
