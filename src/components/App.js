import React from 'react';
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
