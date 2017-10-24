import React from 'react';
import attachmentIcon from 'font-awesome-svg-png/black/png/128/file-o.png';
import paperclip from 'font-awesome-svg-png/black/svg/paperclip.svg';
import SVGInline from 'react-svg-inline';
import Avatar from 'react-avatar';

import { ChatInputForm } from './ChatInputForm';

export const QueueItemDiscussions = ({
  handleChatEnter,
  handleSendChatMessage,
  handleChangeChatInput,
  chatInput,
}) => (
  <div className="discussions">
    <div className="messages">
      <div className="message-wrapper">
        <div className="message mine">
          <Avatar
            size="50"
            email="shayne.koestler@kineticdata.com"
            name="Shayne Koestler"
            round
          />
          <div className="body">
            <p>Appears to only be happening for people in the US</p>
            <div className="meta">
              <span className="author">You</span>
              <span className="timestamp">10:03am</span>
            </div>
          </div>
        </div>
        <div className="message other">
          <Avatar size="50" email="zzz" name="Norm O" round />
          <div className="body">
            <p>
              ATS is not able to view the table of results on the Data Mgmt
              Console service item.
            </p>
            <div className="meta">
              <span className="author">Vince Vendor</span>
              <span className="timestamp">10:25am</span>
            </div>
          </div>
        </div>
        <div className="date">
          <hr />
          <span>September 30th, 2017</span>
          <hr />
        </div>
        <div className="message other">
          <Avatar size="50" email="zzz" name="Matt R" round />
          <div className="body">
            <p>
              <img src={attachmentIcon} alt="icon" />
              ATS is not able to view the table of results on the Data Mgmt
              Console service item.
            </p>
            <div className="meta">
              <span className="author">Johan Thorsell</span>
              <span className="timestamp">2:25am</span>
            </div>
          </div>
        </div>
        <div className="message mine">
          <Avatar
            size="50"
            email="shayne.koestler@kineticdata.com"
            name="Shayne Koestler"
            round
          />
          <div className="body">
            <p>Appears to only be happening for people in the US</p>
            <div className="meta">
              <span className="author">You</span>
              <span className="timestamp">10:03am</span>
            </div>
          </div>
        </div>
        <div className="message other">
          <Avatar size="50" email="zzz" name="Norm O" round />
          <div className="body">
            <p>
              ATS is not able to view the table of results on the Data Mgmt
              Console service item.
            </p>
            <div className="meta">
              <span className="author">Vince Vendor</span>
              <span className="timestamp">10:25am</span>
            </div>
          </div>
        </div>
        <div className="date">
          <hr />
          <span>September 30th, 2017</span>
          <hr />
        </div>
        <div className="message other">
          <Avatar size="50" email="zzz" name="Matt R" round />
          <div className="body">
            <p>
              <img src={attachmentIcon} alt="icon" />
              ATS is not able to view the table of results on the Data Mgmt
              Console service item.
            </p>
            <div className="meta">
              <span className="author">Johan Thorsell</span>
              <span className="timestamp">2:25am</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ChatInputForm />
  </div>
);
