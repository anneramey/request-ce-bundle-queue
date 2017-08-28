import { Record, List } from 'immutable';
import { namespace, noPayload, withPayload } from '../../utils';

export const DEFAULT_DOCUMENTATION_URL = 'https://kinops.io/docs';
export const DEFAULT_SUPPORT_URL = 'https://kinops.io/support';

export const types = {
  LOAD_APP_SETTINGS: namespace('app', 'LOAD_APP_SETTINGS'),
  SET_APP_SETTINGS: namespace('app', 'SET_APP_SETTINGS'),

  LOAD_PROFILE_SETTINGS: namespace('app', 'LOAD_PROFILE_SETTINGS'),
  SET_PROFILE_SETTINGS: namespace('app', 'SET_PROFILE_SETTINGS'),
};

export const actions = {
  loadAppSettings: noPayload(types.LOAD_APP_SETTINGS),
  setAppSettings: withPayload(types.SET_APP_SETTINGS),

  loadProfileSettings: noPayload(types.LOAD_PROFILE_SETTINGS),
  setProfileSettings: withPayload(types.SET_PROFILE_SETTINGS),
};

export const Profile = Record({
  displayName: '',
});

export const Filter = Record({
  name: '',
  slug: '',
  icon: 'star',
  count: true,
});

export const State = Record({
  profile: Profile(),
  filters: List(),
  documentationUrl: DEFAULT_DOCUMENTATION_URL,
  supportUrl: DEFAULT_SUPPORT_URL,
});

export const reducer = (state = State(), { type, payload }) => {
  switch (type) {
    case types.SET_APP_SETTINGS:
      return state
        .set('documentationUrl', payload.documentationUrl)
        .set('supportUrl', payload.supportUrl);
    default:
      return state;
  }
};
