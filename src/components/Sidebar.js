import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import userIcon from 'font-awesome-svg-png/white/svg/user.svg';
import usersIcon from 'font-awesome-svg-png/white/svg/users.svg';
import inboxIcon from 'font-awesome-svg-png/white/svg/inbox.svg';
import starIcon from 'font-awesome-svg-png/white/svg/star-o.svg';

export const Sidebar = () =>
  <div className="sidebar">
    <a href="#foo" className="btn btn-primary">
      Create New Task
    </a>
    <h6>Filters</h6>
    <Nav vertical className="filter-nav">
      <NavItem>
        <NavLink href="#documentation" active>
          <SVGInline svg={userIcon} className="icon" cleanup={['height', 'width']} />
          Mine (6)
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#need-help">
          <SVGInline svg={usersIcon} className="icon" cleanup={['height', 'width']} />
          Teammates (999+)
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#settings">
          <SVGInline svg={inboxIcon} className="icon" cleanup={['height', 'width']} />
          Unassigned (9)
        </NavLink>
      </NavItem>
    </Nav>
    <h6>My Filters</h6>
    <Nav vertical className="filter-nav">
      <NavItem>
        <NavLink href="#documentation">
          <SVGInline svg={starIcon} className="icon" cleanup={['height', 'width']} />
          Dev Team Open
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#need-help">
          <SVGInline svg={starIcon} className="icon" cleanup={['height', 'width']} />
          Dev Team Mine
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#settings">
          <SVGInline svg={starIcon} className="icon" cleanup={['height', 'width']} />
          Consulting by Due Date
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#settings">
          <SVGInline svg={starIcon} className="icon" cleanup={['height', 'width']} />
          HR Pending
        </NavLink>
      </NavItem>
    </Nav>
    <Nav vertical className="bottom-nav">
      <NavItem>
        <NavLink href="#documentation">Documentation</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#need-help">Need Help?</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#settings">Settings</NavLink>
      </NavItem>
    </Nav>
  </div>;
