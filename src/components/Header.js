import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import personIcon from 'open-iconic/svg/person.svg';
import bellIcon from 'open-iconic/svg/bell.svg';
import hamburgerIcon from '../images/hamburger.svg';

export const Header = ({ toggleSidebarOpen }) =>
  <Navbar color="faded" light fixed="top">
    <Nav className="nav-header">
      <NavItem>
        <NavLink className="drawer-button" role="button" tabIndex="0" onClick={toggleSidebarOpen}>
          <SVGInline svg={hamburgerIcon} className="icon" cleanup={['height', 'width']} />
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
      <NavItem className="nav-item-right">
        <NavLink role="button" tabIndex="0">
          <SVGInline svg={bellIcon} className="icon" cleanup={['height', 'width']} />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink role="button" tabIndex="0">
          <SVGInline svg={personIcon} className="icon" cleanup={['height', 'width']} />
        </NavLink>
      </NavItem>
    </Nav>
  </Navbar>;
