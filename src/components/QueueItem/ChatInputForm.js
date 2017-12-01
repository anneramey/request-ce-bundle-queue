import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { compose } from 'recompose';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import classNames from 'classnames';
import plusIcon from 'font-awesome-svg-png/black/svg/plus.svg';
import removeIcon from 'font-awesome-svg-png/black/svg/times.svg';
import sendIcon from 'font-awesome-svg-png/black/svg/paper-plane.svg';
import userPlusIcon from 'font-awesome-svg-png/black/svg/user-plus.svg';
import attachmentIcon from 'font-awesome-svg-png/black/svg/paperclip.svg';
import SVGInline from 'react-svg-inline';

import { actions } from '../../redux/modules/discussions';

const VALID_IMG_TYPES = [
  'image/jpeg',
  'image/bmp',
  'image/gif',
  'image/x-icon',
  'image/png',
  'image/svg+xml',
];

const canShowPreview = file =>
  file.preview && VALID_IMG_TYPES.includes(file.type);

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: '',
      hasFocus: false,
      actionsOpen: false,
      fileAttachment: null,
    };

    this.handleSendChatMessage = this.handleSendChatMessage.bind(this);
    this.handleChatHotKey = this.handleChatHotKey.bind(this);
    this.handleInputRef = this.handleInputRef.bind(this);
    this.handleChatInput = this.handleChatInput.bind(this);
    this.handleAttachmentDrop = this.handleAttachmentDrop.bind(this);
    this.handleAttachmentClick = this.handleAttachmentClick.bind(this);
    this.handleAttachmentCancel = this.handleAttachmentCancel.bind(this);
    this.handleDropzoneRef = this.handleDropzoneRef.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.isChatInputInvalid = this.isChatInputInvalid.bind(this);
    this.toggleActionsOpen = this.toggleActionsOpen.bind(this);
    this.setActionsOpen = this.setActionsOpen.bind(this);
  }

  handleSendChatMessage(e) {
    e.preventDefault();
    this.props.sendMessage(
      this.props.discussion.issue.guid,
      this.htmlElement.innerText,
      this.state.fileAttachment,
    );
    this.htmlElement.innerText = '';
    this.setState({ fileAttachment: null });
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

  handleAttachmentDrop(files) {
    // Store the dropped/selected file.
    this.setState({ fileAttachment: files[0] });

    // Focus the chat input and hide the placeholder text.
    this.htmlElement.focus();
    this.handleFocus();

    // And in case the action menu was open, close it.
    this.setActionsOpen(false);
  }

  handleAttachmentClick() {
    this.dropzone.open();
  }

  handleAttachmentCancel() {
    this.setState({ fileAttachment: null });
  }

  handleDropzoneRef(dropzone) {
    this.dropzone = dropzone;
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

  toggleActionsOpen() {
    this.setState(state => ({ actionsOpen: !state.actionsOpen }));
  }

  setActionsOpen(actionsOpen) {
    this.setState({ actionsOpen });
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
    const caretInfo = Array.from(this.htmlElement.childNodes).reduce(
      (ci, node, index) => {
        let pos = ci.pos;
        // If the line represents a line break, just decrement the position.
        if (node instanceof HTMLBRElement) {
          pos = ci.pos - 1;
        }

        // If the position is past the end of this line adjust the relative position.
        if (node.length < ci.pos) {
          pos = ci.pos - node.length;
        }

        return { line: index, pos: pos };
      },
      { line: 0, pos: startOffset + pastedText.length },
    );

    range.setStart(this.htmlElement.childNodes[caretInfo.line], caretInfo.pos);
  }

  showInputPlaceholder() {
    return !this.isChatInputInvalid() || this.state.hasFocus;
  }

  isChatInputInvalid() {
    const valid =
      (this.htmlElement && this.htmlElement.innerText.trim() !== '') ||
      this.state.fileAttachment !== null;
    return !valid;
  }

  render() {
    return (
      <Dropzone
        disableClick
        ref={this.handleDropzoneRef}
        onDrop={this.handleAttachmentDrop}
        multiple={false}
        style={{}}
      >
        <form onSubmit={this.handleSendChatMessage} className="new-message">
          <ButtonDropdown
            isOpen={this.state.actionsOpen}
            toggle={this.toggleActionsOpen}
            dropup
          >
            <DropdownToggle className="btn-suble btn-more">
              <span className="icon-wrapper icon-small">
                <SVGInline svg={plusIcon} className="icon" />
              </span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                className="icon-wrapper"
                onClick={this.handleAttachmentClick}
              >
                <SVGInline svg={attachmentIcon} className="icon" />Add File
              </DropdownItem>
              <DropdownItem
                className="icon-wrapper"
                onClick={() => this.props.openModal('invitation')}
              >
                <SVGInline svg={userPlusIcon} className="icon" />Invite Person
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <div className="input-container">
            {this.state.fileAttachment !== null && (
              <div
                className="icon-wrapper"
                style={{
                  display: 'flex',
                  backgroundColor: '#fff',
                  height: '24px',
                  minWidth: '96px',
                  maxWidth: '182px',
                  color: '#54698D',
                  fontSize: '10px',
                  lineHeight: '12px',
                  marginBottom: '0.5em',
                }}
              >
                {canShowPreview(this.state.fileAttachment) && (
                  <img
                    src={this.state.fileAttachment.preview}
                    alt={this.state.fileAttachment.name}
                    style={{
                      width: '24px',
                      height: '24px',
                    }}
                  />
                )}
                <span style={{ flex: '1', marginLeft: '0.5em' }}>
                  {this.state.fileAttachment.name}
                </span>
                <button
                  className="btn btn-xs btn-link"
                  type="button"
                  style={{ width: '24px', height: '24px' }}
                  onClick={this.handleAttachmentCancel}
                >
                  <SVGInline svg={removeIcon} className="icon" />
                </button>
              </div>
            )}
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
      </Dropzone>
    );
  }
}

const mapDispatchToProps = {
  sendMessage: actions.sendMessage,
  openModal: actions.openModal,
};

export const ChatInputForm = compose(connect(null, mapDispatchToProps))(
  ChatInput,
);
