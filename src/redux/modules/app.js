import { Record, List } from 'immutable';
import { namespace, noPayload, withPayload } from '../../utils/namespace';

export const types = {
  LOAD_KAPP_SETTINGS: namespace('app', 'LOAD_KAPP_SETTINGS'),
  SET_KAPP_SETTINGS: namespace('app', 'SET_KAPP_SETTINGS'),
};

export const actions = {
  loadKappSettings: noPayload(types.LOAD_KAPP_SETTINGS),
  setKappSettings: withPayload(types.SET_KAPP_SETTINGS),
};

export const Filter = Record({
  name: '',
});

export const State = Record({
  filters: List(),
});

const reducer = (state = State(), { type }) => {
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
