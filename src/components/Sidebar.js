import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export const Sidebar = () =>
  <div className="sidebar">
    <a href="#foo" className="btn btn-primary">
      Create New Task
    </a>
    <h6>Filters</h6>
    <Nav vertical className="filter-nav">
      <NavItem>
        <NavLink href="#documentation" active>Mine (6)</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#need-help">Teammates (999+)</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#settings">Unassigned (9)</NavLink>
      </NavItem>
    </Nav>
    <h6>My Filters</h6>
    <Nav vertical className="filter-nav">
      <NavItem>
        <NavLink href="#documentation">Dev Team Open</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#need-help">Dev Team Mine</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#settings">Consulting by Due Date</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#settings">HR Pending</NavLink>
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
