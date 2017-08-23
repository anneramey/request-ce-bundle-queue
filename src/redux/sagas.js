import { watchProfile } from './sagas/profile';
import { watchTeams } from './sagas/teams';
import { watchSubmissions } from './sagas/submissions';

export function* sagas() {
  yield [
    watchProfile(),
    watchTeams(),
    watchSubmissions(),
  ];
}
