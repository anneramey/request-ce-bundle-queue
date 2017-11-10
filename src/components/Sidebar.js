import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import chevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';
import plusIcon from 'font-awesome-svg-png/white/svg/plus.svg';
import userIcon from 'font-awesome-svg-png/white/svg/user.svg';
import usersIcon from 'font-awesome-svg-png/white/svg/users.svg';
import inboxIcon from 'font-awesome-svg-png/white/svg/inbox.svg';
import starIcon from 'font-awesome-svg-png/white/svg/star-o.svg';
import filledStarIcon from 'font-awesome-svg-png/white/svg/star.svg';

const formatCount = count => (count >= 1000 ? '999+' : `${count}`);

export const Sidebar = ({
  documentationUrl,
  supportUrl,
  counts,
  handleOpenNewItemMenu,
  myFilters,
  hasTeammates,
  hasTeams,
}) => (
  <div className="sidebar">
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleOpenNewItemMenu}
    >
      Create New Task
    </button>
    <h6>Default Lists</h6>
    <Nav vertical className="filter-nav">
      <NavItem>
        <NavLink
          to="/list/Mine"
          className="nav-link icon-wrapper"
          activeClassName="active"
        >
          <SVGInline svg={userIcon} className="icon" />
          Mine ({formatCount(counts.get('Mine', 0))})
        </NavLink>
      </NavItem>
      {hasTeammates && (
        <NavItem>
          <NavLink
            to="/list/Teammates"
            className="nav-link icon-wrapper"
            activeClassName="active"
          >
            <SVGInline svg={usersIcon} className="icon" />
            Teammates ({formatCount(counts.get('Teammates', 0))})
          </NavLink>
        </NavItem>
      )}
      {hasTeams && (
        <NavItem>
          <NavLink
            to="/list/Unassigned"
            className="nav-link icon-wrapper"
            activeClassName="active"
          >
            <SVGInline svg={inboxIcon} className="icon" />
            Unassigned ({formatCount(counts.get('Unassigned', 0))})
          </NavLink>
        </NavItem>
      )}
    </Nav>
    <h6 className="d-flex justify-content-between icon-wrapper">
      My Lists
      <button className="btn btn-sidebar">
        <SVGInline svg={plusIcon} className="icon" />
      </button>
    </h6>
    <Nav vertical className="filter-nav">
      {myFilters.map(filter => (
        <NavItem key={filter.name}>
          <NavLink
            to={`/custom/${filter.name}`}
            className="nav-link icon-wrapper"
            activeClassName="active"
          >
            <SVGInline svg={starIcon} className="icon" />
            {`${filter.name}`}
          </NavLink>
        </NavItem>
      ))}
      {myFilters.size === 0 && (
        <NavItem>
          <NavLink
            to="/"
            className="nav-link icon-wrapper"
            activeClassName="active"
          >
            <SVGInline svg={filledStarIcon} className="icon" />
            Create a new list?
          </NavLink>
        </NavItem>
      )}
    </Nav>
    <Nav vertical className="bottom-nav">
      <NavItem>
        <a
          href={documentationUrl}
          className="nav-link icon-wrapper d-flex justify-content-between"
          target="_blank"
        >
          <span>Documentation</span>
          <SVGInline svg={chevronRightIcon} className="icon" />
        </a>
      </NavItem>
      <NavItem>
        <a
          href={supportUrl}
          className="nav-link icon-wrapper d-flex justify-content-between"
          target="_blank"
        >
          <span>Need Help?</span>
          <SVGInline svg={chevronRightIcon} className="icon" />
        </a>
      </NavItem>
      <NavItem>
        <NavLink
          to="/settings"
          className="nav-link icon-wrapper d-flex justify-content-between"
          activeClassName="active"
        >
          <span>Settings</span>
          <SVGInline svg={chevronRightIcon} className="icon" />
        </NavLink>
      </NavItem>
      <NavItem>
        <a
          href={
            'https://docs.google.com/spreadsheets/d/1yHrks5CTt4WJEyrc7nny5QyHK05-bZZWuPGDhObP5Fc/edit#gid=0'
          }
          className="nav-link icon-wrapper d-flex justify-content-between"
          target="_blank"
        >
          <span>BUG/ISSUE LIST (TEMP)</span>
          <SVGInline svg={filledStarIcon} className="icon" />
        </a>
      </NavItem>
    </Nav>
  </div>
);
