import React from 'react';
import { compose } from 'recompose';
import Avatar from 'react-avatar';
import moment from 'moment';

export const MessagesGroup = ({ messages, profile }) => (
  <div
    className={`messages-group ${messages.first().user.email === profile.email
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

export const MessagesGroupContainer = compose()(MessagesGroup);
