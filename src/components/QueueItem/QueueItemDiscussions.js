import React from 'react';
import { MessagesDateContainer } from './MessagesDate';
import { ChatInputForm } from './ChatInputForm';

export const QueueItemDiscussions = ({
  handleChatEnter,
  handleSendChatMessage,
  handleChangeChatInput,
  chatInput,
  profile,
  formattedMessages,
}) => (
  <div className="discussions">
    <div className="messages">
      <div className="message-wrapper">
        {formattedMessages.map(messagesForDate => (
          <MessagesDateContainer
            key={messagesForDate.first().first().created_at}
            messages={messagesForDate}
            profile={profile}
          />
        ))}
      </div>
    </div>
    <ChatInputForm />
  </div>
);
