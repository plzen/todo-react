import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import { projectsReducer } from "./projects";
import { tasksReducer } from "./tasks";
import { commentsReducer } from "./comments";
import { userReducer } from "./user";

export default combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  comments: commentsReducer,
  user: userReducer,
  form,
});
