import { createEntityReducer } from "../shared/entity";
import { createStatusReducer } from "../shared/status";
import actionTypes from "./actionTypes";

const initialState = {
  byId: {},
  ids: [],
  status: {},
  editTask: "",
};

const baseReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.TASKS_EDIT_TOGGLE:
      return { ...state, editTask: action.key };
    default:
      return state;
  }
};

const entityReducer = createEntityReducer("TASKS")(baseReducer);
const tasksReducer = createStatusReducer("TASKS")(entityReducer);

export default tasksReducer;
