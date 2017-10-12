import { watchApp } from './sagas/app';
import { watchQueue } from './sagas/queue';
import { watchErrors } from './sagas/errors';
import { watchAlerts } from './sagas/alerts';

export function* sagas() {
  yield [watchErrors(), watchApp(), watchQueue(), watchAlerts()];
}
