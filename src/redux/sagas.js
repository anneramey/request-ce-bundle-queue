import { watchSubmissions } from './sagas/submissions';
import { watchApp } from './sagas/app';

export function* sagas() {
  yield [
    watchApp(),
    watchSubmissions(),
  ];
}
