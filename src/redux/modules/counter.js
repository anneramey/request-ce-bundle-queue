export const types = {
  INCREMENT_COUNTER: 'INCREMENT_COUNTER',
  DECREMENT_COUNTER: 'DECREMENT_COUNTER',
  DOUBLE_COUNTER: 'DOUBLE_COUNTER',
};

export const actions = {
  incrementCounter: () => ({ type: types.INCREMENT_COUNTER }),
  decrementCounter: () => ({ type: types.DECREMENT_COUNTER }),
  doubleCounter: () => ({ type: types.DOUBLE_COUNTER }),
};

export const defaultState = 0;

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.INCREMENT_COUNTER: return state + 1;
    case types.DECREMENT_COUNTER: return state - 1;
    case types.DOUBLE_COUNTER: return state * 2;
    default: return state;
  }
};

export default reducer;
