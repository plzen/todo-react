import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import signup from "./signup";
import signin from "./signin";
import signout from "./signout";
import user from "./user";
import { projectsReducer } from "./projects";
import tasksCreate from "./tasks/create";
import tasksList from "./tasks/list";

export default combineReducers({
  signup,
  signin,
  signout,
  user,
  projects: projectsReducer,
  tasksCreate,
  tasksList,
  form,
});
