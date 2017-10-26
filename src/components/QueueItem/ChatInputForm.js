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
    this.handleChatHotKey = this.handleChatHotKey.bind(this);
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

  handleChatHotKey(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      // Handle enter (but not shift enter.)
      this.handleSendChatMessage(e);
    } else if (e.keyCode === 27) {
      // Blur the input box if escape is pressed.
      this.htmlElement.blur();
    }
  }

  handleChatInput() {
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
    // Prevent the default paste behavior
    e.preventDefault();

    // Fetch the unformatted pasted text.
    const pastedText = e.clipboardData.getData('Text');

    // Get the selection range in order to determine where to paste.
    const range = window.getSelection().getRangeAt(0);
    const { startOffset, endOffset } = range;

    // Fetch the existing text.
    const existingText = this.htmlElement.innerText;

    // Replace the element content with the spliced together text.
    this.htmlElement.innerText =
      existingText.slice(0, startOffset) +
      pastedText +
      existingText.slice(endOffset);

    // Set the new character position.
    const newCaretPosition = startOffset + pastedText.length;
    range.setStart(this.htmlElement.childNodes[0], newCaretPosition);
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
            onKeyDown={this.handleChatHotKey}
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
