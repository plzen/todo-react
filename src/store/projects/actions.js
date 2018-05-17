import makeActionCreator from "../shared/makeActionCreator";
import { createEntityActionCreators } from "../shared/entity";
import { createStatusActionCreators } from "../shared/status";

import actionTypes from "./actionTypes";
import firebaseService from "../../services/firebase";

const entityActions = createEntityActionCreators("PROJECTS");
const statusActions = createStatusActionCreators("PROJECTS");

const loadProjects = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("list"));

    firebaseService
      .database()
      .ref("projects")
      .on(
        "value",
        (snapshot) => {
          const projects = snapshot.val();

          resolve();
          dispatch(entityActions.set(projects));
          dispatch(statusActions.success("list"));
        },
        (error) => {
          reject(error);
          dispatch(statusActions.error("list", error));
        },
      );
  });

const toggleProject = key => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    if (state.projects.activeProject === key) {
      dispatch(projectListToggle(""));
    } else {
      dispatch(projectListToggle(key));
    }

    resolve();
  });

const projectListToggle = makeActionCreator(actionTypes.PROJECTS_LIST_TOGGLE, "key");

const projectsActions = {
  loadProjects,
  toggleProject,
};

export { projectsActions as default };
