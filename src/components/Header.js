import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { List } from 'immutable';
import moment from 'moment';
import SVGInline from 'react-svg-inline';
import { bundle } from 'react-kinetic-core';
import personIcon from 'font-awesome-svg-png/white/svg/user.svg';
import bellIcon from 'font-awesome-svg-png/white/svg/bell.svg';
import hamburgerIcon from '../images/hamburger.svg';

export const Header = ({ toggleSidebarOpen, alerts, fetchAlerts }) =>
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
        <DropdownMenu right className="alerts-menu">
          <div className="alerts-header">
            <span className="title">Alerts</span>
            <div className="actions">
              <a role="button" tabIndex="0" onClick={fetchAlerts}>Refresh</a>
              <span className="divider">&bull;</span>
              <a href={`${bundle.spaceLocation()}?page=alerts`}>View All</a>
              <span className="divider">&bull;</span>
              <a href={`${bundle.spaceLocation()}/admin/alerts`}>Create Alert</a>
            </div>
          </div>
          <div className="alerts-list">
            {
              List(alerts)
                .filter(alert =>
                  !alert.values['Start Date Time'] ||
                  moment(alert.values['Start Date Time']).isBefore(),
                )
                .sortBy(alert =>
                  moment(alert.values['Start Date Time'] || alert.createdAt).unix(),
                )
                .reverse()
                .map(alert =>
                  <a
                    key={alert.id}
                    href={alert.values.URL || `${bundle.spaceLocation()}?page=alerts#id-${alert.id}`}
                    className="alert-item"
                  >
                    <div className="top">
                      <span className="label">{alert.values.Source}</span>
                      <span className="title">{alert.values.Title}</span>
                    </div>
                    <div>
                      <span className="content">{alert.values.Content}</span>
                    </div>
                  </a>,
                )
            }
          </div>
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
