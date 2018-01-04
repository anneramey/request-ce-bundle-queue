import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NotificationsContainer } from './notifications/NotificationsContainer';
import { FilterMenuContainer } from './FilterMenu/FilterMenuContainer';
import { QueueItemContainer } from './QueueItem/QueueItem';
import { QueueListContainer } from './queueList/QueueListContainer';
import { NewItemMenuContainer } from './newItemMenu/NewItemMenuContainer';
import { ModalFormContainer } from 'react-kinops-common';
import { ToastsContainer } from 'react-kinops-common';
import { WorkMenuContainer } from './WorkMenu';

import 'react-kinops-common/styles/master.scss';

const globals = import('../globals');

export const Content = () => (
  <div>
    <ToastsContainer />
    <NotificationsContainer />
    <Route path="/" exact render={() => <Redirect to="/list/Mine" />} />
    <Route path="/list/:filter" component={QueueListContainer} />
    <Route path="/custom" component={QueueListContainer} />
    <Route path="/item/:id" component={QueueItemContainer} />
    <Route
      path="/queue/filter/__show__/details/:id/summary"
      render={({ match }) => <Redirect to={`/item/${match.params.id}`} />}
    />
    <FilterMenuContainer />
    <NewItemMenuContainer />
    <ModalFormContainer globals={globals} />
    <WorkMenuContainer />
  </div>
);
