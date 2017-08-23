export const types = {
  FETCH_PROFILE: 'FETCH_PROFILE',
  FETCH_PROFILE_ERROR: 'FETCH_PROFILE_ERROR',
  SET_PROFILE: 'SET_PROFILE',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
};

export const actions = {
  fetchProfile: () => ({ type: types.FETCH_PROFILE }),
  fetchProfileError: errors => ({ type: types.FETCH_PROFILE_ERROR, payload: errors }),
  setProfile: profile => ({ type: types.SET_PROFILE, payload: profile }),
  updateProfile: profile => ({ type: types.UPDATE_PROFILE, payload: profile }),
};

export const defaultState = {
  loading: false,
  errors: [],
  data: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE:
      return { ...state, loading: true, errors: [] };
    case types.FETCH_PROFILE_ERROR:
      return { ...state, loading: false, errors: action.payload };
    case types.SET_PROFILE:
      return { ...state, loading: false, errors: [], data: action.payload };
    default: return state;
  }
};

export default reducer;
