import { all } from 'redux-saga/effects';
import { watchApp } from './sagas/app';
import { watchQueue } from './sagas/queue';
import { watchErrors } from './sagas/errors';
import { watchAlerts } from './sagas/alerts';
import { watchDiscussion } from './sagas/discussions';
import { watchLayout } from './sagas/layout';
import { watchKinops } from '../lib/react-kinops-components';

export function* sagas() {
  yield all([
    watchErrors(),
    watchApp(),
    watchQueue(),
    watchAlerts(),
    watchDiscussion(),
    watchLayout(),
    watchKinops(),
  ]);
}
