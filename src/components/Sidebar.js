import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
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
        <NavLink to="/mine" className="nav-link" activeClassName="active">
          <SVGInline svg={userIcon} className="icon" cleanup={['height', 'width']} />
          Mine (6)
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/teammates" className="nav-link" activeClassName="active">
          <SVGInline svg={usersIcon} className="icon" cleanup={['height', 'width']} />
          Teammates (999+)
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/unassigned" className="nav-link" activeClassName="active">
          <SVGInline svg={inboxIcon} className="icon" cleanup={['height', 'width']} />
          Unassigned (9)
        </NavLink>
      </NavItem>
    </Nav>
    <h6>My Filters</h6>
    <Nav vertical className="filter-nav">
      <NavItem>
        <NavLink to="/custom-filter/0" className="nav-link" activeClassName="active">
          <SVGInline svg={starIcon} className="icon" cleanup={['height', 'width']} />
          Dev Team Open
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/custom-filter/1" className="nav-link" activeClassName="active">
          <SVGInline svg={starIcon} className="icon" cleanup={['height', 'width']} />
          Dev Team Mine
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/custom-filter/2" className="nav-link" activeClassName="active">
          <SVGInline svg={starIcon} className="icon" cleanup={['height', 'width']} />
          Consulting by Due Date
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/custom-filter/3" className="nav-link" activeClassName="active">
          <SVGInline svg={starIcon} className="icon" cleanup={['height', 'width']} />
          HR Pending
        </NavLink>
      </NavItem>
    </Nav>
    <Nav vertical className="bottom-nav">
      <NavItem>
        <NavLink to="/documentation" className="nav-link" activeClassName="active">
          Documentation
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/need-help" className="nav-link" activeClassName="active">
          Need Help?
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/settings" className="nav-link" activeClassName="active">
          Settings
        </NavLink>
      </NavItem>
    </Nav>
  </div>;
