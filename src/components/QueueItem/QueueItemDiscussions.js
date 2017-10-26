import React from 'react';
import { MessagesDateContainer } from './MessagesDate';
import { ChatInputForm } from './ChatInputForm';
import { ScrollHelper } from './ScrollHelper';

export const QueueItemDiscussions = ({
  handleScrolled,
  profile,
  formattedMessages,
}) => (
  <div className="discussions">
    <div className="messages">
      <ScrollHelper onScrollTo={handleScrolled}>
        {formattedMessages.map(messagesForDate => (
          <MessagesDateContainer
            key={messagesForDate.first().first().created_at}
            messages={messagesForDate}
            profile={profile}
          />
        ))}
      </ScrollHelper>
    </div>
    <ChatInputForm />
  </div>
);
