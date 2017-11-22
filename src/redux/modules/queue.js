import { Record, Map, List } from 'immutable';
import { LOCATION_CHANGE } from 'connected-react-router';

import { namespace, withPayload, noPayload } from '../../utils';
import { Filter, AssignmentCriteria } from '../../records';

export const types = {
  SET_ADHOC_FILTER: namespace('queue', 'SET_ADHOC_FILTER'),
  FETCH_CURRENT_ITEM: namespace('queue', 'FETCH_CURRENT_ITEM'),
  SET_CURRENT_ITEM: namespace('queue', 'SET_CURRENT_ITEM'),
  UPDATE_QUEUE_ITEM: namespace('queue', 'UPDATE_QUEUE_ITEM'),
  FETCH_LIST: namespace('queue', 'FETCH_LIST'),
  SET_LIST_ITEMS: namespace('queue', 'SET_LIST_ITEMS'),
  SET_LIST_STATUS: namespace('queue', 'SET_LIST_STATUS'),
  SET_PREVIEW_ITEM: namespace('queue', 'SET_PREVIEW_ITEM'),
  TOGGLE_SORT_DIRECTION: namespace('queue', 'TOGGLE_SORT_DIRECTION'),

  OPEN_PREVIEW: namespace('queue', 'OPEN_PREVIEW'),
  CLOSE_PREVIEW: namespace('queue', 'CLOSE_PREVIEW'),

  OPEN_NEW_MENU: namespace('queue', 'OPEN_NEW_MENU'),
  CLOSE_NEW_MENU: namespace('queue', 'CLOSE_NEW_MENU'),
};

export const actions = {
  setAdhocFilter: withPayload(types.SET_ADHOC_FILTER),
  fetchCurrentItem: withPayload(types.FETCH_CURRENT_ITEM),
  setCurrentItem: withPayload(types.SET_CURRENT_ITEM),
  updateQueueItem: withPayload(types.UPDATE_QUEUE_ITEM),
  fetchList: withPayload(types.FETCH_LIST),
  setListItems: (filter, list) => ({
    type: types.SET_LIST_ITEMS,
    payload: { filter, list },
  }),
  setListStatus: withPayload(types.SET_LIST_STATUS),
  setPreviewItem: withPayload(types.SET_PREVIEW_ITEM),
  toggleSortDirection: noPayload(types.TOGGLE_SORT_DIRECTION),

  openPreview: withPayload(types.OPEN_PREVIEW),
  closePreview: noPayload(types.CLOSE_PREVIEW),

  openNewItemMenu: withPayload(types.OPEN_NEW_MENU),
  closeNewItemMenu: noPayload(types.CLOSE_NEW_MENU),
};

export const State = Record({
  sortDirection: 'ASC',
  currentItem: null,
  currentItemLoading: false,
  adhocFilter: Filter({
    type: 'adhoc',
    assignments: AssignmentCriteria({ mine: true }),
  }),
  lists: Map(),
  listStatus: null,
  previewItem: null,
  newItemMenuOpen: false,
  newItemMenuOptions: Map(),
});

export const reducer = (state = State(), { type, payload }) => {
  switch (type) {
    case types.SET_ADHOC_FILTER:
      return state.set('adhocFilter', payload);
    case types.SET_LIST_ITEMS:
      // If there was a preview item and it was in the new list that was
      // retrieved we want to update the previewItem state so the preview panel
      // reflects the latest data.
      const updatedPreviewItem =
        state.previewItem &&
        payload.list.find(item => item.id === state.previewItem.id);
      return state
        .setIn(['lists', payload.filter], List(payload.list))
        .set('previewItem', updatedPreviewItem || state.previewItem)
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
    case types.OPEN_NEW_MENU:
      return state
        .set('newItemMenuOpen', true)
        .set('newItemMenuOptions', Map(payload));
    case types.CLOSE_NEW_MENU:
      return state.set('newItemMenuOpen', false).remove('newItemMenuOptions');
    case LOCATION_CHANGE:
      return state.set('sortDirection', 'ASC');
    default:
      return state;
  }
};
