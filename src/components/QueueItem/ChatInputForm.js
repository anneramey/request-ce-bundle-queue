import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';
import plusIcon from 'font-awesome-svg-png/black/svg/plus.svg';
import sendIcon from 'font-awesome-svg-png/black/svg/paper-plane.svg';
import SVGInline from 'react-svg-inline';

import { actions } from '../../redux/modules/discussions';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: '',
      hasFocus: false,
    };

    this.handleSendChatMessage = this.handleSendChatMessage.bind(this);
    this.handleChatEnter = this.handleChatEnter.bind(this);
    this.handleInputRef = this.handleInputRef.bind(this);
    this.handleChatInput = this.handleChatInput.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.isChatInputInvalid = this.isChatInputInvalid.bind(this);
  }

  handleSendChatMessage(e) {
    e.preventDefault();
    this.props.sendMessage(this.htmlElement.innerText);
    this.htmlElement.innerText = '';
  }

  handleChatEnter(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.handleSendChatMessage(e);
    }
  }

  handleChatInput() {
    console.log('chat input');
    this.setState({ chatInput: this.htmlElement.innerText.trim() });
  }

  handleInputRef(e) {
    this.htmlElement = e;
  }

  handleFocus() {
    this.setState({ hasFocus: true });
  }

  handleBlur() {
    this.setState({ hasFocus: false });
  }

  handlePaste(e) {
    // e.preventDefault();
    console.log('paste', e.clipboardData.getData('Text'));
  }

  showInputPlaceholder() {
    return !this.isChatInputInvalid() || this.state.hasFocus;
  }

  isChatInputInvalid() {
    return !this.htmlElement || this.htmlElement.innerText.trim() === '';
  }

  render() {
    return (
      <form onSubmit={this.handleSendChatMessage} className="new-message">
        <button type="button" className="btn btn-subtle btn-more">
          <span className="icon-wrapper icon-small">
            <SVGInline svg={plusIcon} className="icon" />
          </span>
        </button>
        <div className="input-container">
          <div
            className={classNames('placeholder', {
              hidden: this.showInputPlaceholder(),
            })}
          >
            Type your message here&hellip;
          </div>
          <div
            className="message-input"
            contentEditable
            ref={this.handleInputRef}
            onInput={this.handleChatInput}
            onKeyDown={this.handleChatEnter}
            onPaste={this.handlePaste}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
        <button
          type="submit"
          className="btn btn-subtle btn-send"
          disabled={this.isChatInputInvalid()}
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
