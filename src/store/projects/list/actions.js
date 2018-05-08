import * as types from "./actionTypes";
import firebaseService from "../../../services/firebase";

export const loadProjects = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(projectListLoading());

    firebaseService
      .database()
      .ref("projects")
      .on(
        "value",
        (snapshot) => {
          let projects;
          const val = snapshot.val();
          if (val) {
            projects = Object.keys(val).map((key) => {
              const project = val[key];
              project.key = key;
              return project;
            });
          } else {
            projects = [];
          }

          resolve();
          dispatch(projectListSuccess(projects));
        },
        (error) => {
          reject(error);
          dispatch(projectListFailure(error));
        },
      );
  });

export const toggleProject = key => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    if (state.projectsList.activeProject === key) {
      dispatch(projectToggle(""));
    } else {
      dispatch(projectToggle(key));
    }

    resolve();
  });

export const projectListLoading = () => ({
  type: types.PROJECT_LIST_LOADING,
});

export const projectListSuccess = projects => ({
  type: types.PROJECT_LIST_SUCCESS,
  projects,
});

export const projectListFailure = error => ({
  type: types.PROJECT_LIST_FAILURE,
  error,
});

export const projectToggle = key => ({
  type: types.PROJECT_TOGGLE,
  key,
});
