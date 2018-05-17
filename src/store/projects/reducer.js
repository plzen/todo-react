import { createEntityReducer } from "../shared/entity";
import actionTypes from "./actionTypes";

const initialState = {
  byId: {},
  ids: [],
  loading: false,
  error: null,
  activeProject: "",
};

const baseReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.PROJECTS_LIST_LOADING:
      return { ...state, loading: true, error: null };
    case actionTypes.PROJECTS_LIST_SUCCESS:
      return { ...state, loading: false, projects: action.projects };
    case actionTypes.PROJECTS_LIST_FAILURE:
      return { ...state, loading: false, error: action.error };
    case actionTypes.PROJECTS_LIST_TOGGLE:
      return { ...state, activeProject: action.key };
    default:
      return state;
  }
};

const projectsReducer = createEntityReducer("PROJECTS")(baseReducer);

export default projectsReducer;
