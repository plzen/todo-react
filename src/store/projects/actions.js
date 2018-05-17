import { createEntityActionCreators } from "../shared/entity";
import makeActionCreator from "../shared/makeActionCreator";

import actionTypes from "./actionTypes";
import firebaseService from "../../services/firebase";

const baseActions = createEntityActionCreators("PROJECTS");

const loadProjects = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(projectListLoading());

    firebaseService
      .database()
      .ref("projects")
      .on(
        "value",
        (snapshot) => {
          const projects = snapshot.val();

          resolve();
          dispatch(baseActions.set(projects));
          dispatch(projectListSuccess(projects));
        },
        (error) => {
          reject(error);
          dispatch(projectListFailure(error));
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

const projectListLoading = makeActionCreator(actionTypes.PROJECTS_LIST_LOADING);
const projectListSuccess = makeActionCreator(actionTypes.PROJECTS_LIST_SUCCESS, "projects");
const projectListFailure = makeActionCreator(actionTypes.PROJECTS_LIST_FAILURE, "error");
const projectListToggle = makeActionCreator(actionTypes.PROJECTS_LIST_TOGGLE, "key");

const projectsActions = {
  ...baseActions,
  loadProjects,
  toggleProject,
};

export { projectsActions as default };
