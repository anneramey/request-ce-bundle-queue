import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import personIcon from 'font-awesome-svg-png/white/svg/user.svg';
import bellIcon from 'font-awesome-svg-png/white/svg/bell.svg';
import hamburgerIcon from '../images/hamburger.svg';

export const Header = ({ toggleSidebarOpen }) =>
  <Navbar color="faded" light fixed="top">
    <Nav className="nav-header">
      <NavItem>
        <NavLink className="drawer-button icon-wrapper" role="button" tabIndex="0" onClick={toggleSidebarOpen}>
          <SVGInline svg={hamburgerIcon} className="icon" />
        </NavLink>
      </NavItem>
      <UncontrolledDropdown>
        <DropdownToggle caret nav role="button">
          Queue
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Services</DropdownItem>
          <DropdownItem>Teams</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Admin</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledDropdown className="nav-item-right">
        <DropdownToggle nav role="button" className="icon-wrapper">
          <SVGInline svg={bellIcon} className="icon" />
        </DropdownToggle>
        <DropdownMenu right>
          Alerts go here
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledDropdown>
        <DropdownToggle nav role="button" className="icon-wrapper">
          <SVGInline svg={personIcon} className="icon" />
        </DropdownToggle>
        <DropdownMenu right>
          Profile links go here
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  </Navbar>;
