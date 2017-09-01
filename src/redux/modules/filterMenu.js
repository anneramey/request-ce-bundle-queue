import { Map } from 'immutable';

export const types = {
  OPEN: '@kd/queue/filterMenu/OPEN',
  CLOSE: '@kd/queue/filterMenu/CLOSE',
  RESET: '@kd/queue/filterMenu/RESET',
  SHOW_SECTION: '@kd/queue/filterMenu/SHOW_SECTION',
};

export const actions = {
  open: initialFilter => ({ type: types.OPEN, payload: initialFilter }),
  close: () => ({ type: types.CLOSE }),
  showSection: section => ({ type: types.SHOW_SECTION, payload: section }),
};

export const defaultState = Map({
  isOpen: false,
  initialFilter: null,
  currentFilter: null,
  activeSection: null,
});

export const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.OPEN:
      return state
        .set('isOpen', true)
        .set('initialFilter', payload)
        .set('currentFilter', payload);
    case types.CLOSE:
      return defaultState;
    case types.RESET:
      return state.set('currentFilter', state.get('initialFilter'));
    case types.SHOW_SECTION:
      return state.set('activeSection', payload);
    default:
      return state;
  }
};
