export const types = {
  FETCH_TEAM: '@kd/boilerplate/FETCH_TEAM',
  SET_TEAM: '@kd/boilerplate/SET_TEAM',
  UPDATE_TEAM: '@kd/boilerplate/UPDATE_TEAM',
  SET_TEAM_ERRORS: '@kd/boilerplate/SET_TEAM_ERRORS',
  CLEAR_TEAM: '@kd/boilerplate/CLEAR_TEAM',
  CREATE_TEAM: '@kd/boilerplate/CREATE_TEAM',
  DELETE_TEAM: '@kd/boilerplate/DELETE_TEAM',
};

export const actions = {
  fetchTeam: teamSlug => ({ type: types.FETCH_TEAM, payload: teamSlug }),
  setTeam: team => ({ type: types.SET_TEAM, payload: team }),
  updateTeam: (teamSlug, team) => ({ type: types.UPDATE_TEAM, payload: { teamSlug, team } }),
  setTeamErrors: errors => ({ type: types.SET_TEAM_ERRORS, payload: errors }),
  clearTeam: () => ({ type: types.CLEAR_TEAM }),
  createTeam: team => ({ type: types.CREATE_TEAM, payload: team }),
  deleteTeam: teamSlug => ({ type: types.DELETE_TEAM, payload: teamSlug }),
};

export const defaultState = {
  loading: false,
  errors: [],
  data: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_TEAM:
      return { ...state, loading: true, errors: [] };
    case types.SET_TEAM:
      return { ...state, loading: false, errors: [], data: action.payload };
    case types.UPDATE_TEAM:
      return { ...state, errors: [] };
    case types.SET_TEAM_ERRORS:
      return { ...state, loading: false, errors: action.payload };
    case types.CLEAR_TEAM:
      return { ...defaultState };
    case types.CREATE_TEAM:
      return { ...state, loading: true, errors: [] };
    case types.DELETE_TEAM:
      return { ...state, loading: true, errors: [] };
    default:
      return state;
  }
};

export default reducer;
