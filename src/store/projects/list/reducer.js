import * as types from "./actionTypes";

const initialState = {
  loading: false,
  error: null,
  projects: [],
  activeProject: "",
};

const projectList = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECT_LIST_LOADING:
      return { ...state, loading: true, error: null };
    case types.PROJECT_LIST_SUCCESS:
      return { ...state, loading: false, projects: action.projects };
    case types.PROJECT_LIST_FAILURE:
      return { ...state, loading: false, error: action.error };
    case types.PROJECT_TOGGLE:
      return { ...state, activeProject: action.key };
    default:
      return state;
  }
};

export default projectList;
