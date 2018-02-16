import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import plusIcon from 'font-awesome-svg-png/white/svg/plus.svg';
import userIcon from 'font-awesome-svg-png/white/svg/user.svg';
import usersIcon from 'font-awesome-svg-png/white/svg/users.svg';
import inboxIcon from 'font-awesome-svg-png/white/svg/inbox.svg';
import starIcon from 'font-awesome-svg-png/white/svg/star-o.svg';
import filledStarIcon from 'font-awesome-svg-png/white/svg/star.svg';
//import chevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';

const formatCount = count => (count >= 1000 ? '999+' : `${count}`);

export const Sidebar = ({
  documentationUrl,
  supportUrl,
  counts,
  handleOpenNewItemMenu,
  handleNewPersonalFilter,
  myFilters,
  hasTeammates,
  hasTeams,
  hasForms,
}) => (
  <div className="sidebar">
    {hasForms && (
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleOpenNewItemMenu}
      >
        Create New Task
      </button>
    )}
    <h6>Default Filters</h6>
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
      My Filters
      <button className="btn btn-sidebar" onClick={handleNewPersonalFilter}>
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
          <i className="nav-link icon-wrapper">
            <SVGInline svg={filledStarIcon} className="icon" />
            None Configured
          </i>
        </NavItem>
      )}
    </Nav>
    {/*
      ** TODO REMOVING UNTIL FURTHER DEFINED **
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
      </Nav>
    */}
  </div>
);
