import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import { bundle } from 'react-kinetic-core';

import bellIcon from 'font-awesome-svg-png/white/svg/bell.svg';
import infoCircleIcon from 'font-awesome-svg-png/white/svg/info-circle.svg';

export const Alerts = ({ alerts, fetchAlerts }) =>
    <UncontrolledDropdown className="nav-item-right">
      <DropdownToggle nav role="button" className="icon-wrapper">
        <SVGInline svg={bellIcon} className="icon" />
        { alerts.size > 0 &&
          <span className="badge">{alerts.size}</span>
        }
      </DropdownToggle>
      <DropdownMenu right className="alerts-menu">
        <div className="alerts-header">
          <span className="title">Alerts</span>
          <div className="actions">
            <a role="button" tabIndex="0" onClick={fetchAlerts}>
              Refresh
            </a>
            <span className="divider">&bull;</span>
            <a href={`${bundle.spaceLocation()}?page=alerts`}>View All</a>
            <span className="divider">&bull;</span>
            <a href={`${bundle.spaceLocation()}/admin/alerts`}>
              Create Alert
            </a>
          </div>
        </div>
        <div className="alerts-list">
          {alerts.map(alert => (
            <a
              key={alert.id}
              href={
                alert.values.URL ||
                `${bundle.spaceLocation()}?page=alerts#id-${alert.id}`
              }
              className="alert-item"
            >
              <div className="top">
                <span className="label">{alert.values.Source}</span>
                <span className="title">{alert.values.Title}</span>
              </div>
              <div>
                <span className="content">{alert.values.Content}</span>
              </div>
            </a>
          ))}
          {alerts.size < 1 &&
           <div className="empty-alerts icon-wrapper">
             <SVGInline svg={infoCircleIcon} className="icon" />
             There are no active alerts.
           </div>
          }
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>;
