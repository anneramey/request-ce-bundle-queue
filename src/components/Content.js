import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { NotificationsContainer } from './notifications/NotificationsContainer';
import { FilterMenuContainer } from './FilterMenu/FilterMenuContainer';
import { QueueItemContainer } from './QueueItem/QueueItem';
import { QueueListContainer } from './queueList/QueueListContainer';
import { NewItemMenuContainer } from './newItemMenu/NewItemMenuContainer';
import { ModalFormContainer } from './ModalFormContainer';

export const Content = () => (
  <div className="content">
    <NotificationsContainer />
    <Route path="/" exact render={() => <Redirect to="/list/Mine" />} />
    <Route path="/list/:filter" component={QueueListContainer} />
    <Route path="/custom" component={QueueListContainer} />
    <Route path="/item/:id" component={QueueItemContainer} />
    <FilterMenuContainer />
    <NewItemMenuContainer />
    <ModalFormContainer />
  </div>
);
