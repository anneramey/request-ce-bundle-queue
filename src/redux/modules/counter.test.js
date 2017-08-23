import reducer, { actions, defaultState, types } from './counter';

describe('counter redux module', () => {
  describe('action creators', () => {
    test('incrementCounter action', () => {
      expect(actions.incrementCounter()).toEqual({ type: types.INCREMENT_COUNTER });
    });

    test('decrementCounter action', () => {
      expect(actions.decrementCounter()).toEqual({ type: types.DECREMENT_COUNTER });
    });

    test('doubleCounter action', () => {
      expect(actions.doubleCounter()).toEqual({ type: types.DOUBLE_COUNTER });
    });
  });

  describe('reducers', () => {
    test('reducer initializes with default state',
      () => expect(reducer(undefined, {})).toEqual(defaultState),
    );

    test('INCREMENT_COUNTER increments the count', () => {
      const action = actions.incrementCounter();
      expect(reducer(defaultState, action)).toBe(defaultState + 1);
    });

    test('DECREMENT_COUNTER decrements the count', () => {
      const action = actions.decrementCounter();
      const state = defaultState + 1;
      expect(reducer(state, action)).toBe(state - 1);
    });

    test('DOUBLE_COUNTER doubles the count', () => {
      const action = actions.doubleCounter();
      const state = defaultState + 2;
      expect(reducer(state, action)).toBe(state * 2);
    });
  });
});
