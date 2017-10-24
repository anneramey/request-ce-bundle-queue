import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import attachmentIcon from 'font-awesome-svg-png/black/png/128/file-o.png';
import plusIcon from 'font-awesome-svg-png/black/svg/plus.svg';
import sendIcon from 'font-awesome-svg-png/black/svg/paper-plane.svg';
import SVGInline from 'react-svg-inline';

import { actions } from '../../redux/modules/discussions';

const isChatInputInvalid = chatInput => chatInput.trim() === '';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.handleSendChatMessage = this.handleSendChatMessage.bind(this);
    this.handleChatEnter = this.handleChatEnter.bind(this);
    this.handleChangeChatInput = this.handleChangeChatInput.bind(this);
    this.handleInputRef = this.handleInputRef.bind(this);
  }

  handleSendChatMessage(e) {
    e.preventDefault();
    this.props.sendMessage(this.htmlElement.innerHTML);
    this.htmlElement.innerHTML = '';
  }

  handleChatEnter(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.handleSendChatMessage(e);
    }
  }

  handleChangeChatInput(e) {
    this.setState({ chatInput: this.htmlElement.innerHTML });
  }

  handleInputRef(e) {
    this.htmlElement = e;
  }

  render() {
    return (
      <form onSubmit={this.handleSendChatMessage} className="new-message">
        <button type="button" className="btn btn-subtle btn-more">
          <span className="icon-wrapper icon-small">
            <SVGInline svg={plusIcon} className="icon" />
          </span>
        </button>
        <div
          className="message-input"
          contentEditable
          ref={this.handleInputRef}
          onKeyDown={this.handleChatEnter}
        />
        <button
          type="submit"
          className="btn btn-subtle btn-send"
          /* disabled={isChatInputInvalid} */
        >
          <span className="icon-wrapper icon-small">
            <SVGInline svg={sendIcon} className="icon" />
          </span>
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  sendMessage: actions.sendMessage,
};

export const ChatInputForm = compose(connect(null, mapDispatchToProps))(
  ChatInput,
);
