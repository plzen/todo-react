import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import signup from "./signup";
import signin from "./signin";
import signout from "./signout";
import user from "./user";
import projectsCreate from "./projects/create";
import projectsList from "./projects/list";
import projectsRemove from "./projects/remove";
import projectsEdit from "./projects/edit";
import tasksCreate from "./tasks/create";
import tasksList from "./tasks/list";

export default combineReducers({
  signup,
  signin,
  signout,
  user,
  projectsCreate,
  projectsList,
  projectsRemove,
  projectsEdit,
  tasksCreate,
  tasksList,
  form,
});
