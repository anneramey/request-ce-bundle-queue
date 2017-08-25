import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { Header } from './Header';
import { Content } from './Content';
import { Sidebar as SidebarContent } from './Sidebar';

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
    const sidebarClass = this.state.desktop
      ? 'sidebar-content-drawer'
      : 'sidebar-content-overlay';
    return (
      <div className="layout">
        <Header toggleSidebarOpen={this.toggleSidebarOpen} />
        <Sidebar
          sidebar={<SidebarContent />}
          shadow={false}
          open={this.state.open && !this.state.desktop}
          docked={this.state.open && this.state.desktop}
          onSetOpen={this.onSetSidebarOpen}
          sidebarClassName={`sidebar-content ${sidebarClass}`}
        >
          <Content />
        </Sidebar>
      </div>
    );
  }
}
