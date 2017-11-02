import React from 'react';
import downArrow from 'font-awesome-svg-png/black/svg/arrow-down.svg';
import SVGInline from 'react-svg-inline';
import { LoadMoreMessagesContainer } from './LoadMoreMessagesContainer';
import { MessagesDateContainer } from './MessagesDate';
import { ChatInputForm } from './ChatInputForm';
import { ScrollHelper } from './ScrollHelper';
import { ParticipantsHeaderContainer } from './ParticipantsHeader';

export const QueueItemDiscussions = ({
  handleScrolled,
  profile,
  formattedMessages,
  unreadMessages,
  registerScrollHelper,
  scrollToBottom,
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
  </div>
);
