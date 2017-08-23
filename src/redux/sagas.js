import { watchSubmissions } from './sagas/submissions';

export function* sagas() {
  yield [
    watchSubmissions(),
  ];
}
