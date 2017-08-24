import React from 'react';
import { connect } from 'react-redux';
import SVGInline from 'react-svg-inline';
import 'bootstrap/scss/bootstrap.scss';
import personIcon from 'open-iconic/svg/person.svg';
import bellIcon from 'open-iconic/svg/bell.svg';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import hamburgerIcon from '../images/hamburger.svg';
import '../styles/master.css';

export const App = () =>
  <div>
    <nav className="navigation">
      <button className="btn btn-link drawer-button">
        <SVGInline svg={hamburgerIcon} className="icon" cleanup={['height', 'width']} />
      </button>
      <UncontrolledDropdown>
        <DropdownToggle caret nav>
          Queue
        </DropdownToggle>
        <DropdownMenu left>
          <DropdownItem>Services</DropdownItem>
          <DropdownItem>Teams</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Admin</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <button className="btn btn-link right">
        <SVGInline svg={personIcon} className="icon" cleanup={['height', 'width']} />
      </button>
      <button className="btn btn-link right">
        <SVGInline svg={bellIcon} className="icon" cleanup={['height', 'width']} />
      </button>
    </nav>
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

export const AppContainer = connect(null)(App);
