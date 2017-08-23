export const types = {
  FETCH_TEAMS: '@kd/boilerplate/FETCH_TEAMS',
  SET_TEAMS: '@kd/boilerplate/SET_TEAMS',
  ADD_TEAM: '@kd/boilerplate/ADD_TEAM',
  REMOVE_TEAM: '@kd/boilerplate/REMOVE_TEAM',
  SET_TEAMS_ERRORS: '@kd/boilerplate/SET_TEAMS_ERRORS',
};

export const actions = {
  fetchTeams: () => ({ type: types.FETCH_TEAMS }),
  setTeams: teams => ({ type: types.SET_TEAMS, payload: teams }),
  addTeam: team => ({ type: types.ADD_TEAM, payload: team }),
  removeTeam: teamSlug => ({ type: types.REMOVE_TEAM, payload: teamSlug }),
  setTeamsErrors: errors => ({ type: types.SET_TEAMS_ERRORS, payload: errors }),
};

export const defaultState = {
  loading: false,
  errors: [],
  data: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_TEAMS:
      return { ...state, loading: true, errors: [] };
    case types.SET_TEAMS:
      return { ...state, loading: false, errors: [], data: action.payload };
    case types.ADD_TEAM:
      return { ...state, data: [...state.data, action.payload] };
    case types.REMOVE_TEAM:
      return { ...state, data: state.data.filter(team => team.slug !== action.payload) };
    case types.SET_TEAMS_ERRORS:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export default reducer;
