import { Record } from 'immutable';

import { namespace, withPayload } from '../../utils';
import { Filter } from './app';

export const types = {
  SET_CURRENT_FILTER: namespace('queue', 'SET_CURRENT_FILTER'),
};

export const actions = {
  setCurrentFilter: withPayload(types.SET_CURRENT_FILTER),
};

export const State = Record({
  currentFilter: Filter(),
});

export const reducer = (state = State(), { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_FILTER:
      return state.set('currentFilter', payload);
    default:
      return state;
  }
};
