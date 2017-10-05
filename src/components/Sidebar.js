import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import userIcon from 'font-awesome-svg-png/white/svg/user.svg';
import usersIcon from 'font-awesome-svg-png/white/svg/users.svg';
import inboxIcon from 'font-awesome-svg-png/white/svg/inbox.svg';
import starIcon from 'font-awesome-svg-png/white/svg/star-o.svg';

const formatCount = count => count >= 1000 ? '999+' : `${count}`;

export const Sidebar = ({
  documentationUrl,
  supportUrl,
  counts,
  openNewItemMenu,
}) =>
  <div className="sidebar">
    <button
      className="btn btn-primary"
      onClick={openNewItemMenu}
    >
      Create New Task
    </button>
    <h6>Filters</h6>
    <Nav vertical className="filter-nav">
      <NavItem>
        <NavLink to="/list/Mine" className="nav-link icon-wrapper" activeClassName="active">
          <SVGInline svg={userIcon} className="icon" />
          Mine ({formatCount(counts.get('Mine', 0))})
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/list/Teammates" className="nav-link icon-wrapper" activeClassName="active">
          <SVGInline svg={usersIcon} className="icon" />
          Teammates ({formatCount(counts.get('Teammates', 0))})
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/list/Unassigned" className="nav-link icon-wrapper" activeClassName="active">
          <SVGInline svg={inboxIcon} className="icon" />
          Unassigned ({formatCount(counts.get('Unassigned', 0))})
        </NavLink>
      </NavItem>
    </Nav>
    <h6>My Filters</h6>
    <Nav vertical className="filter-nav">
      <NavItem>
        <NavLink to="/custom-list/0" className="nav-link icon-wrapper" activeClassName="active">
          <SVGInline svg={starIcon} className="icon" />
          Dev Team Open
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/custom-list/1" className="nav-link icon-wrapper" activeClassName="active">
          <SVGInline svg={starIcon} className="icon" />
          Dev Team Mine
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/custom-list/2" className="nav-link icon-wrapper" activeClassName="active">
          <SVGInline svg={starIcon} className="icon" />
          Consulting by Due Date
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/custom-list/3" className="nav-link icon-wrapper" activeClassName="active">
          <SVGInline svg={starIcon} className="icon" />
          HR Pending
        </NavLink>
      </NavItem>
    </Nav>
    <Nav vertical className="bottom-nav">
      <NavItem>
        <a href={documentationUrl} className="nav-link" target="_blank">
          Documentation
        </a>
      </NavItem>
      <NavItem>
        <a href={supportUrl} className="nav-link" target="_blank">
          Need Help?
        </a>
      </NavItem>
      <NavItem>
        <NavLink to="/settings" className="nav-link" activeClassName="active">
          Settings
        </NavLink>
      </NavItem>
    </Nav>
  </div>;
