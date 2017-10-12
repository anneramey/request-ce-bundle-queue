import { Record, Map, List } from 'immutable';

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
  TOGGLE_SORT_DIRECTION: namespace('queue', 'TOGGLE_SORT_DIRECTION'),
  OPEN_WORK_MENU: namespace('queue', 'OPEN_WORK_MENU'),
  CLOSE_WORK_MENU: namespace('queue', 'CLOSE_WORK_MENU'),

  OPEN_PREVIEW: namespace('queue', 'OPEN_PREVIEW'),
  CLOSE_PREVIEW: namespace('queue', 'CLOSE_PREVIEW'),

  OPEN_NEW_MENU: namespace('queue', 'OPEN_NEW_MENU'),
  CLOSE_NEW_MENU: namespace('queue', 'CLOSE_NEW_MENU'),
};

export const actions = {
  setCurrentFilter: withPayload(types.SET_CURRENT_FILTER),
  fetchCurrentItem: withPayload(types.FETCH_CURRENT_ITEM),
  setCurrentItem: withPayload(types.SET_CURRENT_ITEM),
  updateCurrentItem: withPayload(types.UPDATE_CURRENT_ITEM),
  fetchList: withPayload(types.FETCH_LIST),
  setListItems: (name, list) => ({
    type: types.SET_LIST_ITEMS,
    payload: { name, list },
  }),
  setListStatus: withPayload(types.SET_LIST_STATUS),
  setPreviewItem: withPayload(types.SET_PREVIEW_ITEM),
  toggleSortDirection: noPayload(types.TOGGLE_SORT_DIRECTION),
  openWorkMenu: noPayload(types.OPEN_WORK_MENU),
  closeWorkMenu: noPayload(types.CLOSE_WORK_MENU),

  openPreview: withPayload(types.OPEN_PREVIEW),
  closePreview: noPayload(types.CLOSE_PREVIEW),

  openNewItemMenu: noPayload(types.OPEN_NEW_MENU),
  closeNewItemMenu: noPayload(types.CLOSE_NEW_MENU),
};

export const State = Record({
  sortDirection: 'ASC',
  currentFilter: Filter(),
  currentItem: null,
  currentItemLoading: false,
  lists: Map(),
  listStatus: null,
  previewItem: null,
  workMenuOpen: false,
  newItemMenuOpen: false,
});

export const isItemComplete = queueItem =>
  queueItem.values.Status &&
  (queueItem.values.Status === 'Complete' ||
    queueItem.values.Status === 'Cancelled');

export const reducer = (state = State(), { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_FILTER:
      return state.set('currentFilter', payload).set('sortDirection', 'ASC');
    case types.SET_LIST_ITEMS:
      return state
        .setIn(['lists', payload.name], List(payload.list))
        .set('listStatus', null);
    case types.SET_LIST_STATUS:
      return state.set('listStatus', payload);
    case types.FETCH_CURRENT_ITEM:
      return state.set('currentItemLoading', true);
    case types.SET_CURRENT_ITEM:
      return state.set('currentItemLoading', false).set('currentItem', payload);
    case types.OPEN_PREVIEW:
      return state.set('previewItem', payload);
    case types.CLOSE_PREVIEW:
      return state.set('previewItem', null);
    case types.TOGGLE_SORT_DIRECTION:
      return state.set(
        'sortDirection',
        state.sortDirection === 'ASC' ? 'DESC' : 'ASC',
      );
    case types.OPEN_WORK_MENU:
      return state.set('workMenuOpen', true);
    case types.CLOSE_WORK_MENU:
      return state.set('workMenuOpen', false);
    case types.OPEN_NEW_MENU:
      return state.set('newItemMenuOpen', true);
    case types.CLOSE_NEW_MENU:
      return state.set('newItemMenuOpen', false);
    default:
      return state;
  }
};
