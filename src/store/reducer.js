import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import signup from "./signup";
import signin from "./signin";
import signout from "./signout";
import user from "./user";
import { projectsReducer } from "./projects";
import projectsRemove from "./projects/remove";
import projectsEdit from "./projects/edit";
import tasksCreate from "./tasks/create";
import tasksList from "./tasks/list";

export default combineReducers({
  signup,
  signin,
  signout,
  user,
  projects: projectsReducer,
  projectsRemove,
  projectsEdit,
  tasksCreate,
  tasksList,
  form,
});
