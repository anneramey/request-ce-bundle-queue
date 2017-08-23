import reducer, { actions, defaultState, types } from './profile';

describe('profile redux module', () => {
  describe('action creators', () => {
    test('fetchProfile action', () => {
      const action = actions.fetchProfile();
      expect(action.type).toBe(types.FETCH_PROFILE);
      expect(action.payload).toBeUndefined();
    });

    test('putProfile action', () => {
      const action = actions.updateProfile({ test: 'test' });
      const profile = { test: 'test' };
      expect(action.type).toBe(types.UPDATE_PROFILE);
      expect(action.payload).toEqual(profile);
    });
  });

  describe('reducers', () => {
    test('initializes with default state', () => {
      expect(reducer(undefined, {})).toBe(defaultState);
    });

    test('FETCH_PROFILE sets state to load', () => {
      const action = actions.fetchProfile();
      const state = reducer(defaultState, action);
      expect(state.loading).toBeTruthy();
      expect(state.errors).toHaveLength(0);
    });

    test('FETCH_PROFILE_ERROR', () => {
      const errors = ['no worky'];
      const action = actions.fetchProfileError(errors);
      const before = { ...defaultState, loading: true, errors: [] };
      const after = reducer(before, action);

      expect(after.loading).toBeFalsy();
      expect(after.errors).toHaveLength(1);
      expect(after.errors).toContain(errors[0]);
    });

    test('SET_PROFILE', () => {
      const profile = { test: 'test' };
      const action = actions.setProfile(profile);
      const before = { ...defaultState, loading: true, errors: [], data: {} };
      const after = reducer(before, action);

      expect(after.data).toBeDefined();
      expect(after.data).toEqual(profile);
      expect(after.loading).toBeFalsy();
      expect(after.errors).toHaveLength(0);
    });

    test('UPDATE_PROFILE does not change state', () => {
      const result = { displayName: 'test' };
      const action = actions.updateProfile(result);
      const state = reducer(defaultState, action);

      expect(state).toEqual(state);
    });
  });
});
