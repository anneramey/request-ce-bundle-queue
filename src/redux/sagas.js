import { watchApp } from './sagas/app';
import { watchQueue } from './sagas/queue';
import { watchErrors } from './sagas/errors';
import { watchAlerts } from './sagas/alerts';
import { watchDiscussion, watchDiscussionSocket } from './sagas/discussions';

export function* sagas() {
  yield [
    watchErrors(),
    watchApp(),
    watchQueue(),
    watchAlerts(),
    watchDiscussion(),
    watchDiscussionSocket(),
  ];
}
