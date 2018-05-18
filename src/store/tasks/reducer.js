import { createEntityReducer } from "../shared/entity";
import { createStatusReducer } from "../shared/status";

const initialState = {
  byId: {},
  ids: [],
  status: {},
};

const baseReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

const entityReducer = createEntityReducer("TASKS")(baseReducer);
const tasksReducer = createStatusReducer("TASKS")(entityReducer);

export default tasksReducer;
