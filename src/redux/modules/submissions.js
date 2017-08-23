export const types = {
  SEARCH_SUBMISSIONS: '@kd/boilerplate/SEARCH_SUBMISSIONS',
  SET_SUBMISSIONS: '@kd/boilerplate/SET_SUBMISSIONS',
};

export const actions = {
  searchSubmissions: searcher => ({ type: types.SEARCH_SUBMISSIONS, payload: searcher }),
  setSubmissions: submissions => ({ type: types.SET_SUBMISSIONS, payload: submissions }),
};

export const defaultState = {
  loading: false,
  errors: [],
  all: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SEARCH_SUBMISSIONS:
      return { ...state, loading: true, errors: [] };
    case types.SET_SUBMISSIONS:
      return { ...state, loading: false, errors: [], all: action.payload };
    default:
      return state;
  }
};

export default reducer;
