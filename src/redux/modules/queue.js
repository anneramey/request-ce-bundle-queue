import { Record, List } from 'immutable';

import { namespace, withPayload } from '../../utils';
import { Filter } from '../../records';

export const types = {
  SET_CURRENT_FILTER: namespace('queue', 'SET_CURRENT_FILTER'),
  FETCH_CURRENT_ITEM: namespace('queue', 'FETCH_CURRENT_ITEM'),
  SET_CURRENT_ITEM: namespace('queue', 'SET_CURRENT_ITEM'),
  SET_LIST_ITEMS: namespace('queue', 'SET_LIST_ITEMS'),
  SET_LIST_STATUS: namespace('queue', 'SET_LIST_STATUS'),
};

export const actions = {
  setCurrentFilter: withPayload(types.SET_CURRENT_FILTER),
  setListItems: withPayload(types.SET_LIST_ITEMS),
  setListStatus: withPayload(types.SET_LIST_STATUS),
};

export const State = Record({
  currentFilter: Filter(),
  currentItem: {},
  currentItemLoading: false,
  listItems: List(),
  listStatus: null,
});

export const reducer = (state = State(), { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_FILTER:
      return state.set('currentFilter', payload);
    case types.SET_LIST_ITEMS:
      return state.set('listItems', payload).set('listStatus', null);
    case types.SET_LIST_STATUS:
      return state.set('listStatus', payload);
    case types.FETCH_CURRENT_ITEM:
      return state.set('currentItemLoading', true);
    case types.SET_CURRENT_ITEM:
      return state.set('currentItemLoading', false).set('currentItem', payload);
    default:
      return state;
  }
};
