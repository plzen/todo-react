import * as types from "./actionTypes";
import firebaseService from "../../../services/firebase";

export const editProject = params => dispatch =>
  new Promise((resolve, reject) => {
    const { key, projectName } = params;

    dispatch(projectEditLoading(key));

    firebaseService
      .database()
      .ref(`projects/${key}`)
      .update({ name: projectName })
      .then(() => {
        resolve();
        dispatch(projectToggle(""));
        dispatch(projectEditSuccess(key));
      })
      .catch((error) => {
        reject(error);
        dispatch(projectEditFailure(key, error));
      });
  });

export const toggleProject = key => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    if (state.projectsEdit.activeProject === key) {
      dispatch(projectToggle(""));
    } else {
      dispatch(projectToggle(key));
    }

    resolve();
  });

export const projectEditLoading = key => ({
  type: types.PROJECT_EDIT_LOADING,
  key,
});

export const projectEditSuccess = key => ({
  type: types.PROJECT_EDIT_SUCCESS,
  key,
});

export const projectEditFailure = (key, error) => ({
  type: types.PROJECT_EDIT_FAILURE,
  key,
  error,
});

export const projectToggle = key => ({
  type: types.PROJECT_EDIT_TOGGLE,
  key,
});
