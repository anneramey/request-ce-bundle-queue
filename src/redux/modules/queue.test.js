import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { reducer, actions, State } from './queue';
import { Filter } from '../../records';

beforeEach(() => jest.addMatchers(matchers));

describe('reducer', () => {
  describe('INIT', () => {
    test('sets to State()', () => {
      expect(reducer(undefined, {})).toEqualImmutable(State());
    });
  });

  describe('SET_ADHOC_FILTER', () => {
    test('sets adhocFilter to the payload value', () => {
      const state = State({ adhocFilter: Filter() });
      const filter = Filter();
      const action = actions.setAdhocFilter(filter);
      expect(reducer(state, action).adhocFilter).toBe(filter);
    });
  });

  describe('SET_LIST_ITEMS', () => {
    test('sets value in lists using the filter as the key listStatus to null', () => {
      const filter1 = Filter({ name: 'Filter 1' });
      const filter2 = Filter({ name: 'Filter 2' });
      const state = State({
        lists: Map([[filter1, List()], [filter2, List()]]),
        listStatus: 'Failed',
        previewItem: null,
      });
      const queueItems = [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }];
      const action = actions.setListItems(filter1, queueItems);
      expect(reducer(state, action).lists).toEqualImmutable(
        Map([[filter1, List(queueItems)], [filter2, List()]]),
      );
      expect(reducer(state, action).listStatus).toBeNull();
      expect(reducer(state, action).previewItem).toBeNull();
    });

    test('if there is a preview item and it is in the payloads list, preview item should be updated', () => {
      const previewItem = { id: 'other' };
      const state = State({ previewItem });
      const action = actions.setListItems(Filter({ name: 'Filter 1' }), [
        { id: 'foo' },
        { id: 'bar' },
        { id: 'baz' },
      ]);
      expect(reducer(state, action).previewItem).toBe(previewItem);
    });

    test('if there is a preview item and it is not in the payloads list, preview item should not be updated', () => {
      const previewItem = { id: 'bar' };
      const state = State({ previewItem });
      const list = [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }];
      const action = actions.setListItems(Filter({ name: 'Filter 1' }), list);
      expect(reducer(state, action).previewItem).toBe(list[1]);
    });
  });

  describe('SET_LIST_STATUS', () => {
    test('sets listStatus to the payload value', () => {
      const state = State({ listStatus: null });
      const action = actions.setListStatus('Failed');
      expect(reducer(state, action).listStatus).toEqual('Failed');
    });
  });

  describe('FETCH_CURRENT_ITEM', () => {
    test('sets currentItemLoading to true', () => {
      const state = State({ currentItemLoading: false });
      const action = actions.fetchCurrentItem('abc123');
      expect(reducer(state, action).currentItemLoading).toEqual(true);
    });
  });

  describe('SET_CURRENT_ITEM', () => {
    test('sets currentItemLoading to false and sets currentItem to the payload value', () => {
      const state = State({ currentItemLoading: true });
      const queueItem = {};
      const action = actions.setCurrentItem(queueItem);
      expect(reducer(state, action).currentItemLoading).toEqual(false);
      expect(reducer(state, action).currentItem).toBe(queueItem);
    });
  });

  describe('OPEN_PREVIEW', () => {
    test('sets previewItem to the payload value', () => {
      const state = State({ previewItem: null });
      const queueItem = {};
      const action = actions.openPreview(queueItem);
      expect(reducer(state, action).previewItem).toBe(queueItem);
    });
  });

  describe('CLOSE_PREVIEW', () => {
    test('sets previewItem to null', () => {
      const state = State({ previewItem: {} });
      const action = actions.closePreview();
      expect(reducer(state, action).previewItem).toBeNull();
    });
  });

  describe('TOGGLE_SORT_DIRECTION', () => {
    test('sets sortDirection to ASC from DESC', () => {
      const state = State({ sortDirection: 'DESC' });
      const action = actions.toggleSortDirection();
      expect(reducer(state, action).sortDirection).toEqual('ASC');
    });

    test('sets sortDirection to DESC from ASC', () => {
      const state = State({ sortDirection: 'ASC' });
      const action = actions.toggleSortDirection();
      expect(reducer(state, action).sortDirection).toEqual('DESC');
    });
  });

  describe('OPEN_NEW_MENU', () => {
    test('sets newItemMenuOpen to true and newItemMenuOptions to payload value', () => {
      const state = State({
        newItemMenuOpen: false,
        newItemMenuOptions: Map(),
      });
      const menuOptions = {
        fname: 'Shayne',
        lname: 'Koestler',
      };
      const action = actions.openNewItemMenu(menuOptions);
      expect(reducer(state, action).newItemMenuOpen).toEqual(true);
      expect(reducer(state, action).newItemMenuOptions).toEqualImmutable(
        Map(menuOptions),
      );
    });
  });

  describe('CLOSE_NEW_MENU', () => {
    test('sets newItemMenuOpen to false and newItemMenuOptions to an empty Map', () => {
      const state = State({
        newItemMenuOpen: true,
        newItemMenuOptions: Map({
          fname: 'Shayne',
          lname: 'Koestler',
        }),
      });
      const action = actions.closeNewItemMenu();
      expect(reducer(state, action).newItemMenuOpen).toEqual(false);
      expect(reducer(state, action).newItemMenuOptions).toEqualImmutable(Map());
    });
  });

  describe('LOCATION_CHANGE', () => {
    test('sets sortDirection to ASC from anything', () => {
      const state = State({ sortDirection: 'foo' });
      const action = actions.toggleSortDirection();
      expect(reducer(state, action).sortDirection).toEqual('ASC');
    });
  });
});
