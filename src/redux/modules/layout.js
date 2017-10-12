import { Map } from 'immutable';

export const types = {
  SET_IS_LAYOUT_LARGE: '@kd/queue/SET_IS_LAYOUT_LARGE'
};

export const actions = {
  setIsLayoutLarge: payload => ({ type: types.SET_IS_LAYOUT_LARGE, payload })
};

export const defaultState = Map({
  isLayoutLarge: true
});

export const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.SET_IS_LAYOUT_LARGE:
      return state.set('isLayoutLarge', payload);
    default:
      return state;
  }
};
