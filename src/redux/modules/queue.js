import { Record, Map } from 'immutable';

import { namespace, withPayload, noPayload } from '../../utils';
import { Filter } from '../../records';

export const types = {
  SET_CURRENT_FILTER: namespace('queue', 'SET_CURRENT_FILTER'),
  FETCH_CURRENT_ITEM: namespace('queue', 'FETCH_CURRENT_ITEM'),
  SET_CURRENT_ITEM: namespace('queue', 'SET_CURRENT_ITEM'),
  UPDATE_CURRENT_ITEM: namespace('queue', 'UPDATE_CURRENT_ITEM'),
  FETCH_LIST: namespace('queue', 'FETCH_LIST'),
  SET_LIST_ITEMS: namespace('queue', 'SET_LIST_ITEMS'),
  SET_LIST_STATUS: namespace('queue', 'SET_LIST_STATUS'),
  SET_PREVIEW_ITEM: namespace('queue', 'SET_PREVIEW_ITEM'),

  OPEN_WORK_MENU: namespace('queue', 'OPEN_WORK_MENU'),
  CLOSE_WORK_MENU: namespace('queue', 'CLOSE_WORK_MENU'),
};

export const actions = {
  setCurrentFilter: withPayload(types.SET_CURRENT_FILTER),
  fetchCurrentItem: withPayload(types.FETCH_CURRENT_ITEM),
  setCurrentItem: withPayload(types.SET_CURRENT_ITEM),
  updateCurrentItem: withPayload(types.UPDATE_CURRENT_ITEM),
  fetchList: withPayload(types.FETCH_LIST),
  setListItems: (name, list) =>
    ({ type: types.SET_LIST_ITEMS, payload: { name, list } }),
  setListStatus: withPayload(types.SET_LIST_STATUS),
  setPreviewItem: withPayload(types.SET_PREVIEW_ITEM),

  openWorkMenu: noPayload(types.OPEN_WORK_MENU),
  closeWorkMenu: noPayload(types.CLOSE_WORK_MENU),
};

export const State = Record({
  currentFilter: Filter(),
  currentItem: null,
  currentItemLoading: false,
  lists: Map(),
  listStatus: null,
  previewItem: null,
  workMenuOpen: false,
});

export const isItemComplete = queueItem =>
  queueItem.values.Status && (queueItem.values.Status === 'Complete' || queueItem.values.Status === 'Cancelled');

export const reducer = (state = State(), { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_FILTER:
      return state.set('currentFilter', payload);
    case types.SET_LIST_ITEMS:
      return state
        .setIn(['lists', payload.name], payload.list)
        .set('listStatus', null);
    case types.SET_LIST_STATUS:
      return state.set('listStatus', payload);
    case types.FETCH_CURRENT_ITEM:
      return state.set('currentItemLoading', true);
    case types.SET_CURRENT_ITEM:
      return state.set('currentItemLoading', false).set('currentItem', payload);
    case types.SET_PREVIEW_ITEM:
      return state.set('previewItem', payload);
    case types.OPEN_WORK_MENU:
      return state.set('workMenuOpen', true);
    case types.CLOSE_WORK_MENU:
      return state.set('workMenuOpen', false);
    default:
      return state;
  }
};
