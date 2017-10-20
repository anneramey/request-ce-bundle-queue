import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import { bundle } from 'react-kinetic-core';

import personIcon from 'font-awesome-svg-png/white/svg/user.svg';
import envelopeIcon from 'font-awesome-svg-png/black/svg/envelope.svg';
import questionIcon from 'font-awesome-svg-png/black/svg/question.svg';
import commentIcon from 'font-awesome-svg-png/black/svg/commenting.svg';
import infoIcon from 'font-awesome-svg-png/black/svg/info.svg';
import signoutIcon from 'font-awesome-svg-png/black/svg/sign-out.svg';

export const Profile = ({
  profile,
  openFeedbackForm,
  openHelpForm,
  openInviteOthersForm,
  openKitchenSinkForm,
}) => (
  <UncontrolledDropdown>
    <DropdownToggle nav role="button" className="icon-wrapper">
      <SVGInline svg={personIcon} className="icon" />
    </DropdownToggle>
    <DropdownMenu right className="profile-menu">
      <div className="profile-header">
        <div>
          <strong>{profile.displayName}</strong>
        </div>
        <div>{profile.email}</div>
      </div>
      <div className="profile-links">
        <a
          href={`${bundle.spaceLocation()}?page=profile`}
          className="icon-wrapper"
        >
          <SVGInline svg={personIcon} className="icon" />
          Profile
        </a>
        <a
          role="button"
          tabIndex="0"
          onClick={openInviteOthersForm}
          className="icon-wrapper"
        >
          <SVGInline svg={envelopeIcon} className="icon" />
          Invite Others
        </a>
        <a
          role="button"
          tabIndex="0"
          onClick={openHelpForm}
          className="icon-wrapper"
        >
          <SVGInline svg={questionIcon} className="icon" />
          Get Help
        </a>
        <a
          role="button"
          tabIndex="0"
          onClick={openFeedbackForm}
          className="icon-wrapper"
        >
          <SVGInline svg={commentIcon} className="icon" />
          Give Feedback
        </a>
        <a
          role="button"
          tabIndex="0"
          onClick={openKitchenSinkForm}
          className="icon-wrapper"
        >
          <SVGInline svg={commentIcon} className="icon" />
          Kitchen Sink
        </a>
        <a
          href={`${bundle.spaceLocation()}?page=about`}
          className="icon-wrapper"
        >
          <SVGInline svg={infoIcon} className="icon" />
          About My Space
        </a>
        <a
          href={`${bundle.spaceLocation()}/app/logout`}
          className="icon-wrapper"
        >
          <SVGInline svg={signoutIcon} className="icon" />
          Logout
        </a>
      </div>
    </DropdownMenu>
  </UncontrolledDropdown>
);
