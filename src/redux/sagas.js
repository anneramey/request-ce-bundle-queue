import { watchApp } from './sagas/app';
import { watchQueue } from './sagas/queue';
import { watchErrors } from './sagas/errors';
import { watchAlerts } from './sagas/alerts';
import { watchKinops } from '../lib/react-kinops-components';

export function* sagas() {
  yield [watchErrors(), watchApp(), watchQueue(), watchAlerts(), watchKinops()];
}
