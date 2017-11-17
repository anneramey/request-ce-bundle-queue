import React from 'react';
<<<<<<< HEAD
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

=======
import {Helmet} from "react-helmet";

import 'bootstrap/scss/bootstrap.scss';
import 'typeface-open-sans/index.css';
import '../styles/master.scss';
import { LayoutContainer } from './Layout';
import { Content } from './Content';
import { SidebarContainer } from './SidebarContainer';


export const App = ({ loading }) =>
  <div>
    <Helmet>
      <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />
      {/*<link rel="stylesheet" href="//basehold.it/12/11/168/224/0.2" />*/}
    </Helmet>
    {loading ? (
      <div />
    ) : (
      <div className="app">
        <LayoutContainer
          sidebarContent={<SidebarContainer />}
          mainContent={<Content />}
        />
      </div>
    )}
  </div>;
>>>>>>> develop
