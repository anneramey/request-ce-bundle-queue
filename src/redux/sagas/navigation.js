import { delay } from 'redux-saga';
import { cancelled, takeLatest } from 'redux-saga/effects';

function* changeNavigation(action) {
  const location = action.payload.location;
  window.console.log(`Loading location: ${location}`);
  // eslint-disable-next-line
  while (true) {
    yield delay(500);
    if (yield cancelled()) {
      window.console.log(`Unloading location: ${location}`);
    }
  }
}

export function* watchNavigation() {
  yield [
    takeLatest('@@router/LOCATION_CHANGE', changeNavigation),
  ];
}
