import { Record, List } from 'immutable';
import { namespace, noPayload, withPayload } from '../../utils/namespace';

export const types = {
  LOAD_KAPP_SETTINGS: namespace('app', 'LOAD_KAPP_SETTINGS'),
  SET_KAPP_SETTINGS: namespace('app', 'SET_KAPP_SETTINGS'),

  LOAD_PROFILE_SETTINGS: namespace('app', 'LOAD_PROFILE_SETTINGS'),
  SET_PROFILE_SETTINGS: namespace('app', 'SET_PROFILE_SETTINGS'),
};

export const actions = {
  loadKappSettings: noPayload(types.LOAD_KAPP_SETTINGS),
  setKappSettings: withPayload(types.SET_KAPP_SETTINGS),

  loadProfileSettings: noPayload(types.LOAD_PROFILE_SETTINGS),
  setProfileSettings: withPayload(types.SET_PROFILE_SETTINGS),
};

export const Profile = Record({
  displayName: '',
});

export const Filter = Record({
  name: '',
});

export const State = Record({
  profile: Profile(),
  filters: List(),
});

const reducer = (state = State(), { type }) => {
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
