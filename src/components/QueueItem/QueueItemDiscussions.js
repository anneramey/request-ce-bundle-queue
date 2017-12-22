import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import downArrow from 'font-awesome-svg-png/black/svg/arrow-down.svg';
import SVGInline from 'react-svg-inline';
import { LoadMoreMessages } from './LoadMoreMessagesContainer';
import { MessagesDateContainer } from './MessagesDate';
import { ChatInputForm } from './ChatInputForm';
import { ScrollHelper } from './ScrollHelper';
import { ParticipantsHeaderContainer } from './ParticipantsHeader';
import { ParticipantsDialogContainer } from './ParticipantsDialog';
import { InvitationDialogContainer } from './InvitationDialog';

const Messages = ({
  discussion,
  handleScrolled,
  profile,
  formattedMessages,
  unreadMessages,
  registerScrollHelper,
  scrollToBottom,
}) => (
  <div className="messages">
    <ScrollHelper ref={registerScrollHelper} onScrollTo={handleScrolled}>
      <LoadMoreMessages discussion={discussion} />
      {formattedMessages.map(messagesForDate => (
        <MessagesDateContainer
          key={messagesForDate.first().first().created_at}
          messages={messagesForDate}
          profile={profile}
        />
      ))}
    </ScrollHelper>
    <ParticipantsHeaderContainer discussion={discussion} />
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
    discussion,
    currentOpenModals,
    closeCurrent,
    closeAll,
    createDiscussion,
    createInvitation,
    invitationButtonEnabled,
    isSmallLayout,
  } = props;

  return discussion ? (
    <div className="queue-item-discussions hidden-sm-down">
      {!isSmallLayout && <Messages {...props} />}
      {!isSmallLayout && <ChatInputForm discussion={discussion} />}
      <Modal isOpen={!currentOpenModals.isEmpty()} toggle={closeAll} size="md">
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
              {currentOpenModals.last() === 'discussion'
                ? 'Discussion'
                : currentOpenModals.last() === 'participants'
                  ? 'All Participants'
                  : 'Invite Participants'}
            </span>
          </h4>
        </div>
        {currentOpenModals.last() === 'participants' ? (
          <ModalBody>
            <ParticipantsDialogContainer discussion={discussion} />
          </ModalBody>
        ) : currentOpenModals.last() === 'invitation' ? (
          <ModalBody>
            <InvitationDialogContainer createInvitation={createInvitation} />
          </ModalBody>
        ) : currentOpenModals.last() === 'discussion' ? (
          <ModalBody className="queue-item-discussions-modal-body">
            <Messages {...props} />
            <ChatInputForm discussion={discussion} />
          </ModalBody>
        ) : (
          <div>Nothing to display</div>
        )}
        {currentOpenModals.last() === 'invitation' && (
          <ModalFooter>
            <button
              type="button"
              className="btn btn-primary"
              onClick={createInvitation}
              disabled={!invitationButtonEnabled}
            >
              Send Invite
            </button>
          </ModalFooter>
        )}
      </Modal>
    </div>
  ) : (
    <div className="queue-item-discussions hidden-sm-down">
      <div className="empty-discussion">
        <h6>No discussion to display</h6>
        <p>
          <button onClick={createDiscussion} className="btn btn-link">
            Create a new discussion
          </button>
        </p>
      </div>
    </div>
  );
};
