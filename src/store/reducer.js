import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import signup from "./signup";
import signin from "./signin";
import signout from "./signout";
import user from "./user";
import { projectsReducer } from "./projects";
import { tasksReducer } from "./tasks";

export default combineReducers({
  signup,
  signin,
  signout,
  user,
  projects: projectsReducer,
  tasks: tasksReducer,
  form,
});
