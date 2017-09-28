import React from 'react';
import { Route } from 'react-router-dom';

import { NotificationsContainer } from './notifications/NotificationsContainer';
import { FilterMenuContainer } from './FilterMenu/FilterMenuContainer';
import { QueueItemContainer } from './QueueItem/QueueItem';
import { QueueListContainer } from './queueList/QueueListContainer';

export const Content = () =>
  <div className="content">
    <NotificationsContainer />
    <Route path="/" exact render={() => <div>Please select a list</div>} />
    <Route path="/list/:filter" render={routeProps => <QueueListContainer {...routeProps} />} />
    <Route path="/item/:id" component={QueueItemContainer} />
    <FilterMenuContainer />
  </div>;
