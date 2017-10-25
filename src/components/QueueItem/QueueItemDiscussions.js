import React from 'react';
import attachmentIcon from 'font-awesome-svg-png/black/png/128/file-o.png';
import paperclip from 'font-awesome-svg-png/black/svg/paperclip.svg';
import SVGInline from 'react-svg-inline';
import Avatar from 'react-avatar';
import moment from 'moment';

import { ChatInputForm } from './ChatInputForm';

const MessageGroup = ({ messages, profile }) => (
  <div
    className={`message-group ${messages.first().user.email === profile.email
      ? 'mine'
      : 'other'}`}
  >
    <Avatar
      size={50}
      email={messages.first().user.email}
      name={messages.first().user.name}
      round
    />
    <div className="message-list">
      {messages.map(message => (
        <div key={message.id} className="message">
          {message.body}
        </div>
      ))}
      <div className="meta">
        <span className="author">
          {messages.last().user.email === profile.email
            ? 'You'
            : messages.last().user.name}
        </span>
        <span className="timestamp">
          {moment(messages.last().created_at).format('h:mma')}
        </span>
      </div>
    </div>
  </div>
);

export const QueueItemDiscussions = ({
  handleChatEnter,
  handleSendChatMessage,
  handleChangeChatInput,
  chatInput,
  profile,
  messages,
}) => (
  <div className="discussions">
    <div className="messages">
      <div className="message-wrapper">
        {messages.map(dayList => (
          <div key={dayList.first().first().created_at}>
            <div className="date">
              <hr />
              <span>
                {moment(dayList.first().first().created_at).format(
                  'MMMM Do, YYYY',
                )}
              </span>
              <hr />
            </div>
            {dayList.map(messages => (
              <MessageGroup
                key={`group-${messages.first().id}`}
                messages={messages}
                profile={profile}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
    <ChatInputForm />
  </div>
);
