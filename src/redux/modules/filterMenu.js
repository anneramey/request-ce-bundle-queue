import { Map } from 'immutable';

export const types = {
  OPEN: '@kd/queue/filterMenu/OPEN',
  CLOSE: '@kd/queue/filterMenu/CLOSE',
  RESET: '@kd/queue/filterMenu/RESET',
  SHOW_SECTION: '@kd/queue/filterMenu/SHOW_SECTION',
  TOGGLE_ASSIGNMENT: '@kd/queue/filterMenu/TOGGLE_ASSIGNMENT',
  TOGGLE_TEAM: '@kd/queue/filterMenu/TOGGLE_TEAM',
  TOGGLE_STATUS: '@kd/queue/filterMenu/TOGGLE_STATUS',
  SET_DATE_RANGE_TIMELINE: '@kd/queue/filterMenu/SET_DATE_RANGE_TIMELINE',
  SET_DATE_RANGE_PRESET: '@kd/queue/filterMenu/SET_DATE_RANGE_PRESET',
  TOGGLE_DATE_RANGE_CUSTOM: '@kd/queue/filterMenu/TOGGLE_DATE_RANGE_CUSTOM',
  SET_DATE_RANGE_START: '@kd/queue/filterMenu/SET_DATE_RANGE_START',
  SET_DATE_RANGE_END: '@kd/queue/filterMenu/SET_DATE_RANGE_END',
};

export const actions = {
  open: initialFilter => ({ type: types.OPEN, payload: initialFilter }),
  close: () => ({ type: types.CLOSE }),
  reset: () => ({ type: types.RESET }),
  showSection: section => ({ type: types.SHOW_SECTION, payload: section }),
  toggleAssignment: payload => ({ type: types.TOGGLE_ASSIGNMENT, payload }),
  toggleTeam: payload => ({ type: types.TOGGLE_TEAM, payload }),
  toggleStatus: payload => ({ type: types.TOGGLE_STATUS, payload }),
  setDateRangeTimeline: payload => ({ type: types.SET_DATE_RANGE_TIMELINE, payload }),
  setDateRangePreset: payload => ({ type: types.SET_DATE_RANGE_PRESET, payload }),
  toggleDateRangeCustom: () => ({ type: types.TOGGLE_DATE_RANGE_CUSTOM }),
  setDateRangeStart: payload => ({ type: types.SET_DATE_RANGE_START, payload }),
  setDateRangeEnd: payload => ({ type: types.SET_DATE_RANGE_END, payload }),
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
    case types.TOGGLE_ASSIGNMENT:
      return state.updateIn(['currentFilter', 'assignments', payload], bool => !bool);
    case types.TOGGLE_TEAM:
      return state.getIn(['currentFilter', 'teams']).includes(payload)
        ? state.updateIn(['currentFilter', 'teams'], teams => teams.delete(teams.indexOf(payload)))
        : state.updateIn(['currentFilter', 'teams'], teams => teams.push(payload));
    case types.TOGGLE_STATUS:
      return state.getIn(['currentFilter', 'status']).includes(payload)
        ? state.updateIn(['currentFilter', 'status'], statuses => statuses.delete(statuses.indexOf(payload)))
        : state.updateIn(['currentFilter', 'status'], statuses => statuses.push(payload));
    case types.SET_DATE_RANGE_TIMELINE:
      return state.setIn(['currentFilter', 'dateRange', 'timeline'], payload);
    case types.SET_DATE_RANGE_PRESET:
      return state
        .setIn(['currentFilter', 'dateRange', 'preset'], payload)
        .setIn(['currentFilter', 'dateRange', 'custom'], false);
    case types.TOGGLE_DATE_RANGE_CUSTOM:
      return state
        .updateIn(['currentFilter', 'dateRange', 'custom'], bool => !bool)
        .setIn(['currentFilter', 'dateRange', 'preset'], '');
    case types.SET_DATE_RANGE_START:
      return state.setIn(['currentFilter', 'dateRange', 'start'], payload);
    case types.SET_DATE_RANGE_END:
      return state.setIn(['currentFilter', 'dateRange', 'end'], payload);
    default:
      return state;
  }
};
