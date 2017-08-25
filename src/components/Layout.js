import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import personIcon from 'open-iconic/svg/person.svg';
import bellIcon from 'open-iconic/svg/bell.svg';
import { Content } from './Content';
import hamburgerIcon from '../images/hamburger.svg';

// https://github.com/balloob/react-sidebar

const mql = window.matchMedia('(min-width: 800px)');

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, desktop: false };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.toggleSidebarOpen = this.toggleSidebarOpen.bind(this);
  }

  componentWillMount() {
    this.setState({ desktop: mql.matches });
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ open });
  }

  toggleSidebarOpen() {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  mediaQueryChanged(event) {
    this.setState({ desktop: event.matches });
  }

  render() {
    return (
      <div className="layout">
        <Navbar color="faded" light fixed="top">
          <Nav className="nav-header">
            <NavItem>
              <NavLink className="drawer-button" role="button" tabIndex="0" onClick={this.toggleSidebarOpen}>
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
        <Sidebar
          sidebar={<div>Hello World, Shayne</div>}
          shadow={false}
          open={this.state.open && !this.state.desktop}
          docked={this.state.open && this.state.desktop}
          onSetOpen={this.onSetSidebarOpen}
          sidebarClassName="sidebar-content"
        >
          <Content />
        </Sidebar>
      </div>
    );
  }
}
