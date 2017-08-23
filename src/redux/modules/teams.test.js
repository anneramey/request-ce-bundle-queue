import reducer, { actions, defaultState, types } from './teams';

describe('teams redux module', () => {
  describe('action creators', () => {
    test('#fetchTeams', () => {
      const action = actions.fetchTeams();
      expect(action.type).toBe(types.FETCH_TEAMS);
      expect(action.payload).toBeUndefined();
    });

    test('#setTeams', () => {
      const action = actions.setTeams(['a']);
      expect(action.type).toBe(types.SET_TEAMS);
      expect(action.payload).toBeInstanceOf(Array);
      expect(action.payload).toHaveLength(1);
    });

    test('#setTeamsErrors', () => {
      const action = actions.setTeamsErrors(['a']);
      expect(action.type).toBe(types.SET_TEAMS_ERRORS);
      expect(action.payload).toBeInstanceOf(Array);
      expect(action.payload).toHaveLength(1);
    });
  });

  describe('reducers', () => {
    test('initializes with default state', () => {
      expect(reducer(undefined, {})).toBe(defaultState);
    });

    test('invalid actions do not change state', () => {
      const before = { ...defaultState, foo: 'bar' };
      const after = reducer(before, { type: 'INVALID_FAKE_ACTION' });
      expect(after).toEqual(before);
    });

    test('FETCH_TEAMS', () => {
      const action = actions.fetchTeams();
      const state = reducer(defaultState, action);
      expect(state.loading).toBeTruthy();
      expect(state.errors).toHaveLength(0);
    });

    test('SET_TEAMS', () => {
      const action = actions.setTeams(['a']);
      const before = { ...defaultState, loading: true };
      const after = reducer(before, action);
      expect(after.loading).toBeFalsy();
      expect(after.data).toBeInstanceOf(Array);
      expect(after.data).toHaveLength(1);
    });

    test('SET_TEAMS_ERRORS', () => {
      const action = actions.setTeamsErrors(['a']);
      const before = { ...defaultState, loading: true };
      const after = reducer(before, action);
      expect(after.loading).toBeFalsy();
      expect(after.errors).toBeInstanceOf(Array);
      expect(after.errors).toHaveLength(1);
    });
  });
});
