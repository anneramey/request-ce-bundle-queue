import React from 'react';
import Avatar from 'react-avatar';
import moment from 'moment';

import { ChatInputForm } from './ChatInputForm';

const Message = ({ message, profile }) => (
  <div
    className={`message ${message.user.email === profile.email
      ? 'mine'
      : 'other'}`}
  >
    <Avatar
      size={50}
      email={message.user.email}
      name={message.user.name}
      round
    />
    <div className="body">
      <p>{message.body}</p>
      <div className="meta">
        <span className="author">
          {message.user.email === profile.email ? 'You' : message.user.name}
        </span>
        <span className="timestamp">
          {moment(message.created_at).format('h:mma')}
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
        {messages
          .reverse()
          .map((val, key) => (
            <div key={key} className="message-group">
              <div className="date">
                <hr />
                <span>{key}</span>
                <hr />
              </div>
              {val.map(message => (
                <Message message={message} profile={profile} key={message.id} />
              ))}
            </div>
          ))
          .toList()}
      </div>
    </div>
    <ChatInputForm />
  </div>
);
