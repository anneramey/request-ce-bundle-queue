import { watchSubmissions } from './sagas/submissions';
import { watchApp } from './sagas/app';
import { watchQueue } from './sagas/queue';

export function* sagas() {
  yield [
    watchApp(),
    watchSubmissions(),
    watchQueue(),
  ];
}
