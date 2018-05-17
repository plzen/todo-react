import { createEntityReducer } from "../shared/entity";
import { createStatusReducer } from "../shared/status";
import actionTypes from "./actionTypes";

const initialState = {
  byId: {},
  ids: [],
  status: {},
  activeProject: "",
};

const baseReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.PROJECTS_LIST_TOGGLE:
      return { ...state, activeProject: action.key };
    default:
      return state;
  }
};

const entityReducer = createEntityReducer("PROJECTS")(baseReducer);
const projectsReducer = createStatusReducer("PROJECTS")(entityReducer);

export default projectsReducer;
