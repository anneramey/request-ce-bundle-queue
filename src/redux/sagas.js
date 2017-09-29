import { watchApp } from './sagas/app';
import { watchQueue } from './sagas/queue';
import { watchErrors } from './sagas/errors';

export function* sagas() {
  yield [
    watchErrors(),
    watchApp(),
    watchQueue(),
  ];
}
