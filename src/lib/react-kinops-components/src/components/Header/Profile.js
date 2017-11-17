import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import { bundle } from 'react-kinetic-core';

import personIcon from 'font-awesome-svg-png/white/svg/user.svg';

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
        <h6>
          {profile.displayName}
          <br />
          <small>{profile.email}</small>
        </h6>
      </div>
      <div className="profile-links">
        <div className="dropdown-divider" />
        <a
          href={`${bundle.spaceLocation()}?page=profile`}
          className="dropdown-item"
        >
          Profile
        </a>
        <a
          role="button"
          tabIndex="0"
          onClick={openInviteOthersForm}
          className="dropdown-item"
        >
          Invite Others
        </a>
        <a
          role="button"
          tabIndex="0"
          onClick={openHelpForm}
          className="dropdown-item"
        >
          Get Help
        </a>
        <a
          role="button"
          tabIndex="0"
          onClick={openFeedbackForm}
          className="dropdown-item"
        >
          Give Feedback
        </a>
        <a
          role="button"
          tabIndex="0"
          onClick={openKitchenSinkForm}
          className="dropdown-item"
        >
          Kitchen Sink
        </a>
        <a
          href={`${bundle.spaceLocation()}?page=about`}
          className="dropdown-item"
        >
          About My Space
        </a>
        <div className="dropdown-divider" />
        <a
          href={`${bundle.spaceLocation()}/app/logout`}
          className="dropdown-item"
        >
          Logout
        </a>
      </div>
    </DropdownMenu>
  </UncontrolledDropdown>
);
