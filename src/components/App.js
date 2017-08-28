import React from 'react';
import SVGInline from 'react-svg-inline';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Navbar, Nav, NavItem, NavLink } from 'reactstrap';

import 'bootstrap/scss/bootstrap.scss';
import personIcon from 'open-iconic/svg/person.svg';
import bellIcon from 'open-iconic/svg/bell.svg';
import hamburgerIcon from '../images/hamburger.svg';

import '../styles/master.css';

export const App = () =>
  <div>
    <Navbar color="faded" light fixed="top">
      <Nav className="nav-header">
        <NavItem>
          <NavLink className="drawer-button" role="button" tabIndex="0">
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
    </Navbar>
    <div className="main">
      <h1>Fixed Top Menu</h1>
      <h2>Scroll this page to see the effect</h2>
      <pre>{bellIcon}</pre>
      <pre>{hamburgerIcon}</pre>
      <h2>The navigation bar will stay at the top of the page while scrolling</h2>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
      <p>Some text some text some text some text..</p>
    </div>
  </div>;

